<!--数据对比分析界面-->
<template>
  <div>
    <!--导航栏-->
    <Vnavigation  style="width: 20%;height:100%;float: left;position: fixed;"></Vnavigation>
    <!--数据对比分析表单-->
    <div id="main_compare">
        <vheader style="float: left;height: 150px;"></vheader>
        <div id="compare">
            <h2>代谢物分析</h2>
            <el-form   label-width="200px">
                <el-form-item label="Metabolite Analysis">
                  <el-input type="text" v-model="metabolite" class="input_style" placeholder="nadph[c]"></el-input>
                  <el-button class="btn_style" type="success" @click="getMetabolite()">生成文件</el-button>
                </el-form-item>
                <br/>
            </el-form>
            <h2>辅因子分析</h2>
            <el-form   label-width="200px">
                <el-form-item label="Cofactors Analysis" >
                  <el-button class="btn_style" type="success" @click="getCofactor()">生成文件</el-button>
                </el-form-item>
                <br/>
            </el-form>
            <h2>野生型对比</h2>
            <div id="wild_compare">
              <el-form   label-width="300px" class="wildformstyle">
                    <el-form-item label="是否使用C13进行模拟计算">
                      <el-select v-model="C13" class="input_style" style="width: 30%">
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="0"></el-option>
                      </el-select>
                      <el-button class="wild_btn_style" type="success" @click="getModel1()">生成模型一文件</el-button>
                      <el-button class="wild_btn_style" type="success" @click="getModel2()">生成模型二文件</el-button>
                    </el-form-item>
                    <!--<br/>-->
                    <el-form-item labelWidth="300px" label="Log" >
                      <el-input type="text" v-model="message" class="input_style" :disabled="true"></el-input>
                    </el-form-item>
                </el-form>
            </div>
          <h2>图表对比展示</h2>
          <div>
            <el-button class="wild_btn_style" type="success" @click="getMetaboliteData()">代谢物对比图表</el-button>
            <el-button class="wild_btn_style" type="success" @click="getAtpData()">atp对比图表</el-button>
            <el-button class="wild_btn_style" type="success" @click="getNadhData()">nadh对比图表</el-button>
            <el-button class="wild_btn_style" type="success" @click="getNadphData()">nadph对比图表</el-button>
            <div id="model1_chart_data" ref="model1_chart_data" style = "height: 450px;width: 100%; float: left;margin-top: 30px"></div>
<!--            <div id="model2_chart_data" ref="model2_chart_data" style = "height: 450px;width: 100%; float: left;margin-top: 30px"></div>-->
          </div>
        </div>
    </div>

  </div>
</template>

<script>
import Vnavigation from './Vnavigation'
import Vheader from './Vheader'

