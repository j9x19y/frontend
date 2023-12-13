<template>
  <div>
    <Vnavigation   style="width: 20%;height:100%;float: left;position: fixed;"></Vnavigation>
    <div id="main_documents">
        <vheader style="height: 150px;"></vheader>
        <div id="user_choose_module" style="width: 95%;margin: auto;margin-top: 10%;">
          <h3>用户选择基础模型</h3>
          <div style="margin-top: 20px;width: 100%;">
            <el-form :model="select_form" ref="select_form"  class="demo-ruleForm">
              <el-form-item  label="模型" class="item_style labelsize" required="required" style="width: 30%;float: left">
                  <el-select v-model="select_form.bacterial.value"  placeholder="请选择" style="float: left" @change="getReaction()">
                      <el-option v-for="item in select_form.bacterial" :key="item.value" :label="item.value" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item  label="生长方程" class="item_style labelsize" required="required" style="width: 30%;float: left">
                  <el-select v-model="select_form.biomass_reaction.value" filterable placeholder="请选择" style="float: left">
                      <el-option v-for="item in select_form.biomass_reaction" :key="item.value" :label="item.value" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item  label="目标反应" class="item_style labelsize" required="required" style="width: 30%;float: left">
                  <el-select v-model="select_form.target_reaction.value" filterable placeholder="请选择" style="float: left">
                      <el-option v-for="item in select_form.target_reaction" :key="item.value" :label="item.value" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="生长占比" label-width="100px" prop="growth_rate" class="item_style"  style="width: 20%;margin-right: 10%; float: left" required="required">
                  <el-input type="text" v-model="select_form.growth_rate"></el-input>
              </el-form-item>
              <el-form-item  class="select_item_style" style="margin-right: 5%">
                  <el-button type="primary" style="margin-top: 20px;" @click="submitParams()">提交</el-button>
              </el-form-item>
            </el-form>
          </div>

          <!--影子价格结果展示部分-->
          <el-table :data="tableData" style="width: 100%;margin-bottom: 30px;" :default-sort = "{prop: 'date', order: 'descending'}" border height="500">
<!--            可以不使用prop改成这种写法  -->
            <el-table-column label="代谢物id" minWidth="7%">
                  <template slot-scope="scope">
                      <span>{{scope.row.metabolite_id}}</span>
                  </template>
              </el-table-column>
              <el-table-column prop="shadow_price" label="影子价格" sortable minWidth="10%">
<!--                  <template slot-scope="scope">-->
<!--                      <span>{{scope.row.shadow_price}}</span>-->
<!--                  </template>-->
              </el-table-column>
              <el-table-column prop="subsystem" label="代谢物归属功能模块" minWidth="7%">
<!--                  <template slot-scope="scope">-->
<!--                      <span>{{scope.row.subsystem}}</span>-->
<!--                  </template>-->
              </el-table-column>

          </el-table>
        </div>
    </div>
  </div>
</template>

<script>
import Vnavigation from './Vnavigation'
import ElForm from "../../node_modules/element-ui/packages/form/src/form";
import ElButton from "../../node_modules/element-ui/packages/button/src/button";
import Vheader from './Vheader'
export default {
  name: 'Vshadow_price',
  data() {
      return {
          select_form: {
            bacterial:'',
            biomass_reaction:'',
            target_reaction:'',
            growth_rate:'0.05'
          },
          //        接收后端数据
          tableData: [],

      }
    },
    components:{Vheader, ElButton, ElForm, Vnavigation},
    mounted(){
      this.$store.state.activeIndex='22';
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
                    that.select_form.bacterial=result.data.data;
                }
                else{
                    alert("获取失败")
                }
            }).catch(function (result){
              alert("传参失败")
            })
      },
      getReaction(){
          var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/cobrapy_function/get_reaction/',
              method:'POST',
              data:{
                  bacterial:that.select_form.bacterial.value
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.select_form.target_reaction = result.data.optimize_reaction;
                  that.select_form.biomass_reaction = result.data.debug_reaction;
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
              url:'http://127.0.0.1:8000/cobrapy_function/shadow_price/',
              method:'POST',
              data:{
                  bacterial: that.select_form.bacterial.value,
                  biomass_reaction: that.select_form.biomass_reaction.value,
                  target_reaction: that.select_form.target_reaction.value,
                  growth_rate: that.select_form.growth_rate
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  alert("分析成功");
                  that.tableData = result.data.data;
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
