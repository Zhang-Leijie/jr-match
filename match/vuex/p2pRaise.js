import {Lists} from '~/ajax/get.js'

const p2pRaise = {
	state: {
		lists: []
	},
	mutations: {
		getList(state, lists){
			state.lists = lists
		}
	},
	getters: {
		
	},
	actions: {
		getP2PRaiseList({commit}){
			return Lists({
				type: 3
			}).then((res) => {
				commit('getList', res)
			})
		}
	}
}

export default p2pRaise