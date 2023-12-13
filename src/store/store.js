/**
 * Created by 亮亮 on 2019/12/13.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import VueCookies from 'vue-cookies'
Vue.use(VueCookies)
Vue.use(Vuex)

export default new Vuex.Store(
  {
    // 组件中通过this$store.state.username调用
    state:{
      //里面放的相当于全局变量
      //用户信息部分
      username:VueCookies.get("username"),
      id:VueCookies.get("id"),
      rank:VueCookies.get("rank"),
      age:VueCookies.get("age"),
      email:VueCookies.get("email"),
      gender:VueCookies.get("gender"),
      phone:VueCookies.get("phone"),
      // 导航栏活动索引
      activeIndex:'',
      //用户文件夹存放索引（暂时未用到）
      USERS_DOCUMENTS_PATH:'../../../backend/source/users',
      // 菌种模型文件夹路径（暂时未用到）
      MODELS_PATH:'../../../backend/source/models',
      // 记录菌种编号
      model_name:'',
      // 实验信息记录，方便后续存储到数据库
      experiment_name:'',
      start_time:'',
      end_time:'',
      // 两个模型选定的参数记录
      model1_parameter_biomass:'请选择',
      model1_parameter_substrate:'请选择',
      model1_parameter_target_met:'请选择',
      model1_parameter_growth_rate:0,
      model2_parameter_biomass:'请选择',
      model2_parameter_substrate:'请选择',
      model2_parameter_target_met:'请选择',
      model2_parameter_growth_rate:0,
      // 两个模型的计算结果记录，防止用户点击别的功能后再点击途经计算分析参数均为空选定的参数在下边野生型那里做了记录
      model1_result_tarlb:'',
      model1_result_tarub:'',
      model1_result_biomass:'',
      model1_result_theoretical:'',
      model1_result_formula:'',
      model2_result_tarlb:'',
      model2_result_tarub:'',
      model2_result_biomass:'',
      model2_result_theoretical:'',
      model2_result_formula:'',
      // 野生型，辅因子，代谢物分析参数记录，需要之前两个模型的数据
      model1_biomass:'',
      model1_substrate:'',
      model1_target_met:'',
      model1_growth_rate:0,
      model_ll:0,// 这个参数不太懂是干什么的，暂时不去碰它，但是默认他是0
      model2_biomass:'',
      model2_substrate:'',
      model2_target_met:'',
      model2_growth_rate:0,
      // 模型一的培养环境
      model1_env:{domains:[{
                    nourish:'',//养料
                    constractions:'',//浓度
                    boundtype:''//l或b或u
            }],},
      // 模型二的培养环境
      model2_env:{domains:[{
                    nourish:'',//养料
                    constractions:'',//浓度
                    boundtype:''//l或b或u
            }],},
    },
    mutations:{
      // 组件中通过this.$store.commit(下面的函数名，参数)调用（最多传两个参数），所以可以打包成字典
      saveCookie:function(state,usermessage){
        state.username=usermessage.username;
        state.id=usermessage.id;
        state.rank=usermessage.rank;
        state.age=usermessage.age;
        state.email=usermessage.email;
        state.gender=usermessage.gender;
        state.phone=usermessage.phone;
        VueCookies.set("username",usermessage.username)
        VueCookies.set("id",usermessage.id)
        VueCookies.set("rank",usermessage.rank)
        VueCookies.set("age",usermessage.age)
        VueCookies.set("email",usermessage.email)
        VueCookies.set("gender",usermessage.gender)
        VueCookies.set("phone",usermessage.phone)
      },
      clearCookie:function (state) {
        state.username=null
        state.id=null
        state.rank=null
        state.age=null
        state.email=null
        state.gender=null
        state.phone=null
        VueCookies.remove('username')
        VueCookies.remove('id')
        VueCookies.remove('rank')
        VueCookies.remove('age')
        VueCookies.remove('email')
        VueCookies.remove('gender')
        VueCookies.remove('phone')
      }
    }
  }
)
