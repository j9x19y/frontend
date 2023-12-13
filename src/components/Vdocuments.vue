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
                <el-button @click="show_all_documents" id="select_all" style="width: 10%">显示全部文件</el-button>
                <el-form :model="select_form" ref="select_form"  class="demo-ruleForm" id="select_function">
                    <el-form-item label="按文件名查" label-width="100px" prop="name" class="select_item_style"  style="width: 30%">
                        <el-input type="text" v-model="select_form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="开始" labelWidth="50px" prop="start_time"  class="select_item_style" style="width: 27%">
                        <el-date-picker v-model="select_form.start_time" type="date" placeholder="选择日期"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束" labelWidth="50px" prop="end_time"  class="select_item_style" style="width: 27%">
                        <el-date-picker v-model="select_form.end_time" type="date" placeholder="选择日期" ></el-date-picker>
                    </el-form-item>
                    <el-form-item  class="select_item_style">
                        <el-button type="primary" @click="submitForm('select_form')">提交</el-button>
                        <el-button @click="resetForm('select_form')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!--所做实验表格部分-->
            <el-table :data="tableData" style="width: 100%;margin-bottom: 30px;" :default-sort = "{prop: 'date', order: 'descending'}" border height="250">
                <el-table-column label="实验名称" sortable minWidth="6%">
                    <template slot-scope="scope">
                        <span>{{scope.row.ename}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="start_time" label="开始时间" sortable minWidth="10%">
                    <template slot-scope="scope">
                        <span>{{scope.row.ebegin}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="end_time" label="结束时间" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.eend}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" class="column_style" minWidth="19%">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" @click="handleView(scope.$index, scope.row)">查看</el-button>
                        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
          <!--查看修改所选实验文件备注-->
            <h3>您查看的是{{experiment_name}}实验的备注，可以修改备注</h3>
            <el-form   label-width="100px" class="formstyle" labelPosition="left" :model="experiment_content"  ref="experiment_form" :disabled="true">
                <el-form-item label="实验备注" prop="content" class="item_style" >
                    <el-input type="textarea" v-model="experiment_content.content" ></el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="changeContent()" style="float:right;margin-right: 25%">修 改</el-button>
            <el-dialog title="请在此处修改实验备注" :visible="dialogVisible" width="30%" @close='closeDialog()'>
                <el-form   label-width="100px" class="formstyle" labelPosition="left" :model="new_experiment_content">
                    <el-form-item label="实验备注" prop="content" class="item_style" >
                        <el-input type="textarea" v-model="new_experiment_content.content" ></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="submitContent()" style="position: relative;left: 20%">确 定</el-button>
                <el-button  @click="dialogVisible = false" style="position: relative;left: 50%">取 消</el-button>
            </el-dialog>
          <!--所选实验文件表格部分-->
            <br/>
            <br/>
            <h3>您查看的是{{experiment_name}}实验的所有文件</h3>
            <el-table :data="documentData" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" border>

                <!--实验文件表格部分-->
                <el-table-column label="实验文件名称" sortable minWidth="40%">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="type" label="文件类型" sortable minWidth="30%">
                    <template slot-scope="scope">
                        <span>{{scope.row.type}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="size" label="文件大小（单位：KB）" sortable minWidth="30%">
                    <template slot-scope="scope">
                        <span>{{scope.row.size}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="path" label="操作" class="column_style" minWidth="19%" style="padding: 0">
                    <template slot-scope="scope">
                        <span @click="downloadFile(scope.$index, scope.row)"><i class="el-icon-download"style="font-size: 25px;margin-left:20px;margin-right: 20px"></i></span>
                        <span @click="deleteFile(scope.$index, scope.row)"><i class="el-icon-delete" style="font-size: 25px;margin-right:20px"></i></span>
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
  name: 'Vdocuments',
  data() {
      return {
//          管理员选则按照实验名查或开始时间查
          select_form:{
              name:'',
              start_time:'',
              end_time:''
          },
//        接收后端数据
          tableData: [],
//        用户点击查看后反馈回来的实验信息列表
          documentData:[],
//        用户点击查看后反馈回来的实验备注
          experiment_content:{
              content:''
          },
//        当前查看的实验名称
          experiment_name:'',
//        修改备注对话框是否可见
          dialogVisible:false,
//        修改对话框的表单
          new_experiment_content:{
              content:''
          }
      }
    },
    components:{Vheader, ElButton, ElForm, Vnavigation},
    mounted(){
      this.$store.state.activeIndex='5'
    },
    methods: {
      show_all_documents(){
          var that=this
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/documents_info/',
              method:'get',
              params:{
                  id:that.$store.state.id,
                  username:that.select_form.username,
                  start_time:'',
                  experiment_name:'',
                  end_time:''
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
          var that=this
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/documents_info/',
              method:'get',
              params:{
                  id:that.$store.state.id,
                  username:that.select_form.username,
                  start_time:that.select_form.start_time,
                  experiment_name:that.select_form.name,
                  end_time:that.select_form.end_time
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
                  alert(result.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
      },
//      使用resetFields方法必须使用prop属性
      resetForm(formName){
            this.$refs[formName].resetFields();
      },
//      点击修改按钮触发修改对话框
      changeContent(){
            this.dialogVisible=true
      },
//      为关闭事件设置
        closeDialog(){
          this.dialogVisible=false
        },
//      点击修改实验备注的确定按钮更新实验备注
      submitContent() {
          var that=this
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/update_content/',
              method:'post',
              data:{
                  id:that.$store.state.id,
                  experiment_name:that.experiment_name,
                  username:that.$store.state.username,
                  experiment_content:that.new_experiment_content.content
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                alert("修改成功")
              }
              else{
                  alert(result.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
      },
//      点击删除按钮递归删除该文件及子文件
      handleDelete(index, row) {
          var that=this
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/delete_documents/',
              method:'post',
              data:{
                  id:that.$store.state.id,
                  experiment_name:row['ename'],
                  username:that.$store.state.username
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                alert("删除成功")
                that.show_all_documents()
              }
              else{
                  alert(result.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
      },
//      点击查看按钮返回该文件夹下所有文件信息
      handleView(index, row) {
          this.experiment_name=row['ename']
          var that=this
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/get_document/',
              method:'post',
              data:{
                  id:that.$store.state.id,
                  experiment_name:row['ename'],
                  username:that.$store.state.username
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                that.documentData=result.data.data,
                that.experiment_content.content=result.data.content,
                that.new_experiment_content.content=result.data.content
              }
              else{
                  alert(result.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
      },
//      下载文件功能通过a标签构造get请求所需要的参数实现文件下载
      downloadFile(index,row){
          alert(this.experiment_name)
          var a=document.createElement('a');
          var url='http://127.0.0.1:8000/download_file?id='+this.$store.state.id+'&'+'username='+this.$store.state.username+'&'+'experiment_name='+this.experiment_name+'&'+'file_name='+row['name']
          a.setAttribute('href',url);
          a.click();
      },
//      用户点击删除文件的按钮后重新刷新当前文件列表
      refreshFileList(file_name) {
          var that=this
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/get_document/',
              method:'post',
              data:{
                  id:that.$store.state.id,
                  experiment_name:file_name,
                  username:that.$store.state.username
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                that.documentData=result.data.data
              }
              else{
                  alert(result.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
      },
//      点击删除图标返回删除该实验文件并刷新文件列表
      deleteFile(index, row) {
          var that=this
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/delete_file/',
              method:'post',
              data:{
                  id:that.$store.state.id,
                  experiment_name:that.experiment_name,
                  username:that.$store.state.username,
                  file_name:row['name']
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.refreshFileList(that.experiment_name)
              }
              else{
                  alert(result.data.error)
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
