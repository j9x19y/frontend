<!--个人信息管理界面-->
<template>
  <div>
    <!--导航栏-->
    <vnavigation  style="width: 20%;height:100%;float: left;position: fixed;"></vnavigation>
    <div id="main_personal">
            <!--个人原始信息展示-->
        <vheader style="height: 150px;"></vheader>
        <div id="showmessage">
            <!--用户原始信息展示-->
            <el-form  label-width="100px" class="formstyle" labelPosition="left">
                <el-alert title="此处是您的原始信息" type="info" effect="dark"></el-alert>
                <el-form-item label="用户名"  class="item_style">
                    <el-input type="text" v-model="old_username" :disabled="true"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="年龄"  class="item_style">
                    <el-input type="text" v-model="old_age" :disabled="true"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="邮箱" class="item_style">
                    <el-input type="text" v-model="old_email" :disabled="true"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="性别" class="item_style">
                    <el-input type="text" v-model="old_gender" :disabled="true"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="联系方式" class="item_style">
                    <el-input type="text" v-model="old_phone" :disabled="true"></el-input>
                </el-form-item>
                <br/>
            </el-form>
          <!--用户修改信息展示-->
          <!--model中封装了新表单中的表项，rules绑定了验证规则-->
          <el-form   label-width="100px" class="formstyle" labelPosition="left" :model="new_form" :rules="rules" ref="new_form">
                <el-alert title="您可以在此处修改您的信息" type="info" effect="dark"></el-alert>
                <el-form-item label="用户名" prop="new_username" class="item_style">
                    <el-input type="text" v-model="new_form.new_username"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="年龄" prop="new_age" class="item_style">
                    <el-input-number v-model="new_form.new_age" :min="0" :max="100" label="年龄"></el-input-number>
                </el-form-item>
                <br/>
                <el-form-item label="邮箱" prop="new_email" class="item_style">
                    <el-input type="email" v-model="new_form.new_email"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="性别" prop="new_gender" class="item_style">
                    <el-radio v-model="new_form.new_gender" label="1" border>男</el-radio>
                    <el-radio v-model="new_form.new_gender" label="0" border>女</el-radio>
                </el-form-item>
                <br/>
                <el-form-item label="密码" prop="new_password" class="item_style">
                    <el-input type="password" v-model="new_form.new_password"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="确认密码" prop="new_password_check" class="item_style">
                    <el-input type="password" v-model="new_form.new_password_check"></el-input>
                </el-form-item>
                <br/>
                <el-form-item label="联系方式" prop="new_phone" class="item_style">
                    <el-input type="text" v-model="new_form.new_phone"></el-input>
                </el-form-item>
                <br/>
                <el-form-item>
                    <el-button id="submit_btn" type="primary" @click="submitForm('new_form')">提交</el-button>
                    <el-button id="reset_btn" @click="resetForm('new_form')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

  </div>
</template>

<script>
import Vnavigation from './Vnavigation'
import Vheader from './Vheader'
export default {

  name: 'Vpersonal_info',
  data () {
      //联系方式验证
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      var validate_new_phone = (rule, value, callback) => {
          if (phoneReg.test(value)||value==='') {
            callback()
            this.phoneTag=1;
          } else {
            callback(new Error('电话号码格式不正确'))
            this.phoneTag=0;
          }
    }
//    邮箱格式验证
    const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    var validate_new_email = (rule, value, callback) => {
        if (mailReg.test(value)||value==='') {
          callback()
          this.emailTag=1;
        } else {
          callback(new Error('请输入正确的邮箱格式'))
          this.emailTag=0;
        }
    }
//    密码验证
      var validate_new_password = (rule, value, callback) => {
            if (this.new_form.new_password !== '') {
                this.$refs.new_form.validateField('new_password_check');
                callback();
                this.passwordTag=1;
              }
      };
      var validate_new_password_check = (rule, value, callback) => {
        if (value != this.new_form.new_password) {
          callback(new Error('两次输入密码不一致!'));
          this.passwordTag=0;
        } else {
          callback();
          this.passwordTag=1;
        }
      };
    return {
        old_username:this.$store.state.username,
        old_age:this.$store.state.age,
        old_email:this.$store.state.email,
        old_gender:this.$store.state.gender,
        old_phone:this.$store.state.phone,
        new_form:{
            new_username:'',
            new_age:'',
            new_email:'',
            new_gender:'',
            new_password:'',
            new_password_check:'',
            new_phone:''
        },
//        表单验证规范标记，1为正常，可提交，0为异常不可提交
        phoneTag:1,
        emailTag:1,
        passwordTag:1,
//      验证规则
      rules:{
//        rules中规则名名字要和prop中的东西一样，validator的参数和上面写的验证函数名一样
          new_password: [
            { validator: validate_new_password, trigger: 'blur' }
          ],
          new_password_check: [
            { validator: validate_new_password_check, trigger: 'blur' }
          ],
          new_email:[{validator:validate_new_email,trigger:'blur'}],
          new_phone:[{validator:validate_new_phone,trigger:'blur'}]
      }
    }
  },
//  在加载页面前初始化性别
  mounted(){
      if(this.$store.state.gender==1)
      {
          this.old_gender='男'
      }
      else
          this.old_gender='女'

  },
  components:{Vheader, Vnavigation},
  methods:{
//      提交表单，如果为空就向后端传空值，后端做判断，如果为空则不修改
      submitForm(formName){
          if(this.formTag===1)
          {
              var that=this
              this.$axios.request(
                {
                  url:'http://127.0.0.1:8000/change_personal_info/',
                  method:'POST',
                  data:{
                      id:that.$store.state.id,
                      username:that.new_form.new_username,
                      password:that.new_form.new_password,
                      gender:that.new_form.new_gender,
                      age:that.new_form.new_age,
                      phone:that.new_form.new_phone,
                      email:that.new_form.new_email
                  },
                  headers:{
                      'Content-Type':'application/json'
                  }
                }
              ).then(function(result){
                  if(result.data.code===1000){
      //              将修改后的数据传给store公共数据区的变量赋值，修改cookie信息
                      that.$store.state.username=result.data.username
                      that.$store.state.id=result.data.id
                      that.$store.state.age=result.data.age
                      that.$store.state.email=result.data.email
                      that.$store.state.gender=result.data.gender
                      that.$store.state.phone=result.data.phone
      //              通过commit调用mutation中的方法
                      that.$store.commit('saveCookie',{username:result.data.username,id:result.data.id,rank:that.$store.state.rank,age:result.data.age,email:result.data.email,gender:result.data.gender,phone:result.data.phone})
      //              验证成功则跳转
                      alert("修改成功")
                      that.$router.push({ name : 'main' })
                  }
                  else{
                      alert(result.data.error)
                  }
              }).catch(function (result){
                alert("传参失败")
              })
          }
          else
          {
              alert("表单内容不符合规范")
          }
      },
//      使用resetFields方法必须使用prop属性
      resetForm(formName){
            this.$refs[formName].resetFields();
            this.phoneTag=1;
            this.emailTag=1;
            this.passwordTag=1;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #showmessage{
    width: 100%;
    margin-top: 10%;
  }
  .formstyle{
    width:40%;
    float: left;
    margin-left:4%;
    margin-right: 5%;
    box-shadow: 10px 10px 5px #888888;
    border-style:groove;
  }
  .item_style{
    width: 80%;
  }
  #main_personal{
    float: right;
    width: 80%;
    height:100%;
    /*background-image: url(../assets/image/13change.jpg);*/
    /*background-repeat: no-repeat;*/
    /*background-position: center center;*/
    /*background-size: 60%;*/
  }
</style>
