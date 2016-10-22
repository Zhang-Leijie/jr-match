import Vue from 'vue/dist/vue.js'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'm-login',
    component(resolve) {
      resolve(require('./vue/login.vue'))
    }
  },
  {
    path: '/',
    name: 'm-index',
    component: require('./vue/index.vue')
  },
  {
    path: '/objective',
    name: 'm-obj',
    component(resolve) {
      resolve(require('./vue/objective.vue'))
    }
  },
  {
    path: '/objective/point',
    name: 'm-objpoint',
    component(resolve) {
      resolve(require('./vue/objectivepoint.vue'))
    }
  },
  {
    path: '/p2p-raise',
    name: 'm-p2praise',
    component(resolve) {
      resolve(require('./vue/p2p/p2p-raise.vue'))
    }
  },
  {
    path: '/p2p-raise/detail',
    name: 'm-p2praisedetail',
    component(resolve) {
      resolve(require('./vue/p2p/p2p-raisedetail.vue'))
    }
  },
  {
    path: '/p2p-raise/chart',
    name: 'm-p2praisechart',
    component(resolve) {
      resolve(require('./vue/p2p/p2p-raisechart.vue'))
    }
  },
  {
    path: '/p2p-invest',
    name: 'm-p2pinvest',
    component(resolve) {
      resolve(require('./vue/p2p/p2p-invest.vue'))
    }
  },
  {
    path: '/p2p-invest/chart',
    name: 'm-p2pinvestdetail',
    component(resolve) {
      resolve(require('./vue/p2p/p2p-investdetail.vue'))
    }
  },
  {
    path: '/p2p-bid',
    name: 'm-p2pbid',
    component(resolve) {
      resolve(require('./vue/p2p/p2p-bid.vue'))
    }
  },
  {
    path: '/p2p-bid/detail',
    name: 'm-p2pbid-detail',
    component(resolve) {
      resolve(require('./vue/p2p/p2p-bid-detail.vue'))
    }
  },
  {
    path: '/p2p-bid/invest',
    name: 'm-p2pbid-invest',
    component(resolve) {
      resolve(require('./vue/p2p/p2p-bid-invest.vue'))
    }
  },
  {
    path: '/cf-case',
    name: 'm-cfcase',
    component(resolve) {
      resolve(require('./vue/funding/case.vue'))
    }
  },
  {
    path: '/cf-charity',
    name: 'm-cfcharity',
    component(resolve) {
      resolve(require('./vue/funding/charity.vue'))
    }
  },
  {
    path: '/cf-item',
    name: 'm-cfitem',
    component(resolve) {
      resolve(require('./vue/funding/item.vue'))
    }
  },
  {
    path: '/cf-item/detail',
    name: 'm-cfitem-detail',
    component(resolve) {
      resolve(require('./vue/funding/crowdfunding-detail.vue'))
    }
  },
  {
    path: '/cf-item/raise',
    name: 'm-cfitem-raise',
    component(resolve) {
      resolve(require('./vue/funding/crowdfunding-raise.vue'))
    }
  }
]

export default new VueRouter({
  routes
})