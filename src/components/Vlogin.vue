<!--登录界面-->
<template style="height: 100%;width:100%">
    <div style="height: 100%;width: 100%;">
        <!--头部登录部分-->
        <div id="header" style="height: 100%;">
            <div style="position: relative;left: 10%;top: 10%;width:50%;margin: 0;float: left;">
                <img src="../assets/image/9.png"/>
<!--                <h1 class="titlestyle" style="margin-left: 0;">国家能源生物炼制研发中心</h1>-->
<!--                <h1 class="titlestyle" style="margin-left: 0;">北京市生物加工过程重点实验室</h1>-->
<!--                <h1 class="titlestyle" style="margin-left: 0;">代谢流分析模拟系统</h1>-->
                <h1 class="titlestyle" style="margin-left: 0;">BUCT Metabolism Simulation Tool</h1>
            </div>

            <div id="login" style="background: rgba(249, 247, 247, 0.4);">
                <!--添加监听事件回车提交表单-->
                <el-form   label-width="100px" @keyup.enter.native="submitForm()" :model="login_form" :rules="rules" ref="login_form">
                    <el-form-item label="用户名" prop="username">
                      <el-input type="text" v-model="login_form.username" ></el-input>
                    </el-form-item>
                    <br/>
                    <el-form-item label="密码" prop="password">
                      <el-input type="password" v-model="login_form.password"></el-input>
                    </el-form-item>
                    <br/>
                    <el-form-item>
                      <el-button id="submit_btn" type="primary" @click="submitForm('login_form')" >提交</el-button>
                      <el-button id="reset_btn" @click="resetForm('login_form')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>

        </div>
        <!--内容相关展示-->
        <!--<div id="container">-->
            <!--<div id="landingpage">-->
                <!--<div>Beijing University Of Chemical Technology</div>-->
                <!--<div>Metabolism Simulation Platform-->
                    <!--<br>Simulation and Analysis-->
                <!--</div>-->
                <!--<div id="mobile">-->
                    <!--<div class="floatleft">-->
                        <!--<img src="@/assets/image/1.jpg" width="80px" height="80px"/>-->
                        <!--<h1>Flux Calculation</h1>-->
                        <!--<p>Flux Balance Analysis predict the steady state fluxes by applying mass balance constraints and-->
                            <!--objective function.</p>-->
                    <!--</div>-->
                    <!--<div class="floatright">-->
                        <!--<img src="@/assets/image/2.jpg" width="80px" height="80px"/>-->
                        <!--<h1>Metabolite Analysis</h1>-->
                        <!--<p> Metabolic Flux Analysis (MFA) ，a method used to quantitatively estimate the intracellular metabolic-->
                            <!--flow of pathways.-->
                        <!--</p>-->
                    <!--</div>-->
                    <!--<div class="floatleft">-->
                        <!--<img src="@/assets/image/3.jpg" width="80px" height="80px"/>-->
                        <!--<h1>Scenario Compare</h1>-->
                        <!--<p>Choose the model of bacterial for Scenario compare,check if the C13 data is consistent with the model.-->
                        <!--</p>-->
                    <!--</div>-->
                    <!--<div class="floatright">-->
                        <!--<img src="@/assets/image/4.jpg" width="80px" height="80px"/>-->
                        <!--<h1>Metabolic Pathways</h1>-->
                        <!--<p>Escher is a web-based tool for building, viewing, and sharing visualizations of biological pathways.-->
                        <!--</p>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
        <!--&lt;!&ndash;尾部其他信息&ndash;&gt;-->
        <!--<div id="footer">-->
            <!--<div>-->
                <!--<div>-->
                    <!--<p>LEARN MORE</p>-->
                    <!--<p>How it works?</p>-->
                    <!--<p>Introduction</p>-->
                    <!--<p>Load and Save</p>-->
                    <!--<p>Model data</p>-->
                <!--</div>-->
                <!--<div>-->
                    <!--<p>CONTACT US</p>-->
                    <!--<P>Weibo</P>-->
                    <!--<p>Email</p>-->
                    <!--<p>TEL</p>-->
                <!--</div>-->
                <!--<div>-->
                    <!--<p>TECHNOLOGY</p>-->
                    <!--<p>MFA</p>-->
                    <!--<p>FBA</p>-->
                    <!--<p>ESCHER</p>-->
                    <!--<p>COBRA</p>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->
    </div>
