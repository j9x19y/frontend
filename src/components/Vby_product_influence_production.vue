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
              <el-form-item  label="副产物反应" class="item_style labelsize" required="required" style="width: 30%;float: left">
                  <el-select v-model="select_form.by_product_reaction.value"  placeholder="请选择" style="float: left">
                      <el-option v-for="item in select_form.by_product_reaction" :key="item.value" :label="item.value" :value="item.value"></el-option>
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
              <el-form-item label="步长" label-width="100px" prop="step" class="item_style"  style="width: 20%;margin-right: 10%; float: left" required="required">
                  <el-input type="text" v-model="select_form.step"></el-input>
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
  name: 'Vby_product_influence_production',
  data() {
      return {
          select_form: {
            wild_bacterial:'',
            over_product_bacterial:'',
            by_product_reaction:'',
            target_reaction:'',
            step:''
          },
        model_chart:'',
        model_flux:[],
        model_production:[],
        option : {
          title: {
             text: '副产物对产物的影响',   //图表顶部的标题
          },
          tooltip: {},
          legend: {
            data:['通量']
          },
          xAxis : {  //x轴坐标数据
            data : [],
            name: "副反应占比",
            axisLabel:{
			                            	  interval:0 ,
			                            	  formatter:function(val){
			                            	    return val.split("").join("\n");
			                            	  }
			                         	  }
            },
           yAxis :{
            name: "目标反应通量",
           },
          series: [  //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
            {
              name:"通量",
              type: "line",  //pie->饼状图  line->折线图  bar->柱状图
              data:this.model_production,
              }
          ]}
      }
    },
    components:{Vheader, ElButton, ElForm, Vnavigation},
    mounted(){
      this.$store.state.activeIndex='16';
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
                  // that.select_form.target_reaction = result.data.optimize_reaction;
                  that.select_form.by_product_reaction = result.data.debug_reaction;
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
                  // that.select_form.by_product_reaction = result.data.debug_reaction;
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
              url:'http://127.0.0.1:8000/cobrapy_function/by_product_influence_production/',
              method:'POST',
              data:{
                  wild_bacterial: that.select_form.wild_bacterial.value,
                  by_product_reaction: that.select_form.by_product_reaction.value,
                  target_reaction: that.select_form.target_reaction.value,
                  over_product_bacterial: that.select_form.over_product_bacterial.value,
                  step: that.select_form.step
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  alert("分析成功");
                  that.model_flux = result.data.model_flux;
                  that.model_production = result.data.model_production;
                  var temp = that.option;
                  temp.series[0].data=that.model_flux;
                  temp.xAxis.data=that.model_production;
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