export default {
  name: 'Vmain',
  data () {
    return {
        metabolite:'nadph[c]',
        C13:'0',
        message:'',
        model1_str:'model1',
        model2_str:'model2',
        model1_reactions:[],
        model1_rates:[],
        model2_reactions:[],
        model2_rates:[],
        model1_chart : '',
        model2_chart : '',
        option : {
          title: {
             text: '模型通量对比',   //图表顶部的标题
          },
          tooltip: {},
          legend: {
            data:['通量']
          },
          xAxis : {  //x轴坐标数据
            data : [],
            axisLabel:{
			                            	  interval:0 ,
			                            	  formatter:function(val){
			                            	    return val.split("").join("\n");
			                            	  }
			                         	  }
            },
           yAxis :{},
          series: [  //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
            {
              name:"模型一通量",
              type: "bar",  //pie->饼状图  line->折线图  bar->柱状图
              data:this.model1_rates,
              },{
              name:"模型二通量",
              type: "bar",  //pie->饼状图  line->折线图  bar->柱状图
              data:this.model2_rates,
              }
          ]},
        // option2 : {
        //   title: {
        //      text: '模型二通量展示',   //图表顶部的标题
        //   },
        //   tooltip: {},  //hover显示数据
        //   legend: {
        //     data:['通量']
        //   },
        //   xAxis : [{  //x轴坐标数据
        //     data : [],
        //     // 显示不下横坐标就竖着显示
        //     axisLabel:{
			  //                           	  interval:0 ,
			  //                           	  formatter:function(val){
			  //                           	    return val.split("").join("\n");
			  //                           	  }
			  //                        	  }
        //
        //
        //   }],
        //    yAxis :{},
        //   series: [  //驱动图表生成的数据内容数组，几条折现，数组中就会有几个对应对象，来表示对应的折线
        //     {
        //       name:"通量",
        //       type: "bar",  //pie->饼状图  line->折线图  bar->柱状图
        //       data:this.model2_rates,
        //       }
        //   ]}
    }
  },
  mounted(){
      this.$store.state.activeIndex='3';
      this.model1_chart = this.$echarts.init(this.$refs.model1_chart_data);
      this.model1_chart.setOption(this.option);
      // this.model2_chart = this.$echarts.init(this.$refs.model2_chart_data);
      // this.model2_chart.setOption(this.option2);
  },
  components:{Vnavigation,Vheader},
  methods:{
        getMetabolite(){
              var that=this
              this.$axios.request(
                {
                  url:'http://127.0.0.1:8000/compare_analysis/',
                  method:'POST',
                  data:{
                      id:that.$store.state.id,
                      username:that.$store.state.username,
                      experiment_name:that.$store.state.experiment_name,
                      model_name:that.$store.state.model_name,
                      model1_biomass:that.$store.state.model1_biomass,
                      model1_substrate:that.$store.state.model1_substrate,
                      model1_target_met:that.$store.state.model1_target_met,
                      model1_growth_rate:that.$store.state.model1_growth_rate,
                      model2_biomass:that.$store.state.model2_biomass,
                      model2_substrate:that.$store.state.model2_substrate,
                      model2_target_met:that.$store.state.model2_target_met,
                      model2_growth_rate:that.$store.state.model2_growth_rate,
                      model_LL:that.$store.state.model_ll,
                      model_str:'',
                      metabolite:that.metabolite,
                      mark:2,
                      C13_indicator:that.C13,
                      model1_env:that.$store.state.model1_env,
                      model2_env:that.$store.state.model2_env
                  },
                  headers:{
                      'Content-Type':'application/json'
                  }
                }
              ).then(function(result){
                  if(result.data.code===1000){
                      console.log("代谢物分析成功")
                  }
                  else{
                      alert(result.data.error)
                  }
              }).catch(function (result){
                alert("传参失败")
              })
        },
        getCofactor(){
            var that=this
            this.$axios.request(
              {
                url:'http://127.0.0.1:8000/compare_analysis/',
                method:'POST',
                data:{
                    id:that.$store.state.id,
                    username:that.$store.state.username,
                    experiment_name:that.$store.state.experiment_name,
                    model_name:that.$store.state.model_name,
                    model1_biomass:that.$store.state.model1_biomass,
                    model1_substrate:that.$store.state.model1_substrate,
                    model1_target_met:that.$store.state.model1_target_met,
                    model1_growth_rate:that.$store.state.model1_growth_rate,
                    model2_biomass:that.$store.state.model2_biomass,
                    model2_substrate:that.$store.state.model2_substrate,
                    model2_target_met:that.$store.state.model2_target_met,
                    model2_growth_rate:that.$store.state.model2_growth_rate,
                    model_LL:that.$store.state.model_ll,
                    metabolite:that.metabolite,
                    model_str:'',
                    mark:1,
                    C13_indicator:that.C13,
                    model1_env:that.$store.state.model1_env,
                    model2_env:that.$store.state.model2_env
                },
                headers:{
                    'Content-Type':'application/json'
                }
              }
            ).then(function(result){
                if(result.data.code===1000){
                    console.log("辅因子分析成功")
                }
                else{
                    alert(result.data.error)
                }
            }).catch(function (result){
              alert("传参失败")
            })
        },
        getModel1(){
            var that=this
            this.$axios.request(
              {
                url:'http://127.0.0.1:8000/compare_analysis/',
                method:'POST',
                data:{
                    id:that.$store.state.id,
                    username:that.$store.state.username,
                    experiment_name:that.$store.state.experiment_name,
                    model_name:that.$store.state.model_name,
                    model1_biomass:that.$store.state.model1_biomass,
                    model1_substrate:that.$store.state.model1_substrate,
                    model1_target_met:that.$store.state.model1_target_met,
                    model1_growth_rate:that.$store.state.model1_growth_rate,
                    model2_biomass:that.$store.state.model2_biomass,
                    model2_substrate:that.$store.state.model2_substrate,
                    model2_target_met:that.$store.state.model2_target_met,
                    model2_growth_rate:that.$store.state.model2_growth_rate,
                    model_LL:that.$store.state.model_ll,
                    metabolite:that.metabolite,
                    model_str:that.model1_str,
                    mark:3,
                    C13_indicator:that.C13,
                    model1_env:that.$store.state.model1_env,
                    model2_env:that.$store.state.model2_env
                },
                headers:{
                    'Content-Type':'application/json'
                }
              }
            ).then(function(result){
                if(result.data.code===1000){
                    console.log("野生型一分析成功")
                    that.message=result.data.res
                }
                else{
                    alert(result.data.error)
                }
            }).catch(function (result){
              alert("传参失败")
            })
        },
        getModel2(){
            var that=this
            this.$axios.request(
              {
                url:'http://127.0.0.1:8000/compare_analysis/',
                method:'POST',
                data:{
                    id:that.$store.state.id,
                    username:that.$store.state.username,
                    experiment_name:that.$store.state.experiment_name,
                    model_name:that.$store.state.model_name,
                    model1_biomass:that.$store.state.model1_biomass,
                    model1_substrate:that.$store.state.model1_substrate,
                    model1_target_met:that.$store.state.model1_target_met,
                    model1_growth_rate:that.$store.state.model1_growth_rate,
                    model2_biomass:that.$store.state.model2_biomass,
                    model2_substrate:that.$store.state.model2_substrate,
                    model2_target_met:that.$store.state.model2_target_met,
                    model2_growth_rate:that.$store.state.model2_growth_rate,
                    model_LL:that.$store.state.model_ll,
                    metabolite:that.metabolite,
                    model_str:that.model2_str,
                    mark:4,
                    C13_indicator:that.C13,
                    model1_env:that.$store.state.model1_env,
                    model2_env:that.$store.state.model2_env
                },
                headers:{
                    'Content-Type':'application/json'
                }
              }
            ).then(function(result){
                if(result.data.code===1000){
                  alert("分析成功");
                    console.log("野生型二分析成功")
                    that.message=result.data.res
                }
                else{
                    alert(result.data.error)
                }
            }).catch(function (result){
              alert("传参失败")
            })
        },
    getMetaboliteData(){
            var that=this
            this.$axios.request(
              {
                url:'http://127.0.0.1:8000/get_metabolite_data/',
                method:'POST',
                data:{
                    id:that.$store.state.id,
                    username:that.$store.state.username,
                    experiment_name:that.$store.state.experiment_name,
                    // experiment_name:"easy_ecoli",
                },
                headers:{
                    'Content-Type':'application/json'
                }
              }
            ).then(function(result){
                if(result.data.code===1000){
                    console.log(result.data);
                    that.model1_rates = result.data.model1_data.rates;
                    that.model1_reactions = result.data.model1_data.reactions;
                    that.model2_rates = result.data.model2_data.rates;
                    that.model2_reactions = result.data.model2_data.reactions;
                    var temp = that.option;
                    temp.series[0].data=result.data.model1_and_model2.model1_rates;
                    temp.series[1].data=result.data.model1_and_model2.model2_rates;
                    temp.xAxis.data=result.data.model1_and_model2.reactions;
                    // console.log(temp.xAxis[0].data);
                    console.log(temp);
                    that.model1_chart.setOption(temp);
                    // var temp2 = that.option2;
                    // temp2.series[0].data=result.data.model2_data.rates;
                    // temp2.xAxis[0].data=result.data.model2_data.reactions;
                    // that.model2_chart.setOption(temp2);

                }
                else{
                    alert(result.data.error)
                }
            }).catch(function (result){
              alert("传参失败")
            })
        },
    getAtpData(){
            var that=this
            this.$axios.request(
              {
                url:'http://127.0.0.1:8000/get_cofactor_data/',
                method:'POST',
                data:{
                    id:that.$store.state.id,
                    username:that.$store.state.username,
                    experiment_name:that.$store.state.experiment_name,
                  // experiment_name:"easy_ecoli",
                    cofactor:'atp'
                },
                headers:{
                    'Content-Type':'application/json'
                }
              }
            ).then(function(result){
                if(result.data.code===1000){
                    console.log(result.data);
                    that.model1_rates = result.data.model1_data.rates;
                    that.model1_reactions = result.data.model1_data.reactions;
                    that.model2_rates = result.data.model2_data.rates;
                    that.model2_reactions = result.data.model2_data.reactions;
                    var temp = that.option;
                    temp.series[0].data=result.data.model1_and_model2.model1_rates;
                    temp.series[1].data=result.data.model1_and_model2.model2_rates;
                    temp.xAxis.data=result.data.model1_and_model2.reactions;
                    // console.log(temp.xAxis[0].data);
                    console.log(temp);
                    that.model1_chart.setOption(temp);
                    // var temp2 = that.option2;
                    // temp2.series[0].data=result.data.model2_data.rates;
                    // temp2.xAxis[0].data=result.data.model2_data.reactions;
                    // that.model2_chart.setOption(temp2);
                }
                else{
                    alert(result.data.error)
                }
            }).catch(function (result){
              alert("传参失败")
            })
        },
    getNadhData(){
            var that=this
            this.$axios.request(
              {
                url:'http://127.0.0.1:8000/get_cofactor_data/',
                method:'POST',
                data:{
                    id:that.$store.state.id,
                    username:that.$store.state.username,
                    experiment_name:that.$store.state.experiment_name,
                  // experiment_name:"easy_ecoli",
                    cofactor:"nadh"
                },
                headers:{
                    'Content-Type':'application/json'
                }
              }
            ).then(function(result){
                if(result.data.code===1000){
                    console.log(result.data);
                    that.model1_rates = result.data.model1_data.rates;
                    that.model1_reactions = result.data.model1_data.reactions;
                    that.model2_rates = result.data.model2_data.rates;
                    that.model2_reactions = result.data.model2_data.reactions;
                    var temp = that.option;
                    temp.series[0].data=result.data.model1_and_model2.model1_rates;
                    temp.series[1].data=result.data.model1_and_model2.model2_rates;
                    temp.xAxis.data=result.data.model1_and_model2.reactions;
                    // console.log(temp.xAxis[0].data);
                    console.log(temp);
                    that.model1_chart.setOption(temp);
                    // var temp2 = that.option2;
                    // temp2.series[0].data=result.data.model2_data.rates;
                    // temp2.xAxis[0].data=result.data.model2_data.reactions;
                    // that.model2_chart.setOption(temp2);
                }
                else{
                    alert(result.data.error)
                }
            }).catch(function (result){
              alert("传参失败")
            })
        },
    getNadphData(){
            var that=this
            this.$axios.request(
              {
                url:'http://127.0.0.1:8000/get_cofactor_data/',
                method:'POST',
                data:{
                    id:that.$store.state.id,
                    username:that.$store.state.username,
                    experiment_name:that.$store.state.experiment_name,
                  // experiment_name:"easy_ecoli",
                    cofactor:'nadph'
                },
                headers:{
                    'Content-Type':'application/json'
                }
              }
            ).then(function(result){
                if(result.data.code===1000){
                    console.log(result.data);
                    that.model1_rates = result.data.model1_data.rates;
                    that.model1_reactions = result.data.model1_data.reactions;
                    that.model2_rates = result.data.model2_data.rates;
                    that.model2_reactions = result.data.model2_data.reactions;
                    var temp = that.option;
                    temp.series[0].data=result.data.model1_and_model2.model1_rates;
                    temp.series[1].data=result.data.model1_and_model2.model2_rates;
                    temp.xAxis.data=result.data.model1_and_model2.reactions;
                    // console.log(temp.xAxis[0].data);
                    console.log(temp);
                    that.model1_chart.setOption(temp);
                    // var temp2 = that.option2;
                    // temp2.series[0].data=result.data.model2_data.rates;
                    // temp2.xAxis[0].data=result.data.model2_data.reactions;
                    // that.model2_chart.setOption(temp2);
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
  #compare{
    width: 90%;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 20%;
  }
  .input_style{
    width: 60%;
    float: left;
  }
  .btn_style{
    position: relative;
    left: 20%;
    float: left;
  }
  #wild_compare
  {
    width: 100%;
  }
  .formstyle{
    width:40%;
    float: left;
    margin-left:4%;
    margin-right: 5%;
    box-shadow: 10px 10px 5px #888888;
    border-style:groove;
  }
  .wild_input_style{
    width: 35%;
    float: left;
  }
  .wild_btn_style{
    float: left;
    margin-left: 10%;
  }
  .wildformstyle{
    width: 100%;
  }
  #main_compare{
    float: right;
    width:80%;
    height: 100%;
    /*background-image: url(../assets/image/13change.jpg);*/
    /*background-repeat: no-repeat;*/
    /*background-position: center center;*/
    /*background-size: 60%;*/
  }
</style>
