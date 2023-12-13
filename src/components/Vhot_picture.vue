<template>
  <div>
    <Vnavigation   style="width: 20%;height:100%;float: left;position: fixed;"></Vnavigation>
    <div id="main_documents">
        <vheader style="height: 150px;"></vheader>
        <div id="user_choose_module" style="width: 95%;margin: auto;margin-top: 10%;">
          <h3>用户选择基础模型</h3>
          <div style="margin-top: 20px;width: 100%;">
            <el-form :model="select_form" ref="select_form"  class="demo-ruleForm">
              <el-form-item  label="野生型模型" class="item_style labelsize" required="required" style="width: 30%;float: left">
                  <el-select v-model="select_form.wild_bacterial.value"  placeholder="请选择" style="float: left" @change="getWildReaction()">
                      <el-option v-for="item in select_form.wild_bacterial" :key="item.value" :label="item.value" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item  label="影响反应1" class="item_style labelsize" required="required" style="width: 30%;float: left">
                  <el-select v-model="select_form.influence_reaction1.value"  placeholder="请选择" style="float: left">
                      <el-option v-for="item in select_form.influence_reaction1" :key="item.value" :label="item.value" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item  label="影响反应2" class="item_style labelsize" required="required" style="width: 30%;float: left">
                  <el-select v-model="select_form.influence_reaction2.value"  placeholder="请选择" style="float: left">
                      <el-option v-for="item in select_form.influence_reaction2" :key="item.value" :label="item.value" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item  label="过表达型模型" class="item_style labelsize" required="required" style="width: 30%;float: left">
                  <el-select v-model="select_form.over_product_bacterial.value"  placeholder="请选择" style="float: left" @change="getOverProductReaction()">
                      <el-option v-for="item in select_form.over_product_bacterial" :key="item.value" :label="item.value" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item  label="目标反应" class="item_style labelsize" required="required" style="width: 30%;float: left">
                  <el-select v-model="select_form.target_reaction.value"  placeholder="请选择" style="float: left">
                      <el-option v-for="item in select_form.target_reaction" :key="item.value" :label="item.value" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="影响反应1步长" label-width="150px" prop="step1" class="item_style"  style="width: 30%;float: left" required="required">
                  <el-input type="text" v-model="select_form.step1"></el-input>
              </el-form-item>
              <el-form-item label="影响反应2步长" label-width="150px" prop="step2" class="item_style"  style="width: 30%; float: left" required="required">
                  <el-input type="text" v-model="select_form.step2"></el-input>
              </el-form-item><el-form-item label="热图最大值" label-width="150px" prop="hot_max" class="item_style"  style="width: 20%; float: left" required="required">
                  <el-input type="text" v-model="select_form.hot_max"></el-input>
              </el-form-item>
              <el-form-item label="热图最小值" label-width="150px" prop="hot_min" class="item_style"  style="width: 20%;margin-right: 10%; float: left" required="required">
                  <el-input type="text" v-model="select_form.hot_min"></el-input>
              </el-form-item>
              <el-form-item  class="select_item_style" style="margin-right: 5%">
                  <el-button type="primary" style="margin-top: 20px;" @click="submitParams()">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div id="model_chart_data" ref="model_chart_data" style = "height: 450px;width: 100%; float: left;"></div>
    </div>
  </div>
</template>

