import style from '~/style/main.less'

// import Vue from 'vue'
import Vue from 'vue/dist/vue.js'

import router from './router.js'
import store from './vuex'

import timeRemain from '~/components/time-remain.vue'
import Modal from '~/components/modal.vue'


import inputSelect from '~/components/inputs/input-select.vue'
import inputText from '~/components/inputs/input-text.vue'
import inputTextarea from '~/components/inputs/input-textarea.vue'
import inputImage from '~/components/inputs/input-image.vue'


Vue.component('time-remain', timeRemain)
Vue.component('modal', Modal)
Vue.component('input-select', inputSelect)
Vue.component('input-textarea', inputTextarea)
Vue.component('input-text', inputText)
Vue.component('input-image', inputImage)


import { sync } from 'vuex-router-sync'
sync(store, router)

window.router = router
window.store = store


const app = new Vue({
	store,
  	router
}).$mount('#app')

window.app = app

var ls = require('localStorage')

window.ls = ls