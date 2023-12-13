<!--实验文件管理界面-->
<template>
  <div>
    <Vnavigation   style="width: 20%;height:100%;float: left;position: fixed;"></Vnavigation>
    <div id="main_documents">
        <vheader style="height: 150px;"></vheader>
          <!--实验信息显示-->

        <div id="function_show">
          <h3>已有模块查看</h3>
            <!--用户选择部分-->
            <div id="select">
                <el-form :model="select_form" ref="select_form"  class="demo-ruleForm" id="select_function">
                    <el-form-item label="模块分类" label-width="100px" prop="name" class="select_item_style"  style="width: 20%">
                        <el-input type="text" v-model="select_form.subsystem_class"></el-input>
                    </el-form-item>
                    <el-form-item label="模块名称" label-width="100px" prop="name" class="select_item_style"  style="width: 20%">
                        <el-input type="text" v-model="select_form.model_subsystem_name"></el-input>
                    </el-form-item>
                    <el-form-item label="菌株" label-width="100px" prop="name" class="select_item_style"  style="width: 20%;margin-right: 10%">
                        <el-input type="text" v-model="select_form.bacterial"></el-input>
                    </el-form-item>
                    <el-form-item  class="select_item_style" style="margin-right: 5%">
                        <el-button type="primary" @click="submitForm('select_form')">提交</el-button>
                        <el-button @click="resetForm('select_form')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!--所做实验表格部分-->
            <el-table :data="tableData" style="width: 100%;margin-bottom: 30px;" :default-sort = "{prop: 'date', order: 'descending'}" border height="250">
                <el-table-column label="反应名" sortable minWidth="6%">
                    <template slot-scope="scope">
                        <span>{{scope.row.reaction_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="reaction_formula" label="反应方程式" sortable minWidth="10%">
                    <template slot-scope="scope">
                        <span>{{scope.row.reaction_formula}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="bacterial" label="菌株" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.bacterial}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="model_subsystem_name" label="模块名称" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.model_subsystem_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="subsystem_class" label="模块分类" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.subsystem_class}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="model" label="归属模型" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.model}}</span>
                    </template>
                </el-table-column>
              <el-table-column prop="lower_bound" label="通量下限" sortable minWidth="5%">
                    <template slot-scope="scope">
                        <span>{{scope.row.lower_bound}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="up_bound" label="通量上限" sortable minWidth="5%">
                    <template slot-scope="scope">
                        <span>{{scope.row.up_bound}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" class="column_style" minWidth="10%" v-if="show_to_admin">
                    <template slot-scope="scope">
                        <el-button v-show="show_to_admin" size="mini" type="primary" @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
                        <el-button v-show="show_to_admin" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <div id="user_choose_module" style="width: 95%;margin: auto;margin-top: 10%;">
          <h3>用户选择基础模型</h3>
          <div style="margin-top: 20px;width: 100%;">
            <el-form :model="select_model" ref="select_model"  class="demo-ruleForm">
              <el-form-item  label="细菌模型" class="item_style labelsize" required="required" style="width: 20%;margin-right: 10%;float: left">
                  <el-select v-model="select_model.bacterial.value"  placeholder="请选择" style="float: left" @change="getModelModules()">
                      <el-option v-for="item in select_model.bacterial" :key="item.value" :label="item.value" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item  label="模块选择" class="item_style labelsize" required="required" style="width: 20%;float: left">
                  <el-select v-model="select_model.module.value"  placeholder="请选择" style="float: left"  @change="getModelModulesReaction()">
                      <el-option v-for="item in select_model.module" :key="item.value" :label="item.value" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
            </el-form>
          </div>
          <!--所做实验表格部分-->
            <el-table :data="tableData2" style="width: 100%;margin-bottom: 30px;" :default-sort = "{prop: 'date', order: 'descending'}" border height="250">
                <el-table-column label="反应名" sortable minWidth="6%">
                    <template slot-scope="scope">
                        <span>{{scope.row.reaction_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="reaction_formula" label="反应方程式" sortable minWidth="10%">
                    <template slot-scope="scope">
                        <span>{{scope.row.reaction_formula}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <h3>构建定制化模块，在上边选择基础模型</h3>
            <div style="margin-top: 20px;width: 100%;">
              <el-form :model="operate_model" ref="operate_model"  class="demo-ruleForm">
<!--                <el-form-item label="删除模块名称" label-width="100px" prop="delete_module" class="select_item_style"  style="width: 20%">-->
<!--                    <el-input type="text" v-model="operate_model.delete_module"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="删除模块" label-width="100px" prop="delete_module" class="select_item_style"  style="width: 30%">
                  <el-select v-model="operate_model.delete_module" multiple placeholder="请选择">
                    <el-option
                      v-for="item in select_model.module"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
<!--                <el-form-item label="增加模块名称" label-width="100px" prop="add_module" class="select_item_style"  style="width: 20%">-->
<!--                    <el-input type="text" v-model="operate_model.add_module"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="添加模块" label-width="100px" prop="add_module" class="select_item_style"  style="width: 20%">
<!--                  <el-select v-model="operate_model.add_module" multiple placeholder="请选择">-->
                    <el-cascader v-model="operate_model.add_module"
                      :props="{ multiple: true }"
                    :options="cascade_all_module"
                    clearable></el-cascader>
<!--                  </el-select>-->
                </el-form-item>
<!--                <el-form-item label="增加模块归属模型" label-width="150px" prop="belong_model" class="select_item_style"  style="width: 25%">-->
<!--                    <el-input type="text" v-model="operate_model.belong_model"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="新模型命名" label-width="100px" prop="new_model_name" class="select_item_style"  style="width: 20%">
                    <el-input type="text" v-model="operate_model.new_model_name"></el-input>
                </el-form-item>
                <el-form-item  class="select_item_style" style="margin-left: 5%">
                    <el-button type="primary" @click="operateModel()">提交</el-button>
                </el-form-item>
              </el-form>
            </div>
        </div>
    </div>
  <!--点击修改时候跳出一个对话框完成修改操作以下内容同-->
    <el-dialog title="修改模块化" :visible.sync="dialogFormVisible">
            <el-form ref="form_change" :model="form_change" label-width="20%">
                <h3>基础信息记录</h3>
                <el-form-item label="菌株">
                  <el-input v-model="form_change.bacterial"></el-input>
                </el-form-item>
                <el-form-item label="模块名称">
                  <el-input v-model="form_change.model_subsystem_name"></el-input>
                </el-form-item>
                <el-form-item label="归属模型">
                  <el-input v-model="form_change.model"></el-input>
                </el-form-item>
                <el-form-item label="反应名">
                  <el-input v-model="form_change.reaction_name"></el-input>
                </el-form-item>
                <el-form-item label="反应方程式">
                  <el-input v-model="form_change.reaction_formula"></el-input>
                </el-form-item>
                <el-form-item label="通量下限">
                  <el-input v-model="form_change.lower_bound"></el-input>
                </el-form-item>
                <el-form-item label="通量上限">
                  <el-input v-model="form_change.up_bound"></el-input>
                </el-form-item>
                <h3>模块归属记录</h3>
                <el-form-item label="模块归属">
                  <el-select v-model="form_change.subsystem_class" placeholder="请选择模块归属">
                    <el-option label="自定义" value="自定义"></el-option>
                    <el-option label="文献报道" value="文献报道"></el-option>
                    <el-option label="原始模型" value="原始模型"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisible = false">取 消</el-button>
                  <el-button type="primary" @click="submitUpdate()">确 定</el-button>
                </span>
    </el-dialog>

  </div>
</template>

<script>
import Vnavigation from './Vnavigation'
import ElForm from "../../node_modules/element-ui/packages/form/src/form";
import ElButton from "../../node_modules/element-ui/packages/button/src/button";
import Vheader from './Vheader'
export default {
  name: 'Vmodule_construct',
  data() {
      return {
        show_to_admin : '',
        dialogFormVisible:false,
        temp_row:{
          bacterial:'',
          model_subsystem_name:'',
          reaction_name:'',
          reaction_formula:'',
          lower_bound:'',
          up_bound:'',
          subsystem_class:'',
          model:''
        },
// 修改模块的表单数据
        form_change:{
          bacterial:'',
          model_subsystem_name:'',
          reaction_name:'',
          reaction_formula:'',
          lower_bound:'',
          up_bound:'',
          subsystem_class:'',
          model:''
        },
//        筛选框
          select_form:{
              subsystem_class:"",
              bacterial:"",
              model_subsystem_name:""
          },
        // 添加模块的表单数据
          form:{
            bacterial:'',
            model_subsystem_name:'',
            reaction_name:'',
            reaction_formula:'',
            subsystem_class:''
          },
//        接收后端数据
          tableData: [],
          // 用户选择基础的模型
          select_model:{
            bacterial:'',
            module:''
          },
// 接收选定模型和模块后的数据
        tableData2:[],
// 生成组合模型需要的参数
        operate_model:{
          delete_module:'',
          add_module:'',
          new_model_name:''
        },
        // 添加模块级联选择框
        cascade_all_module:[],
      }
    },
    components:{Vheader, ElButton, ElForm, Vnavigation},
    mounted(){
      this.$store.state.activeIndex='11';
      this.show_model_data();
      this.getModelsName();
      this.get_userRank();
      this.get_cascade_all_module();
    },
    methods: {
    get_cascade_all_module(){
      var that=this;
      this.$axios.request(
        {
          url:'http://127.0.0.1:8000/get_cascade_all_module/',
          method:'POST',
          data:{

          },
          headers:{
              'Content-Type':'application/json'
          }
        }
      ).then(function(result){
          if(result.data.code===1000){
              that.cascade_all_module=result.data.data;
              console.log(that.cascade_all_module)
          }
          else{
              alert("获取失败")
          }
      }).catch(function (result){
        alert("传参失败")
      })
    },
    handleUpdate(index, row){
      this.dialogFormVisible = true;
      this.temp_row.bacterial = row['bacterial'];
      this.temp_row.model_subsystem_name = row['model_subsystem_name'];
      this.temp_row.reaction_name = row['reaction_name'];
      this.temp_row.reaction_formula = row['reaction_formula'];
      this.temp_row.lower_bound = row['lower_bound'];
      this.temp_row.up_bound = row['up_bound'];
      this.temp_row.subsystem_class = row['subsystem_class'];
      this.temp_row.model = row['model'];
      this.form_change.bacterial = row['bacterial'];
      this.form_change.model_subsystem_name = row['model_subsystem_name'];
      this.form_change.reaction_name = row['reaction_name'];
      this.form_change.reaction_formula = row['reaction_formula'];
      this.form_change.lower_bound = row['lower_bound'];
      this.form_change.up_bound = row['up_bound'];
      this.form_change.subsystem_class = row['subsystem_class'];
      this.form_change.model = row['model'];
    },
      submitUpdate(){
      this.dialogFormVisible = true;
      var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/update_model_subsystem_data/',
              method:'POST',
              data:{
                  temp_row:that.temp_row,
                  model: that.form_change.model,
                  bacterial : that.form_change.bacterial,
                  model_subsystem_name : that.form_change.model_subsystem_name,
                  reaction_name : that.form_change.reaction_name,
                  reaction_formula : that.form_change.reaction_formula,
                  lower_bound : that.form_change.lower_bound,
                  up_bound : that.form_change.up_bound,
                  subsystem_class : that.form_change.subsystem_class,
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.show_model_data();
                  that.dialogFormVisible = false;
              }
              else{
                  alert(arg.data.error)
              }
          }).catch(function (result){
            alert("修改失败")
          })
      },
      handleDelete(index, row){
      var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/delete_model_subsystem_data/',
              method:'POST',
              data:{
                  model: row["model"],
                  bacterial : row['bacterial'],
                  model_subsystem_name : row['model_subsystem_name'],
                  reaction_name : row['reaction_name'],
                  reaction_formula : row['reaction_formula'],
                  lower_bound : row['lower_bound'],
                  up_bound : row['up_bound'],
                  subsystem_class : row['subsystem_class'],
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.show_model_data();
              }
              else{
                  alert(arg.data.error)
              }
          }).catch(function (result){
            alert("删除失败")
          })
    },
    //        判断用户身份
        get_userRank()
        {
            if(this.$store.state.rank==1) {
                this.show_to_admin = true
            }
            else if(this.$store.state.rank==0){
                this.show_to_admin=false
            }
        },
      show_model_data(){
          var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/get_model_subsystem_data/',
              method:'POST',
              data:{
                  subsystem_class:that.select_form.subsystem_class,
                  bacterial:that.select_form.bacterial,
                  model_subsystem_name:that.select_form.model_subsystem_name,
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.tableData=result.data.data
              }
              else{
                  alert(arg.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
      },
      submitForm(formName){
          var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/get_model_subsystem_data/',
              method:'POST',
              data:{
                  subsystem_class:that.select_form.subsystem_class,
                  bacterial:that.select_form.bacterial,
                  model_subsystem_name:that.select_form.model_subsystem_name
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.tableData=result.data.data;
                  console.log(that.tableData);
                  console.log(that.select_form.subsystem_class);
                  console.log(that.select_form.bacterial);
                  console.log(that.select_form.model_subsystem_name);
              }
              else{
                  alert(arg.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
      },
//      使用resetFields方法必须使用prop属性
      resetForm(formName){
            this.$refs[formName].resetFields();
      },
  // 获取模型名称
      getModelsName(){
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
                    that.select_model.bacterial=result.data.data;
                }
                else{
                    alert("获取失败")
                }
            }).catch(function (result){
              alert("传参失败")
            })
        },
// 获取模型中拥有的模块
      getModelModules(){
            var that=this;
            this.$axios.request(
              {
                url:'http://127.0.0.1:8000/get_model_modules/',
                method:'POST',
                data:{
                    model:that.select_model.bacterial.value
                },
                headers:{
                    'Content-Type':'application/json'
                }
              }
            ).then(function(result){
                if(result.data.code===1000){
                    that.select_model.module=result.data.data;
                    console.log(that.select_model.module);
                }
                else{
                    alert("获取失败")
                }
            }).catch(function (result){
              alert("传参失败")
            })
        },
      // 获取模型模块对应的反应名和方程式
      getModelModulesReaction(){
            var that=this;
            this.$axios.request(
              {
                url:'http://127.0.0.1:8000/get_model_modules_reaction/',
                method:'POST',
                data:{
                    model:that.select_model.bacterial.value,
                    module:that.select_model.module.value
                },
                headers:{
                    'Content-Type':'application/json'
                }
              }
            ).then(function(result){
                if(result.data.code===1000){
                    that.tableData2=result.data.data;
                }
                else{
                    alert("获取失败")
                }
            }).catch(function (result){
              alert("传参失败")
            })
        },
// 提交需要的操作生成新模型
      operateModel(){
          var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/operate_model/',
              method:'POST',
              data:{
                  delete_module: that.operate_model.delete_module,
                  add_module: that.operate_model.add_module,
                  new_model_name: that.operate_model.new_model_name,
                  model: that.select_model.bacterial.value,
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  alert("模型生成成功")
              }
              else{
                  alert("模型生成失败")
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
