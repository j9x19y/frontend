<!--增加用户界面-->
<template>
  <div>
      <!--导航栏组件-->
      <Vnavigation  style="width: 20%;height:100%;float: left;position: fixed;"></Vnavigation>
      <div id="main_add">
          <vheader style="height: 150px;"></vheader>
            <!--注册用户界面-->
          <el-form  label-width="100px" class="formstyle" labelPosition="left" :model="add_form" :rules="rules" ref="add_form">
              <el-form-item label="用户名" prop="add_username" required="required" class="item_style">
                  <el-input type="text" v-model="add_form.add_username"></el-input>
              </el-form-item>
              <br/>
              <el-form-item label="年龄" prop="add_age" required="required" class="item_style">
                  <el-input-number v-model="add_form.add_age" :min="0" :max="100" label="年龄"></el-input-number>
              </el-form-item>
              <br/>
              <el-form-item label="邮箱" prop="add_email" required="required" class="item_style">
                  <el-input type="email" v-model="add_form.add_email"></el-input>
              </el-form-item>
              <br/>
              <el-form-item label="性别" prop="add_gender" required="required" class="item_style">
                  <el-radio v-model="add_form.add_gender" label="1" border>男</el-radio>
                  <el-radio v-model="add_form.add_gender" label="0" border>女</el-radio>
              </el-form-item>
              <br/>
              <el-form-item label="身份" prop="add_rank" required="required" class="item_style">
                  <el-radio v-model="add_form.add_rank" label="1" border>管理员</el-radio>
                  <el-radio v-model="add_form.add_rank" label="0" border>用户</el-radio>
              </el-form-item>
              <br/>
              <el-form-item label="密码" prop="add_password" required="required" class="item_style">
                  <el-input type="password" v-model="add_form.add_password"></el-input>
              </el-form-item>
              <br/>
              <el-form-item label="确认密码" prop="add_password_check" required="required" class="item_style">
                  <el-input type="password" v-model="add_form.add_password_check"></el-input>
              </el-form-item>
              <br/>
              <el-form-item label="联系方式" prop="add_phone" required="required" class="item_style">
                  <el-input type="text" v-model="add_form.add_phone"></el-input>
              </el-form-item>
              <br/>
              <el-form-item>
                  <el-button id="submit_btn" type="primary" @click="submitForm('add_form')">提交</el-button>
                  <el-button id="reset_btn" @click="resetForm('add_form')">重置</el-button>
              </el-form-item>
          </el-form>
      </div>

  </div>
</template>

<script>
import Vnavigation from './Vnavigation'
import Vheader from './Vheader'
export default {
  name: 'Vadd_user',
  data () {
      //联系方式验证
      const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
      var validate_add_phone = (rule, value, callback) => {
          if (!value) {
            callback(new Error('电话号码不能为空'))
            this.phoneTag=0;
          }
          else if (phoneReg.test(value)) {
            callback()
            this.phoneTag=1;
          } else {
            callback(new Error('电话号码格式不正确'))
            this.phoneTag=0;
          }
      }
//    邮箱格式验证
    const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    var validate_add_email = (rule, value, callback) => {
        if (value==='') {
          callback(new Error('邮箱不能为空'))
          this.emailTag=0;
        }
        else if (mailReg.test(value)) {
          callback()
          this.emailTag=1;
        } else {

          callback(new Error('请输入正确的邮箱格式'))
          this.emailTag=0;
        }
    }
//    密码验证
      var validate_add_password = (rule, value, callback) => {
          if (value === '') {
          callback(new Error('请输入密码'));
          this.passwordTag=0;
          }
          else {
              if (this.add_form.add_password !== '') {
                this.$refs.add_form.validateField('add_password_check');
                callback();
                this.passwordTag=1;
              }
          }
      };
      var validate_add_password_check = (rule, value, callback) => {
        if ( value === '') {
          callback(new Error('请再次输入密码'));
          this.passwordTag=0;
        } else if (value !== this.add_form.add_password) {
          callback(new Error('两次输入密码不一致!'));
          this.passwordTag=0;
        } else {
          callback();
          this.passwordTag=1;
        }
      };
    return {
        add_form:{
            add_username:'',
            add_age:'',
            add_email:'',
            add_gender:'',
            add_password:'',
            add_password_check:'',
            add_phone:'',
            add_rank:''
        },
//      表单内容规范验证
        phoneTag:1,
        emailTag:1,
        passwordTag:1,
//      验证规则
        rules:{
//        rules中规则名名字要和prop中的东西一样，validator的参数和上面写的验证函数名一样
          add_password: [
            { validator: validate_add_password, trigger: 'blur' }
          ],
          add_password_check: [
            { validator: validate_add_password_check, trigger: 'blur' }
          ],
          add_email:[{validator:validate_add_email,trigger:'blur'}],
          add_phone:[{validator:validate_add_phone,trigger:'blur'}]
      }
    }
  },
  components:{Vheader, Vnavigation},
  methods:{
//      提交表单，如果为空就向后端传空值，后端做判断，如果为空则不修改
      submitForm(formName){
        if(this.emailTag==1&&this.phoneTag==1&&this.passwordTag==1)
        {
            var that=this
            this.$axios.request(
              {
                url:'http://127.0.0.1:8000/add_user/',
                method:'POST',
                data:{
                    username:that.add_form.add_username,
                    password:that.add_form.add_password,
                    gender:that.add_form.add_gender,
                    age:that.add_form.add_age,
                    phone:that.add_form.add_phone,
                    email:that.add_form.add_email,
                    rank:that.add_form.add_rank
                },
                headers:{
                    'Content-Type':'application/json'
                }
              }
            ).then(function(result){
                if(result.data.code===1000){
                    alert("增加成功")
    //                that.$router.push({ name : 'main' })
                }
                else{
                    alert(result.data.error)
                }
            }).catch(function (result){
              alert("请填完所有表单项")
            })
        }
        else
        {
            alert("表单格式不符合规范")
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
  .formstyle{
    width:60%;
    margin-left:auto;
    margin-right: auto;
    box-shadow: 10px 10px 5px #888888;
    border-style:groove;
    margin-top: 15%;
  }
  .item_style{
    width: 80%;
  }
  #main_add{
    float: right;
    width: 80%;
    height:100%;
    /*background-image: url(../assets/image/13change.jpg);*/
    /*background-repeat: no-repeat;*/
    /*background-position: center center;*/
    /*background-size: 60%;*/
  }
</style>
