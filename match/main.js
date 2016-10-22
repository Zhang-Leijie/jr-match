import style from '~/style/main.less'

// import Vue from 'vue'
import Vue from 'vue/dist/vue.js'

import router from './router.js'

Vue.component('back-link', function(resolve) {
  resolve(require('./components/back-link.vue'))
})

Vue.component('btn-back', function(resolve) {
  resolve(require('./components/btn-back.vue'))
})

Vue.component('btn-go', function(resolve) {
  resolve(require('./components/btn-go.vue'))
})

window.router = router



const app = new Vue({
  router,
}).$mount('#app')