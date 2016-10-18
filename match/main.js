// import Vue from 'vue'
import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

Vue.component('back-link', function(resolve){
	resolve(require('./components/back-link.vue'))
})

Vue.component('btn-back', function(resolve){
	resolve(require('./components/btn-back.vue'))
})

Vue.component('btn-go', function(resolve){
	resolve(require('./components/btn-go.vue'))
})

const routes =[
	{path:'/',name:'m-login',component(resolve){resolve(require('./vue/login.vue'))}},
	{path:'/index',name:'m-index',component:require('./vue/index.vue')},
	{path:'/objective',name:'m-obj',component(resolve){resolve(require('./vue/objective.vue'))}},
	{path:'/p2p-raise',name:'m-p2praise',component(resolve){resolve(require('./vue/p2p/p2p-raise.vue'))}},
	{path:'/p2p-raise/detail',name:'m-p2praisedetail',component(resolve){resolve(require('./vue/p2p/p2p-raisedetail.vue'))}},
	{path:'/p2p-raise/chart',name:'m-p2praisechart',component(resolve){resolve(require('./vue/p2p/p2p-raisechart.vue'))}},
	{path:'/p2p-invest',name:'m-p2pinvest',component(resolve){resolve(require('./vue/p2p/p2p-invest.vue'))}},
	{path:'/p2p-invest/chart',name:'m-p2pinvestdetail',component(resolve){resolve(require('./vue/p2p/p2p-investdetail.vue'))}},
	{path:'/p2p-bid',name:'m-p2pbid',component(resolve){resolve(require('./vue/p2p/p2p-bid.vue'))}},
	{path:'/cf-case',name:'m-cfcase',component(resolve){resolve(require('./vue/funding/case.vue'))}},
	{path:'/cf-charity',name:'m-cfcharity',component(resolve){resolve(require('./vue/funding/charity.vue'))}},
	{path:'/cf-item',name:'m-cfitem',component(resolve){resolve(require('./vue/funding/item.vue'))}},
]

var router = new VueRouter({
	routes
})


const app = new Vue({
  router,
}).$mount('#app')