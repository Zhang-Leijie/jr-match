import style from '~/style/main.less'

// import Vue from 'vue'
import Vue from 'vue/dist/vue.js'

import router from './router.js'
import store from './vuex'

import VueAlert from '~/plugins/alert.js'

Vue.use(VueAlert)

import { sync } from 'vuex-router-sync'
sync(store, router)

window.router = router
window.store = store


const app = new Vue({
	store,
  	router
}).$mount('#app')

window.app = app