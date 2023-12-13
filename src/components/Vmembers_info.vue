<!--成员信息管理界面-->
<template>
  <div>
    <!--导航栏-->
    <Vnavigation  style="width: 20%;height:100%;float: left;position: fixed;"></Vnavigation>
    <div id="main_members">
        <vheader style="height: 150px;"></vheader>
          <!--用户信息显示-->
        <div id="function_show">
            <!--管理员选择部分-->
            <div id="select">
                <el-button @click="show_all_members" id="select_all">显示全部成员信息</el-button>
                <el-form :model="select_form" ref="select_form" label-width="100px" class="demo-ruleForm" id="select_function">
                    <el-form-item label="按id查" prop="id" class="select_item_style">
                        <el-input type="text" v-model="select_form.id"></el-input>
                    </el-form-item>
                    <el-form-item label="按用户名查" prop="username"  class="select_item_style">
                        <el-input type="text" v-model="select_form.username"></el-input>
                    </el-form-item>
                    <el-form-item  class="select_item_style">
                        <el-button type="primary" @click="submitForm('select_form')">提交</el-button>
                        <el-button @click="resetForm('select_form')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>

            <!--表格部分-->
            <el-table :data="tableData" style="width: 100%" :default-sort = "{prop: 'date', order: 'descending'}" border>
                <el-table-column label="id" sortable minWidth="6%">
                    <template slot-scope="scope">
                        <span>{{scope.row.id}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="姓名" sortable minWidth="8%">
                    <template slot-scope="scope">
                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="age" label="年龄" sortable minWidth="8%">
                    <template slot-scope="scope">
                        <span>{{scope.row.age}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="email" label="邮箱"  minWidth="10%">
                    <template slot-scope="scope">
                        <span>{{scope.row.email}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="gender" label="性别" sortable minWidth="8%">
                    <template slot-scope="scope">
                        <span>{{scope.row.gender}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="rank" label="级别" sortable minWidth="8%">
                    <template slot-scope="scope">
                        <span>{{scope.row.rank}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="password" label="密码" minWidth="8%">
                    <template slot-scope="scope">
                        <span>{{scope.row.password}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="联系方式" minWidth="11%">
                    <template slot-scope="scope">
                        <span>{{scope.row.phone}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="isDelete" label="是否删除" sortable minWidth="10%">
                    <template slot-scope="scope">
                        <span>{{scope.row.isDelete}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" class="column_style" minWidth="25%">
                    <template slot-scope="scope">
                        <el-button
                          size="mini"
                          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                          size="mini"
                          type="danger"
                          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                      <el-button
                          size="mini"
                          type="primary"
                          @click="handleRecover(scope.$index, scope.row)">恢复</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--点击修改时候跳出一个对话框完成修改操作以下内容同add_user-->
            <el-dialog title="修改用户信息" :visible.sync="dialogFormVisible">
                <el-form  label-width="100px" class="formstyle" labelPosition="left" :model="change_form" :rules="rules" ref="change_form">
                    <el-form-item label="用户名" prop="change_username" class="item_style">
                        <el-input type="text" v-model="change_form.change_username"></el-input>
                    </el-form-item>
                    <br/>
                    <el-form-item label="年龄" prop="change_age"  class="item_style">
                        <el-input-number v-model="change_form.change_age" :min="0" :max="100" label="年龄"></el-input-number>
                    </el-form-item>
                    <br/>
                    <el-form-item label="邮箱" prop="change_email"  class="item_style">
                        <el-input type="email" v-model="change_form.change_email"></el-input>
                    </el-form-item>
                    <br/>
                    <el-form-item label="性别" prop="change_gender"  class="item_style">
                        <el-radio v-model="change_form.change_gender" label="1" border>男</el-radio>
                        <el-radio v-model="change_form.change_gender" label="0" border>女</el-radio>
                    </el-form-item>
                    <br/>
                    <el-form-item label="身份" prop="change_rank"  class="item_style">
                        <el-radio v-model="change_form.change_rank" label="1" border>管理员</el-radio>
                        <el-radio v-model="change_form.change_rank" label="0" border>用户</el-radio>
                    </el-form-item>
                    <br/>
                    <el-form-item label="密码" prop="change_password"  class="item_style">
                        <el-input type="password" v-model="change_form.change_password"></el-input>
                    </el-form-item>
                    <br/>
                    <el-form-item label="确认密码" prop="change_password_check" class="item_style">
                        <el-input type="password" v-model="change_form.change_password_check"></el-input>
                    </el-form-item>
                    <br/>
                    <el-form-item label="联系方式" prop="change_phone" class="item_style">
                        <el-input type="text" v-model="change_form.change_phone"></el-input>
                    </el-form-item>
                    <br/>
                    <el-form-item>
                        <el-button id="submit_btn" type="primary" @click="submitChangeForm('change_form')">提交</el-button>
                        <el-button id="reset_btn" @click="resetChangeForm('change_form')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </div>
    </div>

  </div>
</template>

<script>
import Vnavigation from './Vnavigation'
import Vheader from "./Vheader";
export default {
  name: 'Vmembers_info',
  data() {
      //联系方式验证
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      var validate_change_phone = (rule, value, callback) => {
          if (phoneReg.test(value)||value==='') {
            callback()
            this.phoneTag=1
          } else {
            callback(new Error('电话号码格式不正确'))
            this.phoneTag=0
          }
    }
//    邮箱格式验证
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
      var validate_change_email = (rule, value, callback) => {
          if (mailReg.test(value)||value==='') {
            callback()
            this.emailTag=1
          } else {
            callback(new Error('请输入正确的邮箱格式'))
            this.emailTag=0
          }
      }
//    密码验证
      var validate_change_password = (rule, value, callback) => {
            if (this.change_form.change_password !== '') {
                this.$refs.change_form.validateField('change_password_check');
                callback();
                this.passwordTag=1
              }
      };
      var validate_change_password_check = (rule, value, callback) => {
        if (value != this.change_form.change_password) {
          callback(new Error('两次输入密码不一致!'));
          this.passwordTag=0
        } else {
          callback();
          this.passwordTag=1
        }
      };
      return {
//          修改用户信息时的表结构
            change_form:{
              change_username:'',
              change_age:'',
              change_email:'',
              change_gender:'',
              change_password:'',
              change_password_check:'',
              change_phone:'',
              change_rank:''
          },
//          管理员西安则按照id或用户名查
          select_form:{
              id:'',
              username:''
          },
//          接收后端数据
          tableData: [],
//          设置点击修改按钮时可不可见
          dialogFormVisible:false,
//          记录修改信息的那个人的id方便传参
          editId:'',
//          记录表单有无填写错误的情况，1为正常，0为异常
          phoneTag:1,
          emailTag:1,
          passwordTag:1,
//      验证规则
          rules:{
    //        rules中规则名名字要和prop中的东西一样，validator的参数和上面写的验证函数名一样
              change_password: [
                { validator: validate_change_password, trigger: 'blur' }
              ],
              change_password_check: [
                { validator: validate_change_password_check, trigger: 'blur' }
              ],
              change_email:[{validator:validate_change_email,trigger:'blur'}],
              change_phone:[{validator:validate_change_phone,trigger:'blur'}]
          }
      }
    },
    components:{Vheader, Vnavigation},
    methods: {
      show_all_members(){
          var that=this
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/members_info/',
              method:'get',
              params:{
                  id:'',
                  username:''
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
              url:'http://127.0.0.1:8000/members_info/',
              method:'get',
              params:{
                  id:that.select_form.id,
                  username:that.select_form.username
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
      submitChangeForm(formName){
//          如果表单数据符合要求则提交
          if(this.phoneTag==1 && this.emailTag==1 &&this.passwordTag==1)
          {
              var that=this
              this.dialogFormVisible=false
              this.$axios.request(
              {
                url:'http://127.0.0.1:8000/change_info/',
                method:'POST',
                data:{
                    id:that.editId,
                    username:that.change_form.change_username,
                    age:that.change_form.change_age,
                    email:that.change_form.change_email,
                    gender:that.change_form.change_gender,
                    password:that.change_form.change_password,
                    phone:that.change_form.change_phone,
                    rank:that.change_form.change_rank
                },
                headers:{
                    'Content-Type':'application/json'
                }
              }
            ).then(function(result){
                if(result.data.code===1000){
                    that.show_all_members()
                }
                else{
                    alert(arg.data.error)
                }
            }).catch(function (result){
              alert("传参失败")
            })
          }
//          表单数据不符合规范则提示
          else
          {
              alert("提交数据不符合规范")
          }
      },
      handleEdit(index, row) {
//        console.log(index, row);
          this.dialogFormVisible=true;
          this.editId=row['id'];
      },
      handleDelete(index, row) {
//        console.log(index, row);
          var that=this
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/delete_member/',
              method:'get',
              params:{
                  id:row['id'],
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                alert("删除成功")
                that.show_all_members()
              }
              else{
                  alert(result.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
      },
      handleRecover(index,row){
//          console.log(index, row);
          var that=this
            this.$axios.request(
              {
                url:'http://127.0.0.1:8000/recover_member/',
                method:'get',
                params:{
                    id:row['id'],
                },
                headers:{
                    'Content-Type':'application/json'
                }
              }
            ).then(function(result){
                if(result.data.code===1000){
  //                  that.tableData=result.data.data
                  alert("恢复成功")
                  that.show_all_members()
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
//      使用resetFields方法必须使用prop属性
      resetChangeForm(formName){
            this.$refs[formName].resetFields();
            this.phoneTag=1;
            this.emailTag=1;
            this.passwordTag=1
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
  }
  .select_item_style{
    float: left;
  }
  .formstyle{
    width:80%;
    margin-left:auto;
    margin-right: auto;
    margin-top: 20px;
    box-shadow: 10px 10px 5px #888888;
    border-style:groove;
  }
  .item_style{
    width: 80%;
  }
  #main_members{
    float: right;
    width: 80%;
    height:100%;
    /*background-image: url(../assets/image/13change.jpg);*/
    /*background-repeat: no-repeat;*/
    /*background-position: center center;*/
    /*background-size: 60%;*/
  }
</style>

