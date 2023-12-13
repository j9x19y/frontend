<!--热力学约束通量平衡分析界面-->
<template>
  <div>
    <Vnavigation  style="width: 20%;height:100%;float: left;position: fixed;"></Vnavigation>
    <div id="main_documents">
        <vheader style="height: 150px;"></vheader>
        <div id="user_choose_module" style="width: 95%;margin: auto;margin-top: 10%;">
          <h3>用户选择已添加热力学数据的基础模型</h3>
          <div style="margin-top: 20px;width: 100%;">
            <el-form :model="select_form" ref="select_form"  class="demo-ruleForm">
              <el-form-item  label="细菌模型" label-width="100px" prop="model_name" class="item_style labelsize" required="required" style="width: 30%;margin-right: 10%;float: left">
<!--                <el-input type="text" v-model="select_form.model_name"></el-input>-->
                  <el-select v-model="select_form.thermobacterial.value"  placeholder="请选择" style="float: left">
                      <el-option v-for="item in select_form.thermobacterial" :key="item.value" :label="item.value" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
                <el-form-item  class="select_item_style" style="margin-right: 5%">
                    <el-button type="primary" style="margin-top: 20px;" @click="submitParams()">提交</el-button>
                </el-form-item>
              </el-form>
            </div>
          <div style="margin-top: 20%;">
          </div>
          <!--计算结果表格-->
          <div style="width: 90%;margin-bottom: 30px;margin-left: 4%;margin-top: 30px;float:left">
            <h3>计算结果小结</h3>
            <el-table :data="calculateResultData" :default-sort = "{prop: 'date', order: 'descending'}">
                <el-table-column label="模型" sortable minWidth="6%">
                    <template slot-scope="scope">
                        <span>{{scope.row.model_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="substrate_reaction" label="底物" sortable minWidth="10%">
                    <template slot-scope="scope">
                        <span>{{scope.row.substrate_reaction}}</span>
                    </template>
                </el-table-column>
              <el-table-column prop="target_reaction" label="产物" sortable minWidth="10%">
                    <template slot-scope="scope">
                        <span>{{scope.row.target_reaction}}</span>
                    </template>
                </el-table-column>
              <el-table-column prop="theoretical_rate" label="理论得率" sortable minWidth="10%">
                    <template slot-scope="scope">
                        <span>{{scope.row.theoretical_rate}}</span>
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
import Vheader from './Vheader'
import ElForm from "../../node_modules/element-ui/packages/form/src/form";
import ElButton from "../../node_modules/element-ui/packages/button/src/button";
export default {
  name: 'Vadd_thermodynamic_constraints',
  data() {
    return {
      select_form: {
        // bacterial: '',
        model_name: '',
        thermobacterial: ''
      }
    }
  },
  components: {Vheader, ElButton, ElForm, Vnavigation},
  mounted() {
    this.$store.state.activeIndex = '25';
    this.getThermoBacterial();
  },
  methods: {
      getThermoBacterial(){
          var that=this
            this.$axios.request(
              {
                url:'http://127.0.0.1:8000/add_thermodynamic_constraints/get_thismodels_name/',
                method:'POST',
                data:{
                  // thermobacterial:that.select_form.thermobacterial.value
                },
                headers:{
                    'Content-Type':'application/json'
                }
              }
            ).then(function(result){
                if(result.data.code===1000){
                  console.log(result.data.data);
                    that.select_form.thermobacterial=result.data.data;
                    // console.log(that.select_form.thermobacterial)
                }
                else{
                    alert("获取失败")
                }
            }).catch(function (result){
              alert("传参失败")
            })
      },
      // getReaction(){
      //     var that=this;
      //     this.$axios.request(
      //       {
      //         url:'http://127.0.0.1:8000/cobrapy_function/get_reaction/',
      //         method:'POST',
      //         data:{
      //             thermobacterial:that.select_form.thermobacterial.value
      //         },
      //         headers:{
      //             'Content-Type':'application/json'
      //         }
      //       }
      //     ).then(function(result){
      //         if(result.data.code===1000){
      //             that.select_form.optimize_reaction = result.data.optimize_reaction;
      //             that.select_form.debug_reaction = result.data.debug_reaction;
      //         }
      //         else{
      //             alert(arg.data.error)
      //         }
      //     }).catch(function (result){
      //       alert("传参失败")
      //     })
      // },
      submitParams() {
        var that = this;
        this.$axios.request(
          {
            url: 'http://127.0.0.1:8000/add_thermodynamic_constraints/test_param/',
            method: 'POST',
            data: {
              model_name: that.select_form.model_name,
              bacterial:that.select_form.bacterial.value,
              thermobacterial:that.select_form.thermobacterial.value
            },
            headers: {
              'Content-Type': 'application/json'
            }
          }
        ).then(function (result) {
          if (result.data.code === 1000) {
            console.log(result.data.data);
          } else {
            alert("参数解析失败")
          }
        }).catch(function (result) {
          alert("传参失败")
        })
      }
  }
}
</script>

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
