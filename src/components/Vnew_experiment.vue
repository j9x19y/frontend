<!--新建实验界面-->
<template>
  <div>
    <!--导航栏-->
    <Vnavigation  style="width: 20%;height:100%;float: left;position: fixed;"></Vnavigation>
    <!--新建实验表单-->
    <div id="main_experiment">
      <vheader style="height: 150px;"></vheader>
      <div style="height: 80%;">
          <el-form   label-width="150px" class="formstyle_new_experiment" labelPosition="left" :model="experiment_form"  ref="experiment_form">
              <el-alert title="请在此处为实验命名，点击开始实验在进行实验，可以在实验备注中简单记录不超过200字的内容" type="info" effect="dark"></el-alert>
              <el-form-item label="实验名称" prop="experiment_name" class="item_style labelsize" required="required">
                  <el-input type="text" v-model="experiment_form.experiment_name"></el-input>
              </el-form-item>
              <br/>
              <!--下拉框动态生成选项，在el-select标签中绑定自定义select_bacteria列表的number属性，在option中对select_bacteria列表进行循环,里边必须有keys绑定-->
              <el-form-item  label="细菌模型" class="item_style labelsize" required="required" >
                  <el-select v-model="experiment_form.select_bacteria.value"  placeholder="请选择" style="float: left">
                      <el-option v-for="item in experiment_form.select_bacteria" :key="item.value" :label="item.value" :value="item.value"></el-option>
                  </el-select>
                  <el-upload class="upload-demo" ref="uploadexcel" action="http://127.0.0.1:8000/upload_excel/" :auto-upload="false" name="upload_excel" style="float: right;" type="file" accept=".xls,.xlsx">
                    <el-button slot="trigger" size="small" type="primary">选取excel文件</el-button>
                    <el-button style="margin-left: 10px;margin-right:20px;" size="small" type="success" @click="submitExcel">上传到服务器</el-button>
                  </el-upload>
                  <el-upload class="upload-demo" ref="upload" action="http://127.0.0.1:8000/upload_file/" :auto-upload="false" name="upload_file" style="float: right;" type="file" accept=".mat">
                    <el-button slot="trigger" size="small" type="primary">选取mat文件</el-button>
                    <el-button style="margin-left: 10px;margin-right:20px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                  </el-upload>
              </el-form-item>
              <br/>
              <el-form-item label="实验备注" prop="experiment_content" class="item_style labelsize" >
                  <el-input type="textarea" v-model="experiment_form.experiment_content"></el-input>
              </el-form-item>
              <el-form-item>
                  <el-button style="float:right;margin-right: 22%" type="primary" @click="checkExperiment('experiment_form')">开始实验</el-button>
              </el-form-item>
          </el-form>
          <el-dialog title="提示" :visible="dialogVisible" width="30%"  @close='closeDialog()'>
              <span>本次实验您选择的细菌模型是{{experiment_form.select_bacteria.value}}已在您的目录下创建{{experiment_form.experiment_name}}文件夹，本次实验数据都会保存在该文件夹下</span>
              <br/>
              <el-button type="primary" @click="startExperiment()">确 定</el-button>
              <el-button  @click="dialogVisible = false">取 消</el-button>
          </el-dialog>
      </div>

    </div>
  </div>
</template>

