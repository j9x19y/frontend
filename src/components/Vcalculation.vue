<!--通量计算功能界面-->
<template>
  <div>
    <!--导航栏-->
    <Vnavigation  style="width: 20%;height:100%;float: left;position: fixed;"></Vnavigation>
    <div id="main_calculation">
        <div style="height: 80%;float: right;margin-bottom: 10%;">
            <vheader style="height: 150px;"></vheader>
          <div style="margin-top: 10%;">
                <!--填写模型界面-->
                <div class="models_div" >
                  <div class="formstyle" style="float: left">
                      <el-form  label-width="40px" class="demo-dynamic"  >
                        <h3>请输入模型一的培养环境</h3>
                        <div v-for="(item,index) in model1_env.domains" :key="index" style="float: left">
                          <el-form-item label="养料" prop="'domains.'+index+'.nourish'" style="width: 25%;float: left">
                            <el-input v-model="item.nourish"></el-input>
                          </el-form-item>
                          <el-form-item label="浓度" prop="'domains.'+index+'.constractions'" style="width: 25%;float: left">
                            <el-input v-model="item.constractions"></el-input>
                          </el-form-item>
                          <el-form-item label="类型" prop="'domains.'+index+'.boundtype'" style="width: 25%;float: left">
                            <el-input v-model="item.boundtype"></el-input>
                          </el-form-item>
                          <el-button @click="removeDomain1(item,index)" type="danger" style="float: left;margin-left: 3%">删除</el-button>
                        </div>
                        <el-button @click="addDomain1" type="primary" style="float: left;margin-left: 78%;margin-bottom: 20px;">增加</el-button>
                      </el-form>
                  </div>
                  <div class="formstyle" style="float: left">
                      <el-form  label-width="40px" class="demo-dynamic"  >
                        <h3>请输入模型二的培养环境</h3>
                        <div v-for="(item,index) in model2_env.domains" :key="index" style="float: left">
                          <el-form-item label="养料" prop="'domains.'+index+'.nourish'" style="width: 25%;float: left">
                            <el-input v-model="item.nourish"></el-input>
                          </el-form-item>
                          <el-form-item label="浓度" prop="'domains.'+index+'.constractions'" style="width: 25%;float: left">
                            <el-input v-model="item.constractions"></el-input>
                          </el-form-item>
                          <el-form-item label="类型" prop="'domains.'+index+'.boundtype'" style="width: 25%;float: left">
                            <el-input v-model="item.boundtype"></el-input>
                          </el-form-item>
                          <el-button @click="removeDomain2(item,index)" type="danger" style="float: left;margin-left: 3%">删除</el-button>
                        </div>
                        <el-button @click="addDomain2" type="primary" style="float: left;margin-left: 78%;margin-bottom: 20px;">增加</el-button>
                      </el-form>
                  </div>
                </div>
                <div class="models_div">
                    <!--模型一参数填写-->
                    <el-form   label-width="180px"  :model="model1_form"  ref="model1_form" class="formstyle">
                        <h3>请输入模型一的参数</h3>
                        <el-form-item label="Biomass" prop="model1_biomass" class="item_style">
                          <el-select v-model="model1_form.model1_biomass.value" :placeholder="model1_parameter.model1_biomass">
                            <el-option v-for="item in model1_form.model1_biomass" :key="item.value" :label="item.value" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                        <br/>
                        <el-form-item label="Substrate" prop="model1_substrate" class="item_style">
                          <el-select v-model="model1_form.model1_substrate.value" :placeholder="model1_parameter.model1_substrate">
                            <el-option v-for="item in model1_form.model1_substrate" :key="item.value" :label="item.value" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                        <br/>
                        <el-form-item label="Target met" prop="model1_target_met" class="item_style">
                          <el-select v-model="model1_form.model1_target_met.value" :placeholder="model1_parameter.model1_target_met">
                            <el-option v-for="item in model1_form.model1_target_met" :key="item.value" :label="item.value" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                        <br/>
                        <el-form-item label="Min/Max Growth Rate" prop="model1_growth_rate" class="item_style">
                          <el-input type="text" v-model="model1_form.model1_growth_rate" :placeholder="model1_parameter.model1_biomass"></el-input>
                        </el-form-item>
                        <el-form-item label="LL" prop="model1_LL" class="item_style" >
                          <el-input type="text" v-model="model1_form.model1_LL" ></el-input>
                        </el-form-item>
                        <el-form-item class="item_style">
                          <el-button class="submit_btn" type="primary" @click="submitModel1Form('model1_form')" >提交</el-button>
                          <!--<el-button class="reset_btn" @click="resetmodel1Form('model1_form')">重置</el-button>-->
                        </el-form-item>
                    </el-form>
                    <!--模型二参数填写-->
                    <el-form   label-width="180px"  :model="model2_form"  ref="model2_form" class="formstyle">
                        <h3>请输入模型二的参数</h3>
                        <el-form-item label="Biomass" prop="model2_biomass" class="item_style">
                          <el-select v-model="model2_form.model2_biomass.value" :placeholder="model2_parameter.model2_biomass">
                            <el-option v-for="item in model2_form.model2_biomass" :key="item.value" :label="item.value" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                        <br/>
                        <el-form-item label="Substrate" prop="model2_substrate" class="item_style">
                          <el-select v-model="model2_form.model2_substrate.value" :placeholder="model2_parameter.model2_substrate">
                            <el-option v-for="item in model2_form.model2_substrate" :key="item.value" :label="item.value" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                        <br/>
                        <el-form-item label="Target met" prop="model2_target_met" class="item_style">
                          <el-select v-model="model2_form.model2_target_met.value" :placeholder="model2_parameter.model2_target_met">
                            <el-option v-for="item in model2_form.model2_target_met" :key="item.value" :label="item.value" :value="item.value"></el-option>
                          </el-select>
                        </el-form-item>
                        <br/>
                        <el-form-item label="Min/Max Growth Rate" prop="model2_growth_rate" class="item_style">
                          <el-input type="text" v-model="model2_form.model2_growth_rate"></el-input>
                        </el-form-item>
                        <el-form-item label="LL" prop="model2_LL" class="item_style">
                          <el-input type="text" v-model="model2_form.model2_LL" ></el-input>
                        </el-form-item>
                        <el-form-item class="item_style">
                          <el-button class="submit_btn" type="primary" @click="submitModel2Form('model2_form')" >提交</el-button>
                          <!--<el-button class="reset_btn" @click="resetmodel2Form('model2_form')">重置</el-button>-->
                        </el-form-item>
                    </el-form>
                </div>
                <!--模型计算结果返回界面-->
                <div class="models_div">
                    <!--模型一计算结果显示-->
                    <el-form   label-width="130px"  :model="model1_result_form"  ref="model1_result_form" class="formstyle">
                        <h3>模型一计算结果</h3>
                        <el-form-item label="Tar_LB" prop="result1_Tar_LR" class="item_style">
                          <el-input type="text" v-model="model1_result_form.result1_Tar_LR" :disabled="true"></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="Tar_UB" prop="result1_Tar_UR" class="item_style">
                          <el-input type="text" v-model="model1_result_form.result1_Tar_UR" :disabled="true"></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="Biomass" prop="result1_biomass" class="item_style">
                          <el-input type="text" v-model="model1_result_form.result1_biomass" :disabled="true"></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="Theoretical Yield" prop="result1_yield" class="item_style">
                          <el-input type="text" v-model="model1_result_form.result1_yield" :disabled="true"></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="Formula" prop="result1_formula" class="item_style">
                          <el-input type="textarea" v-model="model1_result_form.result1_formula" :disabled="true"></el-input>
                        </el-form-item>
                        <br/>
                    </el-form>
                    <!--模型二计算结果-->
                    <el-form   label-width="130px"  :model="model2_result_form"  ref="model2_result_form" class="formstyle">
                        <h3>模型二计算结果</h3>
                        <el-form-item label="Tar_LB" prop="result2_Tar_LR" class="item_style">
                          <el-input type="text" v-model="model2_result_form.result2_Tar_LR" :disabled="true"></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="Tar_UB" prop="result2_Tar_UR" class="item_style">
                          <el-input type="text" v-model="model2_result_form.result2_Tar_UR" :disabled="true"></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="Biomass" prop="result2_biomass" class="item_style">
                          <el-input type="text" v-model="model2_result_form.result2_biomass" :disabled="true"></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="Theoretical Yield" prop="result2_yield" class="item_style">
                          <el-input type="text" v-model="model2_result_form.result2_yield" :disabled="true"></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="Formula" prop="result2_formula" class="item_style">
                          <el-input type="textarea" v-model="model2_result_form.result2_formula" :disabled="true"></el-input>
                        </el-form-item>
                        <br/>
                    </el-form>
                </div>
          </div>

          <!--        计算结果表格-->
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
import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item";
import ElInput from "../../node_modules/element-ui/packages/input/src/input";
import ElForm from "../../node_modules/element-ui/packages/form/src/form";
export default {
  name: 'Vcalculation',
  data () {
    return {
//        模型一和模型二的下拉参数列表
          model1_form:{
            model1_biomass:['1','23'],
            model1_substrate:[],
            model1_target_met:[],
            model1_growth_rate:this.$store.state.model1_parameter_growth_rate,
            model1_LL:0
        },
//          模型一的培养基环境
//          model1_env:{
//            domains:[{
//                    nourish:'',//养料
//                    constractions:'',//浓度
//                    boundtype:''//l或b或u
//            }],
//        },
        model1_env:this.$store.state.model1_env,
//        模型二的培养环境
        model2_env:this.$store.state.model2_env,
        model2_form:{
            model2_biomass:[],
            model2_substrate:[],
            model2_target_met:[],
            model2_growth_rate:this.$store.state.model2_parameter_growth_rate,
            model2_LL:0
        },
//        模型一和二的结果显示
        model1_result_form:{
              result1_Tar_LR:this.$store.state.model1_result_tarlb,
              result1_Tar_UR:this.$store.state.model1_result_tarub,
              result1_biomass:this.$store.state.model1_result_biomass,
              result1_yield:this.$store.state.model1_result_theoretical,
              result1_formula:this.$store.state.model1_result_formula,
        },
        model2_result_form:{
              result2_Tar_LR:this.$store.state.model2_result_tarlb,
              result2_Tar_UR:this.$store.state.model2_result_tarub,
              result2_biomass:this.$store.state.model2_result_biomass,
              result2_yield:this.$store.state.model2_result_theoretical,
              result2_formula:this.$store.state.model2_result_formula,
        },
//        用户切换回本页面可以查看到自己设定的参数
        model1_parameter:{
            model1_biomass:this.$store.state.model1_parameter_biomass,
            model1_substrate:this.$store.state.model1_parameter_substrate,
            model1_target_met:this.$store.state.model1_parameter_target_met,
            model1_growth_rate:this.$store.state.model1_parameter_growth_rate,
        },
        model2_parameter:{
            model2_biomass:this.$store.state.model2_parameter_biomass,
            model2_substrate:this.$store.state.model2_parameter_substrate,
            model2_target_met:this.$store.state.model2_parameter_target_met,
            model2_growth_rate:this.$store.state.model2_parameter_growth_rate,
        },
        model1_str : "model1",
        model2_str : "model2",
        calculateResultData:[],
    }
  },
  mounted(){
      this.$store.state.activeIndex='2';
      if(this.$store.state.experiment_name!='')
        this.initial_model_form();
      else
          alert("请先创建实验")
      if(window.sessionStorage.getItem("calculateResultData")!=null)
        this.calculateResultData =JSON.parse(sessionStorage.getItem('calculateResultData'));
      else
        sessionStorage.setItem('calculateResultData',JSON.stringify(this.calculateResultData));
  },
  components:{ElForm, ElInput, ElFormItem, Vheader, Vnavigation},
  methods:{
      initial_model_form(){
          var that=this
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/get_initial_model_form/',
              method:'POST',
              data:{
                  model_name:this.$store.state.model_name
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.model1_form.model1_biomass=result.data.model1_biomass_list
                  that.model1_form.model1_substrate=result.data.model1_substrate_list
                  that.model1_form.model1_target_met=result.data.model1_target_met_list
                  that.model2_form.model2_biomass=result.data.model2_biomass_list
                  that.model2_form.model2_substrate=result.data.model2_substrate_list
                  that.model2_form.model2_target_met=result.data.model2_target_met_list
              }
              else{
                  alert(result.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
      },
//    submitModel1Form(formName){
//          alert(document.getElementById("m1").value)
//          alert(this.model1_form.model1_substrate.value)
//          alert(this.model1_form.model1_target_met.value)
//    },
//    模型一的培养环境增加删除
       removeDomain1(item,index) {
        if (index !== -1) {
          this.model1_env.domains.splice(index, 1)
        }
      },
      addDomain1() {
        this.model1_env.domains.push({
          nourish: '',
          constractions: '',
          boundtype: '',
//          key: Date.now()
        });
      },
//    模型二的培养环境增加删除
       removeDomain2(item,index) {
        if (index !== -1) {
          this.model2_env.domains.splice(index, 1)
        }
      },
      addDomain2() {
        this.model2_env.domains.push({
          nourish: '',
          constractions: '',
          boundtype: '',
//          key: Date.now()
        });
      },
//    清空模型一的参数表单
    resetmodel1Form(formName){
        this.$refs[formName].resetFields();
    },
//    清空模型二的参数表单
    resetmodel2Form(formName){
        this.$refs[formName].resetFields();
    },
//    提交模型一的表单
    submitModel1Form(formName){
//      此处存储一下模型一的参数，便于后续辅因子，野生型，代谢物分析
        this.$store.state.model1_biomass=this.model1_form.model1_biomass.value;
        this.$store.state.model1_substrate=this.model1_form.model1_substrate.value;
        this.$store.state.model1_target_met=this.model1_form.model1_target_met.value;
        this.$store.state.model1_growth_rate=this.model1_form.model1_growth_rate;
//      存储一下模型一参数便于用户切换到本页面还可以看到参数
        this.$store.state.model1_parameter_biomass=this.model1_form.model1_biomass.value;
        this.$store.state.model1_parameter_substrate=this.model1_form.model1_substrate.value;
        this.$store.state.model1_parameter_target_met=this.model1_form.model1_target_met.value;
        this.$store.state.model1_parameter_growth_rate=this.model1_form.model1_growth_rate;
//      存储模型一的培养环境
        this.$store.state.model1_env=this.model1_env;
        var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/get_model_form_result/',
              method:'POST',
              data:{
                  id:that.$store.state.id,
                  username:that.$store.state.username,
                  experiment_name:that.$store.state.experiment_name,
                  model_name:that.$store.state.model_name,
                  model_biomass:that.model1_form.model1_biomass.value,
                  model_substrate:that.model1_form.model1_substrate.value,
                  model_target_met:that.model1_form.model1_target_met.value,
                  model_LL:that.model1_form.model1_LL,
                  model_growth_rate:that.model1_form.model1_growth_rate,
                  model_env:that.model1_env,
                  model_str:that.model1_str
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.model1_result_form.result1_Tar_LR=result.data.Tar_LR;
                  that.model1_result_form.result1_Tar_UR=result.data.Tar_UR;
                  that.model1_result_form.result1_biomass=result.data.Biomass;
                  that.model1_result_form.result1_yield=result.data.Theoretical_yield;
                  that.model1_result_form.result1_formula=result.data.formula;
                  that.$store.state.model1_result_tarlb=result.data.Tar_LR;
                  that.$store.state.model1_result_tarub=result.data.Tar_UR;
                  that.$store.state.model1_result_biomass=result.data.Biomass;
                  that.$store.state.model1_result_theoretical=result.data.Theoretical_yield;
                  that.$store.state.model1_result_formula=result.data.formula;
                  //前端存储模型1计算结果
                  sessionStorage.setItem('model1_tarlb', result.data.Tar_LR);
                  sessionStorage.setItem('model1_tarub', result.data.Tar_UR);
                  sessionStorage.setItem('model1_biomass', result.data.Biomass);
                  sessionStorage.setItem('model1_theoretical', result.data.Theoretical_yield);
                  sessionStorage.setItem('model1_formula', result.data.formula);
                  var temp_dic = {"model_name":that.$store.state.model_name,"substrate_reaction":that.model1_form.model1_substrate.value,
                    "target_reaction":that.model1_form.model1_target_met.value,"theoretical_rate":result.data.Theoretical_yield};
                  var temp_res = JSON.parse(sessionStorage.getItem('calculateResultData'));
                  temp_res.push(temp_dic);
                  sessionStorage.setItem('calculateResultData',JSON.stringify(temp_res));
                  that.calculateResultData = JSON.parse(sessionStorage.getItem('calculateResultData'));

              }
              else{
                  alert(result.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
    },
//    提交模型二的表单
    submitModel2Form(formName){
        //      此处存储一下模型二的参数，便于后续辅因子，野生型，代谢物分析
        this.$store.state.model2_biomass=this.model2_form.model2_biomass.value;
        this.$store.state.model2_substrate=this.model2_form.model2_substrate.value;
        this.$store.state.model2_target_met=this.model2_form.model2_target_met.value;
        this.$store.state.model2_growth_rate=this.model2_form.model2_growth_rate;
        //      存储一下模型二参数便于用户切换到本页面还可以看到参数
        this.$store.state.model2_parameter_biomass=this.model2_form.model2_biomass.value;
        this.$store.state.model2_parameter_substrate=this.model2_form.model2_substrate.value;
        this.$store.state.model2_parameter_target_met=this.model2_form.model2_target_met.value;
        this.$store.state.model2_parameter_growth_rate=this.model2_form.model2_growth_rate;
        //      存储模型二的培养环境
        this.$store.state.model2_env=this.model2_env;
        var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/get_model_form_result/',
              method:'POST',
              data:{
                  id:that.$store.state.id,
                  username:that.$store.state.username,
                  experiment_name:that.$store.state.experiment_name,
                  model_name:that.$store.state.model_name,
                  model_biomass:that.model2_form.model2_biomass.value,
                  model_substrate:that.model2_form.model2_substrate.value,
                  model_target_met:that.model2_form.model2_target_met.value,
                  model_LL:that.model2_form.model2_LL,
                  model_growth_rate:that.model2_form.model2_growth_rate,
                  model_env:that.model2_env,
                  model_str:that.model2_str
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.model2_result_form.result2_Tar_LR=result.data.Tar_LR;
                  that.model2_result_form.result2_Tar_UR=result.data.Tar_UR;
                  that.model2_result_form.result2_biomass=result.data.Biomass;
                  that.model2_result_form.result2_yield=result.data.Theoretical_yield;
                  that.model2_result_form.result2_formula=result.data.formula;
                  that.$store.state.model2_result_tarlb=result.data.Tar_LR;
                  that.$store.state.model2_result_tarub=result.data.Tar_UR;
                  that.$store.state.model2_result_biomass=result.data.Biomass;
                  that.$store.state.model2_result_theoretical=result.data.Theoretical_yield;
                  that.$store.state.model2_result_formula=result.data.formula;
                  //前端存储模型2计算结果
                  sessionStorage.setItem('model2_tarlb', result.data.Tar_LR);
                  sessionStorage.setItem('model2_tarub', result.data.Tar_UR);
                  sessionStorage.setItem('model2_biomass', result.data.Biomass);
                  sessionStorage.setItem('model2_theoretical', result.data.Theoretical_yield);
                  sessionStorage.setItem('model2_formula', result.data.formula);
                  var temp_dic = {"model_name":that.$store.state.model_name,"substrate_reaction":that.model2_form.model2_substrate.value,
                    "target_reaction":that.model2_form.model2_target_met.value,"theoretical_rate":result.data.Theoretical_yield};
                  var temp_res = JSON.parse(sessionStorage.getItem('calculateResultData'));
                  temp_res.push(temp_dic);
                  sessionStorage.setItem('calculateResultData',JSON.stringify(temp_res));
                  that.calculateResultData = JSON.parse(sessionStorage.getItem('calculateResultData'));
              }
              else{
                  alert(result.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .models_div{
    width: 100%;
    margin-top: 20px;
    float: left;
  }
  .formstyle{
    width:40%;
    float: left;
    margin-left:4%;
    margin-right: 5%;
    box-shadow: 10px 10px 5px #888888;
    border-style:groove;
  }
  .item_style{
    width: 80%;
  }
  .submit_btn
  {
      position: relative;
      left: 45%;
  }
  .reset_btn
  {
      position: relative;
      left: 60%;
  }
  #main_calculation{
    float: right;
    width: 80%;
    height:100%;
    /*background-image: url(../assets/image/13change.jpg);*/
    /*background-repeat: no-repeat;*/
    /*background-position: center center;*/
    /*background-size: 60%;*/
  }
</style>
