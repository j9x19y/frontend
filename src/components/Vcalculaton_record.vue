<!--实验文件管理界面-->
<template>
  <div>
    <Vnavigation   style="width: 20%;height:100%;float: left;position: fixed;"></Vnavigation>
    <div id="main_documents">
        <vheader style="height: 150px;"></vheader>
          <!--实验信息显示-->
        <div id="function_show">
            <!--用户选择部分-->
            <div id="select">
                <el-form :model="select_form" ref="select_form"  class="demo-ruleForm" id="select_function">
                    <el-form-item label="底物" label-width="100px" prop="name" class="select_item_style"  style="width: 20%">
                        <el-input type="text" v-model="select_form.substrate"></el-input>
                    </el-form-item>
                    <el-form-item label="产物" label-width="100px" prop="name" class="select_item_style"  style="width: 20%">
                        <el-input type="text" v-model="select_form.target_met"></el-input>
                    </el-form-item>
                    <el-form-item label="提交人" label-width="100px" prop="name" class="select_item_style"  style="width: 20%">
                        <el-input type="text" v-model="select_form.submitter"></el-input>
                    </el-form-item>
                  <el-form-item label="产率" label-width="100px" prop="name" class="select_item_style"  style="width: 20%;margin-right: 5%">
                        <el-input type="text" v-model="select_form.theoretical_rate"></el-input>
                    </el-form-item>
                    <el-form-item  class="select_item_style" style="margin-right: 0%">
                        <el-button type="primary" @click="submitForm('select_form')">提交</el-button>
                        <el-button @click="resetForm('select_form')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!--所做实验表格部分-->
            <el-table :data="tableData" style="width: 100%;margin-bottom: 30px;" :default-sort = "{prop: 'date', order: 'descending'}" border height="500">
                <el-table-column label="底物" sortable minWidth="6%">
                    <template slot-scope="scope">
                        <span>{{scope.row.substrate}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="target_met" label="产物" sortable minWidth="10%">
                    <template slot-scope="scope">
                        <span>{{scope.row.target_met}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="model" label="模型" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.model}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="theoretical_rate" label="产率" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.theoretical_rate}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="submittter" label="提交人" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.submitter}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="experiment_name" label="实验名" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.experiment_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="growth_rate" label="生长比率" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.growth_rate}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="formula" label="方程式" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.formula}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="environment" label="培养环境" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.environment}}</span>
                    </template>
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
  name: 'Vcalculation_record',
  data() {
      return {
//        筛选框
          select_form:{
              substrate:'',
              target_met:'',
              submitter:'',
              theoretical_rate:''
          },
//        接收后端数据
          tableData: [],
      }
    },
    components:{Vheader, ElButton, ElForm, Vnavigation},
    mounted(){
      this.$store.state.activeIndex='11';
      this.show_calculation_record_data();
    },
    methods: {
      show_calculation_record_data(){
          var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/get_calculation_record_data/',
              method:'POST',
              data:{
                  substrate:that.select_form.substrate,
                  target_met:that.select_form.target_met,
                  submitter:that.select_form.submitter,
                  theoretical_rate:that.select_form.theoretical_rate
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.tableData=result.data.data
              }
              else{
                  alert(arg.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
      },
      submitForm(formName){
          var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/get_calculation_record_data/',
              method:'POST',
              data:{
                  substrate:that.select_form.substrate,
                  target_met:that.select_form.target_met,
                  submitter:that.select_form.submitter,
                  theoretical_rate:that.select_form.theoretical_rate
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.tableData=result.data.data;
              }
              else{
                  alert(arg.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
      },
//      使用resetFields方法必须使用prop属性
      resetForm(formName){
            this.$refs[formName].resetFields();
      },
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
