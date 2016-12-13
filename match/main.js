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
import inputAvatarImage from '~/components/inputs/input-avatar-image.vue'
import datePicker from '~/components/date-picker.vue'
import inputFile from '~/components/inputs/input-file.vue'


Vue.component('time-remain', timeRemain)
Vue.component('modal', Modal)
Vue.component('input-select', inputSelect)
Vue.component('input-textarea', inputTextarea)
Vue.component('input-text', inputText)
Vue.component('input-image', inputImage)
Vue.component('input-avatar', inputAvatarImage)
Vue.component('date-picker', datePicker)
Vue.component('input-file', inputFile)

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