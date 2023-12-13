<!--主界面-->
<template>
  <div style="height: 100%;">
    <!--<vheader style="float: left;"></vheader>-->
    <Vnavigation style="width: 20%;height:100%;float: left;position: fixed;"></Vnavigation>
    <!--<img src="../assets/image/15.jpg" style="width: 100%"/>-->

    <div id="main_container">
      <vheader></vheader>
        <!--轮播效果-->
        <div style="height:55%;">
            <el-carousel style="height:100%;width: 100%;margin: auto;" :interval="4000"  arrow="hover" indicator-position="outside" height="80%">
                <el-carousel-item v-for="item in datas" :key="item.src" style="height: 100%;">
                        <img :src="item.src" style="width: 70%; height: 100%;margin-left: 15%;">
                </el-carousel-item>
            </el-carousel>
        </div>
        <!--功能图片展示-->
        <div style="width: 70%;float: right;margin-right: 15%;margin-top: 5%">
            <div style="text-align: center;font-size: 4em;">Beijing University Of Chemical Technology</div>
            <div style="text-align: center;font-size: 2em;">Metabolism Simulation Platform Simulation and Analysis</div>
            <div class="agile-welcome-left" style="float: right;">
                <div class="welcome-w3imgs" style="float: right;">
                    <figure style="height: 50%;width: 38%; float: left;" class="effect-chico">
                        <img :src="pic1.src" style="height: 60%;width: 100%;">
                        <figcaption>
                            <h2 style="margin-bottom: 0;">Flux Calculation</h2>
                            <p>Flux Balance Analysis predict the steady state fluxes by applying mass balance constraints and
                                objective function.</p>
                        </figcaption>
                    </figure>
                    <figure style="height: 50%;width: 38%;float: left;" class="effect-chico">
                        <img :src="pic2.src" style="height: 60%;width: 100%;">
                        <figcaption>
                            <h2 style="margin-bottom: 0;">Metabolite Analysis</h2>
                            <p>Metabolic Flux Analysis (MFA) ，a method used to quantitatively estimate the intracellular metabolic
                                flow of pathways.</p>
                        </figcaption>
                    </figure>
                    <figure style="height: 50%;width: 38%; float: left;" class="effect-chico">
                        <img :src="pic3.src" style="height: 60%;width: 100%;">
                        <figcaption>
                            <h2 style="margin-bottom: 0;">Scenario Compare</h2>
                            <p>Choose the model of bacterial for Scenario compare,check if the C13 data is consistent with the model.</p>
                        </figcaption>
                    </figure>
                    <figure style="height: 50%;width: 38%; float: left;" class="effect-chico">
                        <img :src="pic4.src" style="height: 60%;width: 100%;">
                        <figcaption>
                            <h2 style="margin-bottom: 0;">Metabolic Pathways</h2>
                            <p>Escher is a web-based tool for building, viewing, and sharing visualizations of biological pathways.</p>
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
        <vfooter style="float: right;width: 100%;"></vfooter>
    </div>



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
  </div>
</template>

<script>
import Vnavigation from './Vnavigation'
import Vfooter from './Vfooter'
import Vheader from "./Vheader";
export default {
  name: 'Vmain',
  data () {
    return {
        datas: [
            {
              src: require('../assets/image/17.png'),
            },
            {
              src: require('../assets/image/18.png'),
            }
            ,
            {
              src: require('../assets/image/19.png'),
            }
            ,
            {
              src: require('../assets/image/20.png'),
            }
          ],
        pic1:{
              src: require('../assets/image/1change.jpg'),
            },
        pic2:{
              src: require('../assets/image/2change.jpg'),
            },
        pic3:{
              src: require('../assets/image/3change.jpg'),
            },
        pic4:{
              src: require('../assets/image/4change.jpg'),
            }
    }
  },
  mounted(){
      this.$store.state.activeIndex=''
  },
  components:{Vheader, Vfooter, Vnavigation},
  methods:{

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  figure.effect-chico img {
	-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
	-moz-transition: opacity 0.35s, -moz-transform 0.35s;
	transition: opacity 0.35s, transform 0.35s;
	-webkit-transform: scale(1.12);
	-moz-transform: scale(1.12);
	-o-transform: scale(1.12);
	-ms-transform: scale(1.12);
	transform: scale(1.12);
}
figure.effect-chico:hover img {
	opacity: 0.5;
	-webkit-transform: scale(1);
	-moz-transform: scale(1);
	-o-transform: scale(1);
	-ms-transform: scale(1);
	transform: scale(1);
}
/*figure.effect-chico figcaption {*/
	/*padding: 2em;*/
/*}*/
figure.effect-chico figcaption::before {
	position: absolute;
	top: 20px;
	right: 20px;
	bottom: 20px;
	left: 20px;
	border: 1px solid #fff;
	content: '';
	-webkit-transform: scale(1.1);
	-moz-transform: scale(1.1);
	-o-transform: scale(1.1);
	-ms-transform: scale(1.1);
	transform: scale(1.1);
}
figure.effect-chico figcaption::before,
figure.effect-chico p {
	opacity: 0;
	-webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
	-moz-transition: opacity 0.35s, -moz-transform 0.35s;
	transition: opacity 0.35s, transform 0.35s;
}
figure.effect-chico h4 {
    margin: 0.5em 0;
    font-size: 2.5em;
    color: #fff;
    text-transform: capitalize;
    letter-spacing: 1px;
}
figure.effect-chico p {
	color:#fff;
	margin: 0 auto !important;
    max-width: 200px;
    -webkit-transform: scale(1.5);
	-moz-transform: scale(1.5);
	-o-transform: scale(1.5);
	-ms-transform: scale(1.5);
    transform: scale(1.5);
}
figure.effect-chico:hover figcaption::before,
figure.effect-chico:hover p {
	opacity: 1;
	-webkit-transform: scale(1);
	-moz-transform: scale(1);
	-o-transform: scale(1);
	-ms-transform: scale(1);
	transform: scale(1);
}
  .welcome{
	padding:6em 0;
}
.welcome-agileinfo {
    margin-top: 5em;
}
figure.effect-chico.welcome-img2 {
    margin-top: 2em;
}
/* Common style */
.welcome-w3imgs figure {
    position: relative;
    float: left;
    overflow: hidden;
    height: auto;
    background: #000;
    text-align: center;
}
.welcome-w3imgs figure img {
	position: relative;
	display: block;
	max-width: 100%;
	opacity: 0.8;
}
.welcome-w3imgs figure figcaption {
	/*padding: 2em;*/
	color: #fff;
	-webkit-backface-visibility: hidden;
	backface-visibility: hidden;
}
.welcome-w3imgs figure figcaption::before,
.welcome-w3imgs figure figcaption::after {
	/*-- pointer-events:none; --*/
}
.welcome-w3imgs figure figcaption,
.welcome-w3imgs figure figcaption > a {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
  .welcome-w3imgs{
    position: relative;
}
.welcome-w3imgs img{
	width:100%;
}
.agile-welcome-left{
    padding-left: 0;
}
.agile-welcome-right {
    padding: 0em 1em 0 1em;
}
h3.agileits-title,h2.agileits-title {
    color: #16214e;
    font-size: 4em;
    margin-bottom: .5em;
    text-align: center;
}
p{
	color:#999;
	font-size:1em;
	line-height:1.8em;
}
.agile-welcome-right h4 {
    font-size: 1.5em;
    color: #eb5425;
    line-height: 1.2em;
    margin-bottom: 1em;
}
.welcome p {
    margin-bottom: 1.5em;
}
  #main_container{
    float: right;
    width:80%;
    height: 100%;
  }
</style>
