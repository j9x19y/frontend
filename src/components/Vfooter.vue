<!--底部版权说明模板-->
<template>
  <div>
      <div id="footer">
            <div id="experiment_logo">

            </div>
            <div id="copyright">
                <img src="../assets/image/9.png"/>
                <p>copyright@ 北京化工大学</p>
                <p>地址：北京市朝阳区北三环东路15号</p>
                <p>邮编：100029</p>
                <p>Email：news@buct.edu.cn</p>
            </div>
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

        </div>
  </div>
</template>

<script>
export default {
  name: 'Vfooter',
   data() {
      return {

      };
    },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#footer
  {
    float: left;
    width: 100%;
    height: 300px;
    background-color: greenyellow;
    /*margin: 50px auto;*/
    color: rgb(90, 90, 90);
    font-size: 15px;
  }
#experiment_logo
{
  height:100%;
  width: 300px;
  float: left;
  background-image: url(../assets/image/16change.png);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
#copyright
{
  margin-top: 50px;
  margin-right: 50px;
  width: 300px;
  float: right;
  font-size: 18px;
}
  /*#footer>div*/
  /*{*/
      /*height: 200px;*/
      /*display: flex;*/
      /*justify-content: space-around;*/
      /*margin: 0 auto;*/
      /*padding-top: 90px;*/
  /*}*/

  /*#footer div div*/
  /*{*/
      /*width: 150px;*/
      /*height: 200px;*/
  /*}*/

  /*#footer div div:last-child*/
  /*{*/
      /*width: 270px;*/
      /*height: 200px;*/
  /*}*/

  /*#footer div div p:first-child*/
  /*{*/
      /*color: #ffffff;*/
  /*}*/
</style>
