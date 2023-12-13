<!--实验文件管理界面-->
<template>
  <div>
    <Vnavigation   style="width: 20%;height:100%;float: left;position: fixed;"></Vnavigation>
    <div id="main_documents">
        <vheader style="height: 150px;"></vheader>
          <!--实验信息显示-->


        <div id="user_choose_module" style="width: 95%;margin: auto;margin-top: 10%;">
          <h3>用户选择基础模型</h3>
          <div style="margin-top: 20px;width: 100%;">
            <el-form :model="select_model" ref="select_model"  class="demo-ruleForm">
              <el-form-item  label="细菌模型" class="item_style labelsize" required="required" style="width: 20%;margin-right: 10%;float: left">
                  <el-select v-model="select_model.bacterial.value"  placeholder="请选择" style="float: left">
                      <el-option v-for="item in select_model.bacterial" :key="item.value" :label="item.value" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item  label="区室选择" class="item_style labelsize" required="required" style="width: 20%;float: left">
                  <el-select v-model="select_model.room.value"  placeholder="请选择" style="float: left"  @change="getModelRoomReaction()">
                      <el-option v-for="item in select_model.room" :key="item.value" :label="item.value" :value="item.value"></el-option>
                  </el-select>
              </el-form-item>
            </el-form>
          </div>


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
            <h3>构建区室化模型，需要在上边选择基础模型</h3>
            <div style="margin-top: 20px;width: 100%;">
              <el-form :model="operate_model" ref="operate_model"  class="demo-ruleForm">

                <el-form-item label="删除区室" label-width="100px" prop="delete_room" class="select_item_style"  style="width: 30%">
                  <el-select v-model="operate_model.delete_room" multiple placeholder="请选择">
                    <el-option
                      v-for="item in select_model.room"
                      :key="item.value"
                      :label="item.value"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="添加区室" label-width="100px" prop="add_room" class="select_item_style"  style="width: 20%">

                    <el-cascader v-model="operate_model.add_room"
                      :props="{ multiple: true }"
                    :options="cascade_all_room"
                    clearable></el-cascader>

                </el-form-item>

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

  </div>
</template>

<script>
import Vnavigation from './Vnavigation'
import ElForm from "../../node_modules/element-ui/packages/form/src/form";
import ElButton from "../../node_modules/element-ui/packages/button/src/button";
import Vheader from './Vheader'
export default {
  name: 'Vroom_construct',
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
//
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
            room:''
          },
// 接收选定模型和模块后的数据
        tableData2:[],
// 生成组合模型需要的参数
        operate_model:{
          delete_room:'',
          add_room:'',
          new_model_name:''
        },
        // 添加模块级联选择框
        cascade_all_room:[],
      }
    },
    components:{Vheader, ElButton, ElForm, Vnavigation},
    mounted(){
      this.$store.state.activeIndex='23';
      this.getModelsName();
      this.getModelsRoom();
      this.get_userRank();
      this.get_cascade_all_room();
    },
    methods: {
    get_cascade_all_room(){
      var that=this;
      this.$axios.request(
        {
          url:'http://127.0.0.1:8000/get_cascade_all_room/',
          method:'POST',
          data:{

          },
          headers:{
              'Content-Type':'application/json'
          }
        }
      ).then(function(result){
          if(result.data.code===1000){
              that.cascade_all_room=result.data.data;
              console.log(that.cascade_all_room)
          }
          else{
              alert("获取失败")
          }
      }).catch(function (result){
        alert("传参失败")
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
      // 获取所有区室
      getModelsRoom(){
            var that=this;
            this.$axios.request(
              {
                url:'http://127.0.0.1:8000/get_models_room/',
                method:'POST',
                data:{

                },
                headers:{
                    'Content-Type':'application/json'
                }
              }
            ).then(function(result){
                if(result.data.code===1000){
                    that.select_model.room=result.data.data;

                }
                else{
                    alert("获取失败")
                }
            }).catch(function (result){
              alert("传参失败")
            })
        },

      // 获取模型区室对应的反应名和方程式
      getModelRoomReaction(){
            var that=this;
            this.$axios.request(
              {
                url:'http://127.0.0.1:8000/get_model_room_reaction/',
                method:'POST',
                data:{
                    model:that.select_model.bacterial.value,
                    room:that.select_model.room.value
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
        console.log(that.operate_model.add_room);
        this.$axios.request(
            {
              url:'http://127.0.0.1:8000/operate_model_add_room/',
              method:'POST',
              data:{
                  delete_room: that.operate_model.delete_room,
                  add_room: that.operate_model.add_room,
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