<script>
import Vnavigation from './Vnavigation'
import ElButton from "../../node_modules/element-ui/packages/button/src/button";
import ElForm from "../../node_modules/element-ui/packages/form/src/form";
import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item";
import ElInput from "../../node_modules/element-ui/packages/input/src/input";
import Vheader from "./Vheader";
export default {
  name: 'Vmain',
  data () {
    return {
        experiment_form:{
            experiment_name:'',
            select_bacteria:[],
            experiment_content:''
        },
      dialogVisible:false,
    }
  },
  components:{Vheader, ElInput, ElFormItem, ElForm, ElButton, Vnavigation},
  mounted(){
    this.getModelsName();
    console.log(this.experiment_form.select_bacteria);
  },
  methods:{
//        提交mat文件
        submitUpload() {
            this.$refs.upload.submit();
            this.getModelsName();
        },
//        提交excel文件
        submitExcel() {
            this.$refs.uploadexcel.submit();
            this.getModelsName();
        },
        //      为关闭事件设置
        closeDialog(){
          this.dialogVisible=false
        },
        getModelsName(){
            var that=this
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
                    that.experiment_form.select_bacteria=result.data.data
                    console.log(that.experiment_form.select_bacteria)
                }
                else{
                    alert("该实验名已存在")
                }
            }).catch(function (result){
              alert("传参失败")
            })
        },
        checkExperiment(formName){
            this.dialogVisible=true
        },
        startExperiment(){
            this.dialogVisible=false;
            if(this.experiment_form.select_bacteria.value==null)
                alert("请输入一个菌种");
            else
            {
                  this.makeDir();
//            将选择的菌种编号存储到公共存储区
                  this.$store.state.model_name=this.experiment_form.select_bacteria.value;
//            alert(this.experiment_form.select_bacteria.value)
//            此处取得是名称
                  this.$store.state.experiment_name=this.experiment_form.experiment_name;
//            转化为数据库中存储的日期格式
                  Date.prototype.format = function(fmt){
                    var o = {
                      "M+" : this.getMonth()+1,                 //月份
                      "d+" : this.getDate(),                    //日
                      "h+" : this.getHours(),                   //小时
                      "m+" : this.getMinutes(),                 //分
                      "s+" : this.getSeconds(),                 //秒
                      "q+" : Math.floor((this.getMonth()+3)/3), //季度
                      "S"  : this.getMilliseconds()             //毫秒
                    };

                    if(/(y+)/.test(fmt)){
                      fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
                    }

                    for(var k in o){
                      if(new RegExp("("+ k +")").test(fmt)){
                        fmt = fmt.replace(
                          RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                      }
                    }

                    return fmt;
                  }
                  this.$store.state.start_time =new Date().format("yyyy-MM-dd hh:mm:ss");
                  this.createExperiment();

            }
        },
        makeDir(){
            var that=this
            this.$axios.request(
              {
                url:'http://127.0.0.1:8000/make_experiment_dir/',
                method:'POST',
                data:{
                    id:that.$store.state.id,
                    username:that.$store.state.username,
                    experiment_name:that.experiment_form.experiment_name
                },
                headers:{
                    'Content-Type':'application/json'
                }
              }
            ).then(function(result){
                if(result.data.code===1000){
                    console.log("文件夹创建成功")
                }
                else{
                    alert("该实验名已存在")
                }
            }).catch(function (result){
              alert("传参失败")
            })
        },
        createExperiment(){
            var that=this
            this.$axios.request(
              {
                url:'http://127.0.0.1:8000/create_experiment/',
                method:'POST',
                data:{
                    id:that.$store.state.id,
                    username:that.$store.state.username,
                    experiment_name:that.experiment_form.experiment_name,
                    start_time:that.$store.state.start_time,
                    experiment_content:that.experiment_form.experiment_content
                },
                headers:{
                    'Content-Type':'application/json'
                }
              }
            ).then(function(result){
                if(result.data.code===1000){
                    console.log("新建实验成功")
                }
                else{
                    alert("该实验名已存在")
                }
            }).catch(function (result){
              alert("传参失败")
            })
        },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .formstyle_new_experiment{
    width:80%;
    margin-left:auto;
    margin-right: auto;
    margin-top: 20%;
    margin-bottom: 20%;
    box-shadow: 10px 10px 5px #888888;
    border-style:groove;
    background-color: white;

  }
  .item_style{
    margin-top: 20px;
    width: 80%;
  }
  #select_file{
        display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #FFF;
    border: 1px solid #DCDFE6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
  #upload_file{
        display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #FFF;
    border: 1px solid #DCDFE6;
    color: #606266;
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 4px;
  }
  #main_experiment{
    float: right;
    width: 80%;
    height:100%;
    /*background-image: url(../assets/image/13change.jpg);*/
    /*background-repeat: no-repeat;*/
    /*background-position: center center;*/
    /*background-size: 60%;*/
  }
  .labelsize .el-form-item__label{
    font-size: 20px;
  }
</style>
