<!--主界面-->
<template>
  <div  id="header" style="height: 15%;">
      <!--<div id="font"><p>北京化工大学-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;代谢流分析模拟系统</p></div>-->
  </div>
</template>

<script>
export default {
  name: 'Vheader',
  data () {
    return {
    }
  },
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*p{*/
    /**/
  /*}*/
  #header
  {
    text-align: center;
    width: 100%;
    /*background-color: whitesmoke;*/
    background-image: url(../assets/image/top_banner.jpg);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    float: left;
    /*animation: header 5s;*/
    /*-moz-animation:header 5s; !* Firefox *!*/
    /*-webkit-animation:header 5s; !* Safari and Chrome *!*/
    /*-o-animation:header 5s; !* Opera *!*/
  }
  #font{
    font-size: 30px;
    text-shadow: 5px 5px 5px gray;
    /*color: wheat;*/
    animation: font 1s;
    -moz-animation:font 1s; /* Firefox */
    -webkit-animation:font 1s; /* Safari and Chrome */
    -o-animation:font 1s; /* Opera */
  }
  @-webkit-keyframes header /* Safari and Chrome */
{
    0%   {background:white;}
    25%  {background:whitesmoke;}
    50%  {background:ghostwhite;}
    100% {background:floralwhite;}
}
    @-webkit-keyframes font /* Safari and Chrome */
{
    0%   {position:absolute;left:-250px;}
    100% {position:absolute;left:500px;}
}
</style>
