<!--实验文件管理界面-->
<template>
  <div>
    <Vnavigation   style="width: 20%;height:100%;float: left;position: fixed;"></Vnavigation>
    <div id="main_documents">
        <vheader style="height: 150px;"></vheader>
          <!--实验信息显示-->
        <div id="function_show">
            <!--用户选择部分-->
            <div id="select">
                <el-form :model="select_form" ref="select_form"  class="demo-ruleForm" id="select_function">
                    <el-form-item label="反应id" label-width="100px" prop="reaction_id" class="select_item_style"  style="width: 20%">
                        <el-input type="text" v-model="select_form.reaction_id"></el-input>
                    </el-form-item>
                    <el-form-item label="反应名称" label-width="100px" prop="reaction_name" class="select_item_style"  style="width: 20%">
                        <el-input type="text" v-model="select_form.reaction_name"></el-input>
                    </el-form-item>
                    <el-form-item label="反应方程式" label-width="100px" prop="reaction_string" class="select_item_style"  style="width: 20%;margin-right: 10%">
                        <el-input type="text" v-model="select_form.reaction_string"></el-input>
                    </el-form-item>
                    <el-form-item  class="select_item_style" style="margin-right: 5%">
                        <el-button type="primary" @click="submitForm('select_form')">提交</el-button>
                        <el-button @click="resetForm('select_form')">重置</el-button>
                    </el-form-item>
                    <el-form-item  class="select_item_style"  v-if="show_to_admin">
                        <el-button type="primary" @click="createReaction()">创建反应</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <!--代谢物展示部分-->
            <el-table :data="tableData" style="width: 100%;margin-bottom: 30px;" :default-sort = "{prop: 'date', order: 'descending'}" border height="500">
                <el-table-column label="生化反应id" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.reaction_id}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="reaction_name" label="生化反应名称" sortable minWidth="10%">
                    <template slot-scope="scope">
                        <span>{{scope.row.reaction_name}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="reaction_string" label="反应方程式" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.reaction_string}}</span>
                    </template>
                </el-table-column>
              <el-table-column prop="database_link" label="反应方程式" sortable minWidth="20%">
                    <template slot-scope="scope">
                        <span>{{scope.row.database_link}}</span>
                    </template>
                </el-table-column>
              <el-table-column prop="pseudo_reaction" label="虚构反应" sortable minWidth="7%">
                    <template slot-scope="scope">
                        <span>{{scope.row.pseudo_reaction}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="source" label="来源" sortable minWidth="5%">
                    <template slot-scope="scope">
                        <span>{{scope.row.source}}</span>
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
    </div>
    <el-dialog title="新反应添加" :visible.sync="createdialogVisible" width="80%">
        <el-form ref="form" :model="form" label-width="20%">
          <el-form-item label="反应id">
            <el-input v-model="form.reaction_id"></el-input>
          </el-form-item>
          <el-form-item label="反应名称">
            <el-input v-model="form.reaction_name"></el-input>
          </el-form-item>
          <el-form-item label="反应方程式">
            <el-input v-model="form.reaction_string"></el-input>
          </el-form-item>
          <el-form-item label="虚构反应">
            <el-input v-model="form.pseudo_reaction"></el-input>
          </el-form-item>
          <el-form-item label="来源">
            <el-input v-model="form.source"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="createdialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addReaction()">确 定</el-button>
        </span>
      </el-dialog>


    <el-dialog title="反应修改" :visible.sync="updatedialogVisible" width="80%">
        <el-form ref="update_form" :model="update_form" label-width="20%">
          <el-form-item label="反应id">
            <el-input v-model="update_form.reaction_id"></el-input>
          </el-form-item>
          <el-form-item label="反应名称">
            <el-input v-model="update_form.reaction_name"></el-input>
          </el-form-item>
          <el-form-item label="反应方程式">
            <el-input v-model="update_form.reaction_string"></el-input>
          </el-form-item>
          <el-form-item label="虚构反应">
            <el-input v-model="update_form.pseudo_reaction"></el-input>
          </el-form-item>
          <el-form-item label="来源">
            <el-input v-model="update_form.source"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="updatedialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="updateMetabolite()">确 定</el-button>
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
  name: 'Vreaction',
  data() {
      return {
        show_to_admin : '',
//        筛选框
          select_form:{
              reaction_id:"",
              reaction_name:"",
              reaction_string:""
          },
        // 添加模块的表单数据
          form:{
            reaction_id:'',
            reaction_name:'',
            source:'',
            reaction_string:'',
            pseudo_reaction:''
          },
        update_form:{
            reaction_id:'',
            reaction_name:'',
            source:'',
            reaction_string:'',
            pseudo_reaction:''
          },
        temp_row:{
          metabolite:'',
            metabolite_name:'',
            source:'',
            formulae:'',
            charges:''
        },
//        接收后端数据
          tableData: [],
//        添加代谢物是否可见
          createdialogVisible:false,
          updatedialogVisible:false,
      }
    },
    components:{Vheader, ElButton, ElForm, Vnavigation},
    mounted(){
      this.$store.state.activeIndex='20';
      this.show_reaction_data();
      this.get_userRank();
    },
    methods: {
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
      show_reaction_data(){
          var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/get_reaction/',
              method:'POST',
              data:{
                  reaction_id:that.select_form.reaction_id,
                  reaction_name:that.select_form.reaction_name,
                  reaction_string:that.select_form.reaction_string
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
          console.log(this.select_form.metabolite)
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/get_reaction/',
              method:'POST',
              data:{
                  reaction_id:that.select_form.reaction_id,
                  reaction_name:that.select_form.reaction_name,
                  reaction_string:that.select_form.reaction_string
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.tableData=result.data.data;
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

      // 点击添加按钮对话框可见
      createReaction(){
        this.createdialogVisible=true
      },
      handleUpdate(index, row){
          this.updatedialogVisible=true;
          this.update_form.reaction_id = row["reaction_id"],
          this.update_form.reaction_name = row["reaction_name"],
          this.update_form.reaction_string = row["reaction_string"],
          this.update_form.pseudo_reaction = row["pseudo_reaction"],
          this.update_form.source = row["source"],
          this.temp_row.reaction_id = row["reaction_id"],
          this.temp_row.reaction_name = row["reaction_name"],
          this.temp_row.reaction_string = row["reaction_string"],
          this.temp_row.pseudo_reaction = row["pseudo_reaction"],
          this.temp_row.source = row["source"]
      },
      // 添加反应信息记录
      addReaction(){
          var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/add_reaction/',
              method:'POST',
              data:{

                  reaction_id:that.form.reaction_id,
                  reaction_name:that.form.reaction_name,
                  reaction_string: that.form.reaction_string,
                  pseudo_reaction:that.form.pseudo_reaction,
                  source:that.form.source
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.createdialogVisible=false;
                  that.show_reaction_data()
              }
              else{
                  alert(arg.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
      },

      updateMetabolite(){
          var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/update_reaction/',
              method:'POST',
              data:{
                  temp_row:that.temp_row,
                  reaction_id:that.update_form.reaction_id,
                  reaction_name:that.update_form.reaction_name,
                  reaction_string: that.update_form.reaction_string,
                  pseudo_reaction:that.update_form.pseudo_reaction,
                  source:that.update_form.source
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.updatedialogVisible=false;
                  that.show_reaction_data()
              }
              else{
                  alert(arg.data.error)
              }
          }).catch(function (result){
            alert("传参失败")
          })
      },
      handleDelete(index, row){
      var that=this;
          this.$axios.request(
            {
              url:'http://127.0.0.1:8000/delete_reaction/',
              method:'POST',
              data:{
                  reaction_id:row["reaction_id"],
                  reaction_name:row["reaction_name"],
                  reaction_string: row["reaction_string"],
                  pseudo_reaction:row["pseudo_reaction"],
                  source:row["source"]
              },
              headers:{
                  'Content-Type':'application/json'
              }
            }
          ).then(function(result){
              if(result.data.code===1000){
                  that.show_reaction_data();
              }
              else{
                  alert(arg.data.error)
              }
          }).catch(function (result){
            alert("删除失败")
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
    width: 100%;
    margin-top: 20px;
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
