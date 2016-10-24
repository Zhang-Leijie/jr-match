import {Lists, getP2PRaiseInfo} from '~/ajax/get.js'
import Vue from 'vue'

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
			listInfo['params'] = {
				id: id,
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
			}
			Vue.set(state.listInfos, id, listInfo)
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
			if (state.listInfos[id]) {
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