</template>

<script>
export default{
    name:'Vlogin',
  data(){
      var validate_username = (rule, value, callback) => {
      if (value==='') {
        return callback(new Error('用户名不能为空'))
      }
        else{
          callback()
      }
    };
    var validate_password = (rule, value, callback) => {
      if (value==='') {
        return callback(new Error('密码不能为空'))
      }
        else{
          callback()
      }
    };
    return{
        login_form:{
           username: '',
           password: ''
        },
//      验证规则
        rules:{
//        rules中规则名名字要和prop中的东西一样，validator的参数和上面写的验证函数名一样
          username: [
            { validator: validate_username, trigger: 'blur' }
          ],
          password: [
            { validator: validate_password, trigger: 'blur' }
          ],
      }
    }
  },
  methods:{
    submitForm(){
        var that=this
        this.$axios.request(
          {
            url:'http://127.0.0.1:8000/login/',
            method:'POST',
            data:{
                username:that.login_form.username,
                password:that.login_form.password
            },
            headers:{
                'Content-Type':'application/json'
            }
          }
        ).then(function(result){
            if(result.data.code===1000){
//              给store公共数据区的变量赋值，初始化cookie信息
                that.$store.state.username=result.data.username
                that.$store.state.id=result.data.id
                that.$store.state.rank=result.data.rank
                that.$store.state.age=result.data.age
                that.$store.state.email=result.data.email
                that.$store.state.gender=result.data.gender
                that.$store.state.phone=result.data.phone
//              通过commit调用mutation中的方法
                that.$store.commit('saveCookie',{username:that.login_form.username,id:result.data.id,rank:result.data.rank,age:result.data.age,email:result.data.email,gender:result.data.gender,phone:result.data.phone})
//              验证成功则跳转
                sessionStorage.setItem('username', result.data.username);
                // sessionStorage.setItem('token', result.data.token);
//              验证成功则跳转
                that.$router.push({ name : 'main' })
            }
            else{
                alert(result.data.error)
            }
        }).catch(function (result){
          alert("传参失败")
        })
    },
    resetForm(formName){
          this.$refs[formName].resetFields();
      }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #header
  {
      background-image: url(../assets/image/12.jpg);
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      /*position:fixed;*/
      /*width:100%;*/
      width:100%;
      /*height:1000px;*/
  }
  #login
  {
      width: 30%;
      /*height: 300px;*/
      padding-top: 2%;
      /*padding-bottom: 50px;*/
      padding-right: 5%;
      position: relative;
      float: right;
      top: 10%;
      right: 15%;
  }
  #submit_btn
  {
      position: relative;
      left: 15%;
  }
  #reset_btn
  {
      position: relative;
      left: 30%;
  }
  .titlestyle
  {
      color: aliceblue;
      margin-left: 10%;
      margin-top: 0;
      position: relative;
      top: 10%  ;
  }
  #landingpage
  {
    width: 100%;
    text-align: center;
  }

  #landingpage div
  {
      display: inline-block;
  }

  #landingpage>div:first-child
  {
      width: 1000px;
      height: 15px;
      font-size: 15px;
      margin-top: 85px;
  }

  #landingpage>div:nth-child(2)
  {
      width: 1000px;
      height: 170px;
      font-size: 48px;
      margin-top: 40px;
  }

  #mobile
  {
      width:1000px;
      /*height:1000px;*/
  }
  #mobile div
  {
      width: 400px;
      height: 220px;
      margin-bottom: 50px;
      margin-top: 50px;
  }

  .floatleft
  {
      float:left;
  }
  .floatright
  {
    float:right;
  }
  #footer
  {
    width: 80%;
    height: 300px;
    background-color: black;
    margin: 50px auto;
    color: rgb(90, 90, 90);
    font-size: 15px;
  }

  #footer>div
  {
      height: 200px;
      display: flex;
      justify-content: space-around;
      margin: 0 auto;
      padding-top: 90px;
  }

  #footer div div
  {
      width: 150px;
      height: 200px;
  }

  #footer div div:last-child
  {
      width: 270px;
      height: 200px;
  }

  #footer div div p:first-child
  {
      color: #ffffff;
  }
</style>
