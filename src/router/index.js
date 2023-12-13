import Vue from 'vue'
import Router from 'vue-router'
import VlLogin from '@/components/Vlogin'
import Vmain from '@/components/Vmain'
import Vpersonal_info from '@/components/Vpersonal_info'
import Vadd_user from '@/components/Vadd_user'
import Vmembers_info from '@/components/Vmembers_info'
import Vnew_experiment from '@/components/Vnew_experiment'
import Vcalculation from '@/components/Vcalculation'
import Vcompare from '@/components/Vcompare'
import Vpathway from '@/components/Vpathway'
import Vdocuments from '@/components/Vdocuments'
import Vmodule from '@/components/Vmodule'
import Vcalculaton_record from "../components/Vcalculaton_record";
import Vmodule_construct from "../components/Vmodule_construct";
import Vmin_max_cut from "../components/Vmin_max_cut";
import Vbest_growth_rate from "../components/Vbest_growth_rate";
import Vby_product_influence_production from "../components/Vby_product_influence_production";
import Vhot_picture from "../components/Vhot_picture";
import Vpathway_search from "../components/Vpathway_search";
import Vmetabolite from "../components/Vmetabolite";
import Vreaction from "../components/Vreaction";
import Vshadow_price from "../components/Vshadow_price";
import Vessential_reaction from "../components/Vessential_reaction";
import Vroom_construct from "../components/Vroom_construct";
import Vnew_pathway from "../components/Vnew_pathway";
import Vadd_thermodynamic_constraints from "../components/Vadd_thermodynamic_constraints";
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
        path:'/login',
        name:':login',
        component:VlLogin,
        meta:{
          title:'生物代谢流系统',
        }
    },
    {
      path:'/main',
      name:'main',
      component:Vmain,
      meta:{
        requireAuth:true,
        title:'生物代谢流系统',
      }
    },
    {
      path:'/personal_info',
      name:'personal_info',
      component:Vpersonal_info,
      meta:{
        requireAuth:true,
        title:'生物代谢流系统',
      }
    },
    {
      path:'/add_user',
      name:'add_user',
      component:Vadd_user,
      meta:{
        requireAuth:true,
        title:'生物代谢流系统',
      }
    },
    {
      path:'/members_info',
      name:'members_info',
      component:Vmembers_info,
      meta:{
        requireAuth:true,
        title:'生物代谢流系统',
      }
    },
    {
      path:'/new_experiment',
      name:'new_experiment',
      component:Vnew_experiment,
      meta:{
        requireAuth:true,
        title:'生物代谢流系统',
      }
    },
    {
      path:'/calculation',
      name:'calculation',
      component:Vcalculation,
      meta:{
        requireAuth:true,
        title:'生物代谢流系统',
      }
    },
    {
      path:'/compare',
      name:'compare',
      component:Vcompare,
      meta:{
        requireAuth:true,
        title:'生物代谢流系统',
      }
    },
    {
      path:'/pathway',
      name:'pathway',
      component:Vpathway,
      meta:{
        requireAuth:true,
        title:'生物代谢流系统',
      }
    },
    {
      path:'/documents',
      name:'documents',
      component:Vdocuments,
      meta:{
        requireAuth:true,
        title:'生物代谢流系统',
      }
    },
    {
      path: '/module',
      name: 'module',
      component: Vmodule,
      meta: {
        requireAuth: true,
        title: '生物代谢流系统',
      }
    },
    {
      path: '/calculation_record',
      name: 'calculation_record',
      component: Vcalculaton_record,
      meta: {
        requireAuth: true,
        title: '生物代谢流系统',
      }
    },
    {
      path: '/module_construct',
      name: 'module_construct',
      component: Vmodule_construct,
      meta: {
        requireAuth: true,
        title: '生物代谢流系统',
      }
    },
    {
      path: '/min_max_cut',
      name: 'min_max_cut',
      component: Vmin_max_cut,
      meta: {
        requireAuth: true,
        title: '生物代谢流系统',
      }
    },
    {
      path: '/best_growth_rate',
      name: 'best_growth_rate',
      component: Vbest_growth_rate,
      meta: {
        requireAuth: true,
        title: '生物代谢流系统',
      }
    },
    {
      path: '/by_product_influence_production',
      name: 'by_production_influence_production',
      component: Vby_product_influence_production,
      meta: {
        requireAuth: true,
        title: '生物代谢流系统',
      }
    },
    {
      path: '/hot_picture',
      name: 'hot_picture',
      component: Vhot_picture,
      meta: {
        requireAuth: true,
        title: '生物代谢流系统',
      }
    },
    {
      path: '/pathway_search',
      name: 'pathway_search',
      component: Vpathway_search,
      meta: {
        requireAuth: true,
        title: '生物代谢流系统',
      }
    },
    {
      path: '/metabolite',
      name: 'metabolite',
      component: Vmetabolite,
      meta: {
        requireAuth: true,
        title: '生物代谢流系统',
      }
    }
    ,
    {
      path: '/reaction',
      name: 'reaction',
      component: Vreaction,
      meta: {
        requireAuth: true,
        title: '生物代谢流系统',
      }
    },
    {
      path: '/shadow_price',
      name: 'shadow_price',
      component: Vshadow_price,
      meta: {
        requireAuth: true,
        title: '生物代谢流系统',
      }
    },
    {
      path: '/essential_reaction',
      name: 'essential_reaction',
      component: Vessential_reaction,
      meta: {
        requireAuth: true,
        title: '生物代谢流系统',
      }
    }
    ,
    {
      path: '/room_construct',
      name: 'room_construct',
      component: Vroom_construct,
      meta: {
        requireAuth: true,
        title: '生物代谢流系统',
      }
    }
    ,
    {
      path: '/new_pathway',
      name: 'new_pathway',
      component: Vnew_pathway,
      meta: {
        requireAuth: true,
        title: '生物代谢流系统',
      }
    }
    ,
    {
      path: '/add_thermodynamic_constraints',
      name: 'add_thermodynamic_constraints',
      component: Vadd_thermodynamic_constraints,
      meta: {
        requireAuth: true,
        title: '生物代谢流系统',
      }
    }
  ]
})
