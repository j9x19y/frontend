// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入公共变量存储区
import store from './store/store'
import VueCookies from 'vue-cookies'
import * as echarts from 'echarts';
import 'echarts-gl'
// 在vue全局变量中声明$axios=axios
Vue.prototype.$axios=axios
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueCookies)
// 全局引入echarts
// 引入树状图插件
import VueTree from "@ssthouse/vue-tree-chart";
Vue.component("vue-tree", VueTree);

Vue.prototype.$echarts = echarts
Vue.use(echarts)
new Vue({
  el: '#app',
  router,
  // 这里也要写上store
  store,
  components: { App },
  template: '<App/>'
})
// 拦截器
router.beforeEach(function(to,from,next){
  if(to.meta.requireAuth){
    // 要去的url只有登录成功才能访问
    if(store.state.id){
      next()
    }
    else{
      next({path:'/login'})
    }
  }
  else{
    next()
  }
})