<script>
import Vnavigation from './Vnavigation'
import ElForm from "../../node_modules/element-ui/packages/form/src/form";
import ElButton from "../../node_modules/element-ui/packages/button/src/button";
import Vheader from './Vheader'
export default {
  name: 'Vhot_picture',
  data() {
      return {
          select_form: {
            wild_bacterial:'',
            over_product_bacterial:'',
            influence_reaction1:'',
            influence_reaction2:'',
            target_reaction:'',
            step1:'',
            step2:'',
            hot_max:'100',
            hot_min:'0'
          },
        model_chart:'',
        model_flux:[],
        influence_reaction1:[],
        influence_reaction2:[],
        model_production:[],
        option : {
            title: {
             text: '两个反应对产物的影响',   //图表顶部的标题
          },
            tooltip: {
                position: 'top',
            },
            grid: {
                height: '50%',
                top: '10%'
            },
            xAxis: {
                type: 'category',
                name: "影响反应一占比",
                nameLocation:"end",
                data: [],
                splitArea: {
                    show: true
                }
            },
            yAxis: {
                type: 'category',
                name: "影响反应二占比",
                nameLocation:"middle",
                nameRotate:360,
                data: [],
                splitArea: {
                    show: true
                }
            },
            visualMap: {
                min: 0,
                max: 100,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '15%'
            },
            series: [{
                name: '热图',
                type: 'heatmap',
                data: [],
                label: {
                    show: true
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 100,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }]
        },

      }
    },
    components:{Vheader, ElButton, ElForm, Vnavigation},
    mounted(){
      this.$store.state.activeIndex='17';
      this.model_chart = this.$echarts.init(this.$refs.model_chart_data);
      this.model_chart.setOption(this.option);
      this.getBacterial();
    },
    methods: {
      getBacterial(){
          var that=this;
            this.$axios.request(
              {
                url:'http://127.0.0.1:8000/get_models_name/',
                method:'POST',
                data:{

                },
                headers:{
                    'Content-Type':'application/json'
                }
              }
            ).then(function(result){
                if(result.data.code===1000){
                  console.log(result.data.data);
                    that.select_form.wild_bacterial=result.data.data;
                    // ES6 ...运算符，如果有这个对象那就覆盖这个值
                    that.select_form.over_product_bacterial = {...result.data.data};
                }
                else{
                    alert("获取失败")
                }
            }).catch(function (result){
              alert("传参失败")
            })
      },
      getWildReaction(){
          var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/cobrapy_function/get_reaction/',
              method:'POST',
              data:{
                  bacterial:that.select_form.wild_bacterial.value
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.select_form.influence_reaction1 = result.data.debug_reaction;
                  // ES6 ...运算符，如果有这个对象那就覆盖这个值
                  that.select_form.influence_reaction2 = {...result.data.debug_reaction};
              }
              else{
                  alert(arg.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
      },
      getOverProductReaction(){
          var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/cobrapy_function/get_reaction/',
              method:'POST',
              data:{
                  bacterial:that.select_form.over_product_bacterial.value
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.select_form.target_reaction = result.data.optimize_reaction;
              }
              else{
                  alert(arg.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
      },
      submitParams(){
        var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/cobrapy_function/hot_picture/',
              method:'POST',
              data:{
                  wild_bacterial: that.select_form.wild_bacterial.value,
                  influence_reaction1: that.select_form.influence_reaction1.value,
                  influence_reaction2: that.select_form.influence_reaction2.value,
                  target_reaction: that.select_form.target_reaction.value,
                  over_product_bacterial: that.select_form.over_product_bacterial.value,
                  step1: that.select_form.step1,
                  step2: that.select_form.step2
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  alert("分析成功");
                  console.log("分析成功");
                  that.model_flux = result.data.model_flux;
                  // that.model_production = result.data.model_production;
                  console.log(that.model_flux);
                  that.influence_reaction1 = result.data.influence_reaction1;
                  that.influence_reaction2 = result.data.influence_reaction2;
                  console.log(that.influence_reaction1);
                  console.log(that.influence_reaction2);
                  var temp = that.option;
                  temp.series[0].data=that.model_flux;
                  temp.xAxis.data = result.data.influence_reaction1;
                  temp.yAxis.data = result.data.influence_reaction2;
                  temp.visualMap.max = that.select_form.hot_max;
                  temp.visualMap.min = that.select_form.hot_min;
                  // console.log(temp.xAxis[0].data);
                  console.log(temp);
                  that.model_chart.setOption(temp);
              }
              else{
                  alert("参数解析失败")
              }
          }).catch(function (result){
            alert("传参失败")
          })
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #function_show{
    width: 95%;
    margin: auto;
    margin-top: 10%;
  }
  #select{
    margin-top: 20px;
    width: 100%;
  }
  #select_all{
    float: left;
  }
  #select_function{
    display: inline-block;
    width: 90%;
  }
  .select_item_style{
    float: left;
  }
  .formstyle{
    width:80%;
    margin-left:auto;
    margin-right: auto;
    margin-top: 20px;
  }
  .item_style{
    margin-top: 20px;
    width: 80%;
  }
  #main_documents{
    float: right;
    width: 80%;
    height:100%;
    /*background-image: url(../assets/image/13change.jpg);*/
    /*background-repeat: no-repeat;*/
    /*background-position: center center;*/
    /*background-size: 60%;*/
  }
</style>
