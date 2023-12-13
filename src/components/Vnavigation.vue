<!--导航栏模板-->
<template>
  <div style="height: 100%">
      <!--导航栏-->
      <div id="nav">
        <!--显示用户以及信息管理按钮-->
          <!--<el-form  label-width="100px">-->
            <!--&lt;!&ndash;此处使用v-bind插值对标签属性进行赋值&ndash;&gt;-->
              <!--<img src="../assets/image/13.jpg" style="height: 40px;width: 40px;float: left;position:relative;left: 1%"/>-->

              <!--<el-form-item :label="user_rank">-->
                  <!--<el-input v-model="username" :disabled="true" class="topheader"></el-input>-->
                  <!--<el-button type="warning" class="shownamebtn" @click="logout()">注销</el-button>-->
                  <!--<el-button type="primary" class="shownamebtn" @click="toPersonal_info()">个人信息管理</el-button>-->
                  <!--<el-button type="primary" class="shownamebtn" v-show="show_to_admin" @click="toMembers_info()">成员信息管理</el-button>-->
                  <!--<el-button type="primary" class="shownamebtn" v-show="show_to_admin" @click="toAdd_user()">增加用户</el-button>-->
              <!--</el-form-item>-->
          <!--</el-form>-->

        <!--显示实验功能导航栏(原来的背景颜色是#545c64)-->
            <el-menu :default-active="activeIndex"   mode="vertical"   background-color="#545c64"  text-color="#fff"  active-text-color="#ffd04b" style="height: 100%;padding: 0;width: 100%;">
              <!--<div style="height: 50px;float: left;">-->
                  <!--<img src="../assets/image/13.jpg" style="height: 40px;width: 40px;float: left;position:relative;left: 1%"/>-->
                  <!--<el-input :placeholder="user_rank"  :disabled="true" style="float: left;"></el-input>-->
              <!--</div>-->
              <div style="overflow-y: auto;height: 100%">
                <img src="../assets/image/9.png" style="margin-top: 10%;margin-left: 15%;">
                <div style="margin-top:2%;">
                  <el-form style="margin-left: 10%;" class="label">
                      <el-form-item >
                          <el-input v-model="username" :disabled="true" class="topheader" style="width: 80%"></el-input>
                      </el-form-item>
                  </el-form>
                </div>
                <el-menu-item index="1" @click="toMain()"><i class="el-icon-s-home"></i><span>首页</span></el-menu-item>
                <el-submenu index="2-all" >
                  <template slot="title"><i class="el-icon-menu"></i><span>代谢计算分析</span></template>
                  <el-menu-item index="2" @click="toNew_experiment()"><i class="el-icon-menu"></i><span>新建实验</span></el-menu-item>
                  <el-submenu index="2_1-all" >
                    <template slot="title"><i class="el-icon-menu"></i><span>通量平衡分析</span></template>
                    <el-menu-item index="3" @click="toCalculation()"><i class="el-icon-edit-outline"></i><span>途经计算分析</span></el-menu-item>
                    <el-menu-item index="4" @click="toCompare()"><i class="el-icon-data-analysis"></i><span>数据对比分析</span></el-menu-item>
                    <el-menu-item index="5" @click="toPathway()"><i class="el-icon-picture-outline"></i><span>生物通路模拟</span></el-menu-item>
                  </el-submenu>
                  <el-menu-item index="14" @click="toMinMaxCut()"><i class="el-icon-folder"></i><span>最大流最小割分析</span></el-menu-item>
                  <el-menu-item index="24" @click="toNewPathway()"><i class="el-icon-folder"></i><span>新路径预测</span></el-menu-item>
                  <el-menu-item index="6" @click="toDocuments()"><i class="el-icon-folder"></i><span>实验文件管理</span></el-menu-item>
                </el-submenu>
                <el-submenu index = "3-all">
                  <template slot="title"><i class="el-icon-menu"></i><span>代谢数据记录</span></template>
                  <el-menu-item index="11" @click="toModule()"><i class="el-icon-folder"></i><span>模块化信息</span></el-menu-item>
                  <el-menu-item index="19" @click="toMetabolite()"><i class="el-icon-folder"></i><span>代谢物信息</span></el-menu-item>
                  <el-menu-item index="20" @click="toReaction()"><i class="el-icon-folder"></i><span>代谢反应信息</span></el-menu-item>
                  <el-menu-item index="12" @click="toCalculationRecord()"><i class="el-icon-folder"></i><span>途径计算记录</span></el-menu-item>
                  <el-menu-item index="13" @click="toModuleConstruct()"><i class="el-icon-folder"></i><span>模块化模型构建</span></el-menu-item>
                  <el-menu-item index="23" @click="toRoomConstruct()"><i class="el-icon-folder"></i><span>区室化模型构建</span></el-menu-item>
                </el-submenu>
                <el-submenu index="4-all">
                  <template slot="title"><i class="el-icon-menu"></i><span>个人信息管理</span></template>
                  <el-menu-item index="7" @click="toPersonal_info()"><i class="el-icon-user"></i><span>个人信息管理</span></el-menu-item>
                  <el-menu-item index="8" @click="toAdd_user()" v-show="show_to_admin"><i class="el-icon-circle-plus"></i><span>增加用户</span></el-menu-item>
                  <el-menu-item index="9" @click="toMembers_info()" v-show="show_to_admin"><i class="el-icon-menu"></i><span>成员信息管理</span></el-menu-item>
                </el-submenu>
                <el-submenu index = "5-all">
                  <template slot="title"><i class="el-icon-menu"></i><span>功能分析</span></template>
                  <el-menu-item index="15" @click="toBestGrowthRate()"><i class="el-icon-folder"></i><span>生长比例与产量分析</span></el-menu-item>
                  <el-menu-item index="16" @click="toByProductInfluenceProduction()"><i class="el-icon-folder"></i><span>副产物对产物的影响</span></el-menu-item>
                  <el-menu-item index="17" @click="toHotPicture()"><i class="el-icon-folder"></i><span>两个反应对目标反应的影响</span></el-menu-item>
<!--                  <el-menu-item index="21" @click="toEssentialReaction()"><i class="el-icon-folder"></i><span>必要反应分析</span></el-menu-item>-->
<!--                  <el-menu-item index="22" @click="toShadowPrice()"><i class="el-icon-folder"></i><span>影子价格分析</span></el-menu-item>-->
<!--                  <el-menu-item index="18" @click="toPathwaySearch()"><i class="el-icon-folder"></i><span>反应路径搜寻</span></el-menu-item>-->
                </el-submenu>
                <el-submenu index="6-all">
                  <template slot="title"><i class="el-icon-menu"></i><span>热力学约束模型通量分析</span></template>
                  <el-menu-item index="25" @click="toThermodynamicConstraints()"><i class="el-icon-user"></i><span>途径计算分析</span></el-menu-item>
                </el-submenu>
                <el-menu-item index="10" @click="logout()"><i class="el-icon-switch-button"></i><span>注销</span></el-menu-item>
              </div>

            </el-menu>
      </div>

  </div>
</template>

<script>
  import ElForm from "../../node_modules/element-ui/packages/form/src/form";
  import ElFormItem from "../../node_modules/element-ui/packages/form/src/form-item";
export default {
  components: {ElFormItem, ElForm}, name: 'Vnavigation',
   data() {
      return {
          username:this.$store.state.username,
          user_rank:"",
          show_to_admin:"",
          activeIndex: this.$store.state.activeIndex,
      };
    },
//    挂载的时候执行的函数
    mounted(){
        this.get_userRank()
    },
    methods: {
//        判断用户身份
        get_userRank()
        {
            if(this.$store.state.rank==1) {
                this.user_rank = "管理员"
                this.show_to_admin = true
            }
            else if(this.$store.state.rank==0){
                this.user_rank="用户"
                this.show_to_admin=false
            }

        },
//      退出登录清除cookie并返回登录界面
        logout()
        {
            this.$store.state.activeIndex='10'
            this.$store.commit('clearCookie');
            this.$router.push('/login')
        },
//      跳转到个人信息管理界面
          toPersonal_info()
          {
              this.$store.state.activeIndex='7'
              this.$router.push('/personal_info')
          },
//      跳转到增加用户界面
        toAdd_user(){
            this.$store.state.activeIndex='8'
            this.$router.push('/add_user')
        },
//      跳转到成员管理界面
        toMembers_info(){
            this.$store.state.activeIndex='9'
            this.$router.push('/members_info')
        },
//      跳转到首页
        toMain()
        {
            this.$store.state.activeIndex='1';
            this.$router.push('/main')
        },
//      跳转到新建实验界面
        toNew_experiment(){
            this.$store.state.activeIndex='2';
            this.$router.push('/new_experiment')
        },
//      跳转到通量计算界面
        toCalculation(){
            this.$store.state.activeIndex='3';
            this.$router.push('/calculation')
        },
//      跳转到数据对比分析界面
        toCompare(){
            this.$store.state.activeIndex='4';
            this.$router.push('/compare')
        },
//      跳转到生物通路模拟界面
        toPathway(){
            this.$store.state.activeIndex='5';
            this.$router.push('/pathway')
        },
//      跳转到实验文件管理界面
        toDocuments(){
            this.$store.state.activeIndex='6';
            this.$router.push('/documents')
        },
//      跳转到模块化信息界面
        toModule(){
            this.$store.state.activeIndex='11';
            this.$router.push('/module')
        },
//      跳转到代谢计算信息记录界面
        toCalculationRecord(){
            this.$store.state.activeIndex='12';
            this.$router.push('/calculation_record')
        },
//      跳转到代谢计算信息记录界面
        toModuleConstruct(){
            this.$store.state.activeIndex='13';
            this.$router.push('/module_construct')
        }
        ,
//      跳转到最大流最小割分析界面
        toMinMaxCut(){
            this.$store.state.activeIndex='14';
            this.$router.push('/min_max_cut')
        },
//      跳转到产量和生长方程比例关系
        toBestGrowthRate(){
            this.$store.state.activeIndex='15';
            this.$router.push('/best_growth_rate')
        },
//      跳转到副产物和产量的关系
        toByProductInfluenceProduction(){
          this.$store.state.activeIndex='16';
          this.$router.push('/by_product_influence_production')
        },
//      跳转到热图分析
        toHotPicture(){
          this.$store.state.activeIndex='17';
          this.$router.push('/hot_picture')
        },
//      跳转到路径搜寻
        toPathwaySearch(){
          this.$store.state.activeIndex='18';
          this.$router.push('/pathway_search')
        },
//      跳转到代谢物信息
        toMetabolite(){
          this.$store.state.activeIndex='19';
          this.$router.push('/metabolite')
        }
        ,
//      跳转到代谢反应数据表信息
        toReaction(){
          this.$store.state.activeIndex='20';
          this.$router.push('/reaction')
        },
//      跳转到反应必要性分析
        toEssentialReaction(){
          this.$store.state.activeIndex='21';
          this.$router.push('/essential_reaction')
        },
//      跳转到影子价格分析
        toShadowPrice(){
          this.$store.state.activeIndex='22';
          this.$router.push('/shadow_price')
        },
//      跳转到区室化构建功能
        toRoomConstruct(){
          this.$store.state.activeIndex='23';
          this.$router.push('/room_construct')
        },
//      跳转到新路径预测
        toNewPathway(){
          this.$store.state.activeIndex='24';
          this.$router.push('/new_pathway')
        },
//      跳转到添加热力学约束
        toThermodynamicConstraints(){
          this.$store.state.activeIndex='25';
          this.$router.push('/add_thermodynamic_constraints')
        }
    }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #nav{
    /*margin-top: 20px;*/
    height: 100%;
    width: 100%;
  }
  .topheader{
    width:200px;
  }
  .shownamebtn{
    float:right;
    margin-right: 20px;
  }
  .label{
    color: white;
  }
  ::-webkit-scrollbar {
width: 5px;
height: 10px;
}
  /*滚动条样式*/
::-webkit-scrollbar-track-piece {
background-color: rgba(0, 0, 0, 0.2);
-webkit-border-radius: 6px;
}

::-webkit-scrollbar-thumb:vertical {
height: 5px;
background-color: rgba(125, 125, 125, 0.7);
-webkit-border-radius: 6px;
}

::-webkit-scrollbar-thumb:horizontal {
width: 5px;
background-color: rgba(125, 125, 125, 0.7);
-webkit-border-radius: 6px;
}
</style>
