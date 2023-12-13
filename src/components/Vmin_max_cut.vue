<!--实验文件管理界面-->
<template>
  <div>
    <Vnavigation   style="width: 20%;height:100%;float: left;position: fixed;"></Vnavigation>
    <div id="main_documents">
        <vheader style="height: 150px;"></vheader>
          <!--实验信息显示-->
        <div id="function_show" style="width: 95%;margin: auto;margin-top: 10%;">
            <h3>最大流最小割算法参数设置</h3>
            <div style="margin-top: 20px;width: 100%;float:left">
              <el-form :model="select_form" ref="select_form"  class="demo-ruleForm">
                <el-form-item  label="模型" class="item_style labelsize" required="required" style="width: 30%;float: left">
                    <el-select v-model="select_form.model.value" filterable placeholder="请选择" style="float: left" @change="getWildReaction()">
                        <el-option v-for="item in select_form.model" :key="item.value" :label="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="生长方程" class="item_style labelsize" required="required" style="width: 50%;float: left">
                    <el-select v-model="select_form.growth_function.value" filterable placeholder="请选择" style="float: left">
                        <el-option v-for="item in select_form.growth_function" :key="item.value" :label="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="目标方程" class="item_style labelsize" required="required" style="width: 30%;float: left">
                    <el-select v-model="select_form.target_function.value" filterable placeholder="请选择" style="float: left">
                        <el-option v-for="item in select_form.target_function" :key="item.value" :label="item.value" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="生长比率" label-width="150px" prop="growth_rate" class="item_style"  style="width: 20%;margin-right: 10%; float: left" required="required">
                  <el-input type="text" v-model="select_form.growth_rate"></el-input>
                </el-form-item>
                <el-form-item  class="select_item_style" style="margin-right: 5%">
                    <el-button type="primary" style="margin-top: 20px;" @click="get_min_max_cut_data()">提交</el-button>
                </el-form-item>
              </el-form>
          </div>
          <h3>最大流最小割算法历史任务</h3>
          <el-table :data="document_table_data" style="width: 100%;margin-bottom: 30px;" :default-sort = "{prop: 'date', order: 'descending'}" border height="250">
              <el-table-column label="实验任务文件" sortable >
                  <template slot-scope="scope">
                      <span>{{scope.row.name}}</span>
                  </template>
              </el-table-column>
              <el-table-column prop="name" label="操作" class="column_style"  style="padding: 0">
                    <template slot-scope="scope">
                        <span @click="checkFile(scope.$index, scope.row)"><i class="el-icon-search" style="font-size: 25px;margin-left:20px;margin-right: 20px"></i></span>
                    </template>

                </el-table-column>
          </el-table>
          <h3>最大流最小割算法结果</h3>
          <el-table :data="min_cut_res" style="width: 100%;margin-bottom: 30px;"  border height="250">
              <el-table-column label="排名"  >
                  <template slot-scope="scope">
                      <span>{{scope.row.number}}</span>
                  </template>
              </el-table-column>
              <el-table-column label="最小割集" >
                  <template slot-scope="scope">
                      <span>{{scope.row.min_cut_reaction_name}}</span>
                  </template>
              </el-table-column>
            <el-table-column label="割集总流量" >
                  <template slot-scope="scope">
                      <span>{{scope.row.min_cut_reaction_flux}}</span>
                  </template>
              </el-table-column>
            <el-table-column label="调控建议">
                  <template slot-scope="scope">
                      <span>{{scope.row.experiment_operation}}</span>
                  </template>
              </el-table-column>
            <el-table-column label="优先调控反应" >
                  <template slot-scope="scope">
                      <span>{{scope.row.first_operation_reaction}}</span>
                  </template>
              </el-table-column>
            <el-table-column label="优先调控反应通量" >
                  <template slot-scope="scope">
                      <span>{{scope.row.first_operation_flux}}</span>
                  </template>
              </el-table-column>
          </el-table>
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
  name: 'Vmin_max_cut',
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
        upgradetableData:[],
        downgradetableData:[],
        knockouttableData:[],
        select_form:{
          model:'',
          growth_function:'',
          target_function:'',
          growth_rate:-1,
        },
        document_table_data:[],
        min_cut_res:[]
      }
    },
    components:{Vheader, ElButton, ElForm, Vnavigation},
    mounted(){
      this.$store.state.activeIndex='14';
      if(this.$store.state.experiment_name=='')
        alert("请先创建实验");
      this.getBacterial();
      this.initDocumentTableData();
    },
    methods: {
    getBacterial(){
          var that=this;
            this.$axios.request(
              {
                url:'http://127.0.0.1:8000/get_models_name/',
                method:'POST',
                data:{

                },
                headers:{
                    'Content-Type':'application/json'
                }
              }
            ).then(function(result){
                if(result.data.code===1000){
                  console.log(result.data.data);
                    that.select_form.model=result.data.data;
                }
                else{
                    alert("获取失败")
                }
            }).catch(function (result){
              alert("传参失败")
            })
      },
      //点击然后获取最大流最小割计算结果
      checkFile(index,row){
          var that=this;
            this.$axios.request(
              {
                url:'http://127.0.0.1:8000/min_max_cut/get_min_cut_res/',
                method:'POST',
                data:{
                  id:that.$store.state.id,
                  username:that.$store.state.username,
                  experiment_name:row['name'],
                },
                headers:{
                    'Content-Type':'application/json'
                }
              }
            ).then(function(result){
                if(result.data.code===1000){
                  // alert("success");
                  console.log(result.data.data);
                    that.min_cut_res=result.data.data;
                }
                else{
                    alert("获取失败")
                }
            }).catch(function (result){
              alert("传参失败")
            })
      },
      getWildReaction(){
          var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/cobrapy_function/get_reaction/',
              method:'POST',
              data:{
                  bacterial:that.select_form.model.value
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.select_form.growth_function = result.data.debug_reaction;
                  // ES6 ...运算符，如果有这个对象那就覆盖这个值
                  that.select_form.target_function = {...result.data.debug_reaction};
              }
              else{
                  alert(arg.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
      },
      initDocumentTableData(){
        var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/min_max_cut/init_document_table_data/',
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
      get_min_max_cut_data(){
          var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/min_max_cut/cut_result/',
              method:'POST',
              data:{
                  id:that.$store.state.id,
                  username:that.$store.state.username,
                  // experiment_name:that.$store.state.experiment_name,
                  experiment_name:"easy_ecoli",
                  model:that.select_form.model.value,
                  growth_function:that.select_form.growth_function.value,
                  target_function:that.select_form.target_function.value,
                  growth_rate:that.select_form.growth_rate,
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
