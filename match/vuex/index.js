import Vue from 'vue/dist/vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import p2pRaise from './p2pRaise.js'
import p2pVerify from './p2pVerify.js'
import p2pInvest from './p2pInvest.js'

const store = new Vuex.Store({
	modules: {
		p2pRaise,
		p2pVerify, 
		p2pInvest
	}
})

export default store 