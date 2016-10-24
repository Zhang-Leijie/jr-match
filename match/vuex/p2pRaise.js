import {Lists, getP2PRaiseInfo} from '~/ajax/get.js'

const p2pRaise = {
	state: {
		lists: [],
		listInfos: {}
	},
	mutations: {
		getList(state, lists) {
			state.lists = lists
		},
		getListInfos(state, {listInfo, id}) {
			var newListInfo = {}
			newListInfo[id] = listInfo
			state.listInfos = Object.assign({}, state.listInfos, newListInfo)
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
		},
		getP2PRaiseInfo({commit}, {id}){
			return getP2PRaiseInfo(id).then((listInfo) => {
				commit('getListInfos', {
					listInfo, id
				})
			})
		}
	}
}

export default p2pRaise