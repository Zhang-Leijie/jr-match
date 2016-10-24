import {Lists, getP2PRaiseInfo} from '~/ajax/get.js'
import Immutable from 'immutable'

const p2pRaise = {
	state: {
		lists: [],
		listInfos: Immutable.Map()
	},
	mutations: {
		getList(state, lists) {
			state.lists = lists
		},
		getListInfos(state, {listInfo, id}) {
			var listInfo = Immutable.Map(listInfo)
			listInfo = listInfo.set('params', {
				id: "",
				username: "",
				gender: "",
				job: "",
				age:"",
				tag_id: "",
				phone: "",
				block: "",
				name: "",
				request_id: "",
				money: "",
				rate: "",
				raise_time: "",
				loan_time: "",
				repay_type_id: "",
				detail: "",
				proof:	[
					{
						name: "",
						detail: ""
					}
				]
			})
			state.listInfos = state.listInfos.set(id, listInfo)
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
		getP2PRaiseInfo({commit, state}, {id}){
			if (state.listInfos.get(id)) {
				return
			}
			return getP2PRaiseInfo(id).then((listInfo) => {
				commit('getListInfos', {
					listInfo, id
				})
			})
		}
	}
}

export default p2pRaise