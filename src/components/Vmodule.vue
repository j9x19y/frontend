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
                    <el-form-item label="模块分类" label-width="100px" prop="name" class="select_item_style"  style="width: 20%">
                        <el-input type="text" v-model="select_form.subsystem_class"></el-input>
                    </el-form-item>
                    <el-form-item label="模块名称" label-width="100px" prop="name" class="select_item_style"  style="width: 20%">
                        <el-input type="text" v-model="select_form.model_subsystem_name"></el-input>
                    </el-form-item>
                    <el-form-item label="菌株" label-width="100px" prop="name" class="select_item_style"  style="width: 20%;margin-right: 10%">
                        <el-input type="text" v-model="select_form.bacterial"></el-input>
                    </el-form-item>
                    <el-form-item  class="select_item_style" style="margin-right: 5%">
                        <el-button type="primary" @click="submitForm('select_form')">提交</el-button>
                        <el-button @click="resetForm('select_form')">重置</el-button>
                    </el-form-item>
                    <el-form-item  class="select_item_style">
                        <el-button type="primary" @click="showAddModel()">创建模块</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!--所做实验表格部分-->
            <el-table :data="tableData" style="width: 100%;margin-bottom: 30px;" :default-sort = "{prop: 'date', order: 'descending'}" border height="500">
                <el-table-column label="反应名" sortable minWidth="6%">
                    <template slot-scope="scope">
                        <span>{{scope.row.reaction_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="reaction_formula" label="反应方程式" sortable minWidth="10%">
                    <template slot-scope="scope">
                        <span>{{scope.row.reaction_formula}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="bacterial" label="菌株" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.bacterial}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="model_subsystem_name" label="模块名称" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.model_subsystem_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="subsystem_class" label="模块分类" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.subsystem_class}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="model" label="归属模型" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.model}}</span>
                    </template>
                </el-table-column>
              <el-table-column prop="lower_bound" label="通量下限" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.lower_bound}}</span>
                    </template>
                </el-table-column>
              <el-table-column prop="up_bound" label="通量上限" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.up_bound}}</span>
                    </template>
                </el-table-column>
<!--                <el-table-column label="操作" class="column_style" minWidth="19%">-->
<!--                    <template slot-scope="scope">-->
<!--                        <el-button size="mini" type="primary" @click="handleView(scope.$index, scope.row)">查看</el-button>-->
<!--                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
<!--                    </template>-->
<!--                </el-table-column>-->
            </el-table>

        </div>
    </div>
    <el-dialog title="新模块添加" :visible.sync="dialogVisible" width="80%">
              <el-form ref="form" :model="form" label-width="20%">
                <h3>基础信息记录</h3>
                <el-form-item label="菌株">
                  <el-input v-model="form.bacterial"></el-input>
                </el-form-item>
                <el-form-item label="模块名称">
                  <el-input v-model="form.model_subsystem_name"></el-input>
                </el-form-item>
                <el-form-item label="反应名">
                  <el-input v-model="form.reaction_name"></el-input>
                </el-form-item>
                <el-form-item label="反应方程式">
                  <el-input v-model="form.reaction_formula"></el-input>
                </el-form-item>
                <el-form-item label="通量下限">
                  <el-input v-model="form.lower_bound"></el-input>
                </el-form-item>
                <el-form-item label="通量上限">
                  <el-input v-model="form.up_bound"></el-input>
                </el-form-item>
                <h3>模块归属记录</h3>
                <el-form-item label="模块归属">
                  <el-select v-model="form.subsystem_class" placeholder="请选择模块归属">
                    <el-option label="自定义" value="自定义"></el-option>
                    <el-option label="文献报道" value="文献报道"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addModule()">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import Vnavigation from './Vnavigation'
import ElForm from "../../node_modules/element-ui/packages/form/src/form";
import ElButton from "../../node_modules/element-ui/packages/button/src/button";
import Vheader from './Vheader'
export default {
  name: 'Vmodule',
  data() {
      return {
//        筛选框
          select_form:{
              subsystem_class:"",
              bacterial:"",
              model_subsystem_name:""
          },
        // 添加模块的表单数据
          form:{
            bacterial:'',
            model_subsystem_name:'',
            reaction_name:'',
            reaction_formula:'',
            subsystem_class:'',
            lower_bound:'0',
            up_bound:'1000'
          },
//        接收后端数据
          tableData: [],
//        添加模块是否可见
          dialogVisible:false,
      }
    },
    components:{Vheader, ElButton, ElForm, Vnavigation},
    mounted(){
      this.$store.state.activeIndex='11';
      this.show_model_data();
    },
    methods: {
      show_model_data(){
          var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/get_model_subsystem_data/',
              method:'POST',
              data:{
                  subsystem_class:that.select_form.subsystem_class,
                  bacterial:that.select_form.bacterial,
                  model_subsystem_name:that.select_form.model_subsystem_name
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
              url:'http://127.0.0.1:8000/get_model_subsystem_data/',
              method:'POST',
              data:{
                  subsystem_class:that.select_form.subsystem_class,
                  bacterial:that.select_form.bacterial,
                  model_subsystem_name:that.select_form.model_subsystem_name
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.tableData=result.data.data;
                  console.log(that.tableData);
                  console.log(that.select_form.subsystem_class);
                  console.log(that.select_form.bacterial);
                  console.log(that.select_form.model_subsystem_name);
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
//      为关闭事件设置
        closeDialog(){
          this.dialogVisible=false
        },
      // 点击添加按钮对话框可见
      showAddModel(){
        this.dialogVisible=true
      },
      // 添加模块信息记录
      addModule(){
          var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/add_model_subsystem_data/',
              method:'POST',
              data:{
                  bacterial:that.form.bacterial,
                  model_subsystem_name:that.form.model_subsystem_name,
                  reaction_name: that.form.reaction_name,
                  reaction_formula:that.form.reaction_formula,
                  subsystem_class:that.form.subsystem_class,
                  model:that.$store.state.username,
                  up_bound:that.form.up_bound,
                  lower_bound:that.form.lower_bound
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.dialogVisible=false
              }
              else{
                  alert(arg.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
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
