<!--生物通路图模拟界面-->
<template>
  <div>
    <Vnavigation style="width: 20%;height:100%;float: left;position: fixed;"></Vnavigation>
    <div id="main_pathway">
      <vheader style="height: 150px;"></vheader>
<!--      <div style="margin-left: auto;margin-right: auto;width: 90%;margin-top: 10%;">-->
<!--          <iframe src="https://escher.github.io/#/ " id="pathway"></iframe>-->
<!--      </div>-->
        <el-button id="generate_pathway_map" type="primary" @click="submitPathwayMap()" style="float: right;margin-top: 10%;margin-right: 10%">生成通量图</el-button>
        <div v-for="(item,index) in pathway_link_list" style="float: left">
          <a :href="''+item+''" target="_blank">{{item}}</a>
        </div>
    </div>
  </div>
</template>

<script>
import Vnavigation from './Vnavigation'
import Vheader from  './Vheader'
export default {
  name: 'Vpathway',
  data () {
    return {
        pathway_link_list:[]
    }
  },
  mounted(){
      this.$store.state.activeIndex='4'
  },
  components:{Vheader, Vnavigation},
  methods:{
    submitPathwayMap(){
        var that=this
        this.$axios.request(
          {
            //url:'http://127.0.0.1:8000/generate_pathway_map',
            url:'http://localhost:8082/generate_pathway_map',
            method:'POST',
            data:{
                username:that.$store.state.username,
                id:that.$store.state.id,
                // experiment_name:"test1",
                experiment_name: that.$store.state.experiment_name
            },
            headers:{
                'Content-Type':'application/json'
            }
          }
        ).then(function(result){
            if(result.data.code===1000){
                that.pathway_link_list = result.data.data;
                console.log(result.data.data)
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
  #pathway{
    width: 100%;
    height: 500px;
  }
  #main_pathway{
    float: right;
    width: 80%;
    height:100%;
    /*background-image: url(../assets/image/13change.jpg);*/
    /*background-repeat: no-repeat;*/
    /*background-position: center center;*/
    /*background-size: 60%;*/
  }
</style>
