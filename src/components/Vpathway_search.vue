<!--生物通路图模拟界面-->
<template>
  <div>
    <Vnavigation style="width: 20%;height:100%;float: left;position: fixed;"></Vnavigation>
    <div id="main_pathway">
      <vheader style="height: 150px;"></vheader>
      <div style = "margin-top: 25px;float: left;width: 100%">
        <el-form :model="select_product" ref="select_product"  class="demo-ruleForm" style="float: left;width: 100%">
          <el-form-item label="填写产物" label-width="150px" prop="product" class="item_style"  style="width: 30%;margin-left: 20%; float: left" required="required">
              <el-input type="text" v-model="select_product.product"></el-input>
          </el-form-item>
          <el-form-item  class="select_item_style" style="margin-left: 5%;float: left">
              <el-button type="primary"  @click="submitParams()">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    <div style="display: flex;float: left;margin-left: 40%;margin-bottom: 20px">
      <el-button @click="controlScale('bigger')">+</el-button>
      <el-button @click="controlScale('smaller')">-</el-button>
      <el-button @click="controlScale('restore')">1:1</el-button>
    </div>
      <div style="margin-right: 20%;float:right">
            <vue-tree
              ref="scaleTree"
          style="width: 800px; height: 600px; border: 1px solid gray;"
          :dataset="richMediaData"
          :config="treeConfig"
        >
          <template v-slot:node="{ node, collapsed }">
            <div
              class="rich-media-node"
              :style="{ border: collapsed ? '2px solid grey' : '' }"
            >
              <div>
                <img :src="require('../assets/mol_pictures/'+node.Imagelink)"
                style="width: 200px; height: 200px; border-raduis: 4px;"
              />
              <el-button @click.stop="deleteNode(node)">刪除节点</el-button>
              </div>

              <span style="padding: 4px 0; font-weight: bold;"
                >反应物{{ node.Reactant }}</span
              >

<!--              <span style="padding: 4px 0; font-weight: bold;"-->
<!--                >产物{{ node.Productant }}</span-->
<!--              >-->
<!--              <span style="padding: 4px 0; font-weight: bold;"-->
<!--                >模板id{{ node.Template_id }}</span-->
<!--              >-->
<!--              <span style="padding: 4px 0; font-weight: bold;"-->
<!--                >模板{{ node.Template }}</span-->
<!--              >-->
<!--              <span style="padding: 4px 0; font-weight: bold;"-->
<!--                >相似性分数{{ node.R_Similary_Score }}</span-->
<!--              >-->
<!--              <span style="padding: 4px 0; font-weight: bold;"-->
<!--                >最相似反应{{ node.Most_Similar_Reaction }}</span-->
<!--              >-->
<!--              <span style="padding: 4px 0; font-weight: bold;"-->
<!--                >最相似反应的id{{ node.Most_Similar_Reaction_id}}</span-->
<!--              >-->
            </div>

          </template>
        </vue-tree>
      </div>
    </div>
  </div>
</template>

<script>
import Vnavigation from './Vnavigation'
import Vheader from  './Vheader'
import VueTree from './../vue-tree/VueTree.vue'

export default {
  name: 'Vpathway_search',
  components: { 'vue-tree': VueTree ,Vheader, Vnavigation},
  data() {
    return {
      select_product:{product:''},
      richMediaData: {
        Reactant: '',
        Productant:"",
        Template_id: "",
        Template: "",
        R_Similary_Score:"",
        Most_Similar_Reaction:"",
        Most_Similar_Reaction_id:"",
        Imagelink:'empty.png',
        children: []
      },
      treeConfig: { nodeWidth: 200, nodeHeight: 200, levelHeight: 400 }
    }
  },
  mounted(){
      this.$store.state.activeIndex='18'
  },
  methods:{
    deleteNode(node){
      console.log("删除节点"+node);
      console.log(node._key)
      // 如果是根节点则重新初始化
      if(node.Reactant == node.Productant){
        this.richMediaData= {
          Reactant: '',
          Productant:"",
          Template_id: "",
          Template: "",
          R_Similary_Score:"",
          Most_Similar_Reaction:"",
          Most_Similar_Reaction_id:"",
          Imagelink:'empty.png',
          children: []
        }
      }
      // 否则广度优先遍历，找需要删掉的节点
      else{
        var stack = [this.richMediaData];
        var find = false;
        while(stack.length>0){
            var last = stack[stack.length-1];
            stack.pop();
            if(last.children.length>0){
              for(var i= 0;i<last.children.length;i++){
                  if(last.children[i]._key == node._key){
                    find = true;
                    last.children.splice(i, 1);
                    console.log(this.richMediaData);
                    break;
                  }
                  stack.push(last.children[i]);
              }
            }
        }

      }

    },
    imageurl(url){
      let url_png = url.Reactant+'.png';
      alert(url_png);
      return require('../assets/mol_pictures/'+url_png);
    },
    controlScale(command) {
      switch (command) {
        case 'bigger':
          this.$refs.scaleTree.zoomIn()
          break
        case 'smaller':
          this.$refs.scaleTree.zoomOut()
          break
        case 'restore':
          this.$refs.scaleTree.restoreScale()
          break
      }
    },
    submitParams(){
      if(this.select_product.product){
        this.richMediaData.Productant = this.select_product.product;
      this.richMediaData.Reactant = this.select_product.product;

      }

      var that=this;
        this.$axios.request(
          {
            url:'http://127.0.0.1:8000/pathway_search/get_root_pic/',
            method:'POST',
            data:{
              product:that.richMediaData.Productant
            },
            headers:{
                'Content-Type':'application/json'
            }
          }
        ).then(function(result){
            if(result.data.code===1000){
              that.richMediaData.Imagelink = that.select_product.product+'.png';
            }
            else{
                alert("获取失败，请检查代谢物格式")
            }
        }).catch(function (result){
          alert("传参失败，请检查代谢物格式")
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #pathway{
    width: 100%;
    height: 500px;
  }
  .rich-media-node {
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: white;
  background-color: #f7c616;
  border-radius: 4px;
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
