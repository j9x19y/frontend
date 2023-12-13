<!--实验文件管理界面-->
<template>
  <div>
    <Vnavigation   style="width: 20%;height:100%;float: left;position: fixed;"></Vnavigation>
    <div id="main_documents">
        <vheader style="height: 150px;"></vheader>
          <!--实验信息显示-->
        <div id="function_show" style="width: 95%;margin: auto;margin-top: 10%;">
            <h3>路径预测参数设置</h3>
            <div style="margin-top: 20px;width: 100%;float:left">
              <el-form :model="select_form" ref="select_form"  class="demo-ruleForm">
                <el-form-item label="目标产物" label-width="150px" prop="target_met" class="item_style"  style="width: 40%;margin-right: 10%; float: left" required="required">
                  <el-input type="text" v-model="select_form.target_met"></el-input>
                </el-form-item>
                <el-form-item label="预测步长" label-width="150px" prop="predict_step" class="item_style"  style="width: 20%;margin-right: 10%; float: left" required="required">
                  <el-input type="text" v-model="select_form.predict_step"></el-input>
                </el-form-item>
                <el-form-item  class="select_item_style" style="margin-right: 5%">
                    <el-button type="primary" style="margin-top: 20px;" @click="trigger_predict_task()">提交</el-button>
                </el-form-item>
              </el-form>
          </div>
          <h3>路径预测历史任务</h3>
          <el-table :data="document_table_data" style="width: 100%;margin-bottom: 30px;" :default-sort = "{prop: 'date', order: 'descending'}" border height="250">
              <el-table-column label="实验任务文件" sortable >
                  <template slot-scope="scope">
                      <span>{{scope.row.name}}</span>
                  </template>
              </el-table-column>
              <el-table-column prop="name" label="操作" class="column_style"  style="padding: 0">
                    <template slot-scope="scope">
                        <span @click="clickLogic()"><i class="el-icon-search" style="font-size: 25px;margin-left:20px;margin-right: 20px"></i></span>
                    </template>

                </el-table-column>
          </el-table>
          <div>
            <iframe :src="''+source+''" height="800px" width="100%">
            </iframe>
          </div>

            <div>
            <!--路径排名展示部分-->
              <el-table :data="tableData" style="width: 100%;margin-bottom: 30px;" :default-sort = "{prop: 'weighted_score', order: 'descending'}" border height="500">
                  <el-table-column label="前体代谢物" sortable minWidth="8%">
                      <template slot-scope="scope">
                          <span>{{scope.row.target_met}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="origin_met" label="目标代谢物" sortable minWidth="8%">
                      <template slot-scope="scope">
                          <span>{{scope.row.origin_met}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="complexity_change" label="complexity_change" sortable minWidth="7%">
                      <template slot-scope="scope">
                          <span>{{scope.row.complexity_change}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="purchasable" label="purchasable" sortable minWidth="7%">
                      <template slot-scope="scope">
                          <span>{{scope.row.purchasable}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="starting_material" label="starting_material" sortable minWidth="7%">
                      <template slot-scope="scope">
                          <span>{{scope.row.starting_material}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="enzyme_reaction" label="enzyme_reaction" sortable minWidth="7%">
                      <template slot-scope="scope">
                          <span>{{scope.row.enzyme_reaction}}</span>
                      </template>
                  </el-table-column>
                <el-table-column prop="positive_enzyme" label="positive_enzyme" sortable minWidth="7%">
                      <template slot-scope="scope">
                          <span>{{scope.row.positive_enzyme}}</span>
                      </template>
                  </el-table-column>
                <el-table-column prop="bio_roles" label="bio_roles" sortable minWidth="7%">
                      <template slot-scope="scope">
                          <span>{{scope.row.bio_roles}}</span>
                      </template>
                  </el-table-column>
                <el-table-column prop="Rhea_precedent" label="Rhea_precedent" sortable minWidth="7%">
                      <template slot-scope="scope">
                          <span>{{scope.row.Rhea_precedent}}</span>
                      </template>
                  </el-table-column>
                <el-table-column prop="weighted_score" label="weighted_score" sortable minWidth="7%">
                      <template slot-scope="scope">
                          <span>{{scope.row.weighted_score}}</span>
                      </template>
                  </el-table-column>
              </el-table>

          </div>

        </div>

    </div>
  </div>
</template>

<script>
import Vnavigation from './Vnavigation'
import ElForm from "../../node_modules/element-ui/packages/form/src/form";
import ElButton from "../../node_modules/element-ui/packages/button/src/button";
import Vheader from './Vheader'
export default {
  name: 'Vnew_pathway',
  data() {
      return {
//        接收后端数据
//           upgradetableData: {
//             upgrade_reactions_return_list:[],
//             upgrade_reactions_return_result:[]
//           },
//           downgradetableData:{
//             downgrade_reactions_return_list:[],
//             downgrade_reactions_return_result:[]
//           },
//           knockouttableData:{
//             knockout_reactions_return_list:[],
//             knockout_reactions_return_result:[]
//           }
//         source:"../../../backend/\\source\\users\\1_admin\\easy_ecoli_admin\\web_test.html",
        source:"",
        upgradetableData:[],
        downgradetableData:[],
        knockouttableData:[],
        select_form:{
          target_met:"",
          predict_step:""
        },
        document_table_data:[],
        min_cut_res:[],
        tableData:[]
      }
    },
    components:{Vheader, ElButton, ElForm, Vnavigation},
    mounted(){
      this.$store.state.activeIndex='14';
      if(this.$store.state.experiment_name=='')
        alert("请先创建实验");
      this.initDocumentTableData();
      this.cleanFile();
    },
    methods: {

      //点击然后获取最大流最小割计算结果
      // checkFile(index,row){
      //     var that=this;
      //       this.$axios.request(
      //         {
      //           url:'http://127.0.0.1:8000/pathway_search/get_predict_res/',
      //           method:'POST',
      //           data:{
      //             id:that.$store.state.id,
      //             username:that.$store.state.username,
      //             experiment_name:row['name'],
      //           },
      //           headers:{
      //               'Content-Type':'application/json'
      //           }
      //         }
      //       ).then(function(result){
      //           if(result.data.code===1000){
      //             // alert("success");
      //             console.log(result.data.data);
      //               that.source=result.data.data;
      //               alert(that.source)
      //           }
      //           else{
      //               alert("获取失败")
      //           }
      //       }).catch(function (result){
      //         alert("传参失败")
      //       })
      // },
      initDocumentTableData(){
        var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/pathway_search/init_document_table_data/',
              method:'POST',
              data:{
                  id:that.$store.state.id,
                  username:that.$store.state.username,
                  // experiment_name:that.$store.state.experiment_name,
                  experiment_name:"easy_ecoli",
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.document_table_data=result.data.data;
              }
              else{
                  alert(arg.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
      },
      trigger_predict_task(){
          var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/pathway_search/trigger_pathway_task/',
              method:'POST',
              data:{
                  id:that.$store.state.id,
                  username:that.$store.state.username,
                  // experiment_name:that.$store.state.experiment_name,
                  experiment_name:"easy_ecoli",
                  target_met:that.select_form.target_met,
                  predict_step:that.select_form.predict_step,
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  alert("success")
              }
              else{
                  alert(arg.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
      },
      cleanFile(){
        var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/pathway_search/clean_file/',
              method:'POST',
              data:{
                  // id:that.$store.state.id,
                  // username:that.$store.state.username,
                  // // experiment_name:that.$store.state.experiment_name,
                  // experiment_name:"easy_ecoli",
                  // target_met:that.select_form.target_met,
                  // predict_step:that.select_form.predict_step,
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.source=""
              }

          }).catch(function (result){
            alert("传参失败")
          })
      },
      copyFile(){
        this.cleanFile();
        var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/pathway_search/copy_file/',
              method:'POST',
              data:{
                  id:that.$store.state.id,
                  username:that.$store.state.username,
                  // experiment_name:that.$store.state.experiment_name,
                  experiment_name:"easy_ecoli",
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.source="static/web_test.html"
              }

          }).catch(function (result){
            alert("传参失败")
          })
      }
      ,
      changeTable(){
        var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/pathway_search/rank_message/',
              method:'POST',
              data:{
                  id:that.$store.state.id,
                  username:that.$store.state.username,
                  // experiment_name:that.$store.state.experiment_name,
                  experiment_name:"easy_ecoli",
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.tableData=result.data.data
              }

          }).catch(function (result){
            alert("传参失败")
          })
      },
      clickLogic(){
        this.copyFile();
        this.changeTable()
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
    width: 90%;
  }
  .select_item_style{
    float: left;
  }
  .formstyle{
    width:80%;
    margin-left:auto;
    margin-right: auto;
    margin-top: 20px;
  }
  .item_style{
    margin-top: 20px;
    width: 80%;
  }
  #main_documents{
    float: right;
    width: 80%;
    height:100%;
    /*background-image: url(../assets/image/13change.jpg);*/
    /*background-repeat: no-repeat;*/
    /*background-position: center center;*/
    /*background-size: 60%;*/
  }
</style>
