import {Lists, getP2PRaiseInfo} from '~/ajax/get.js'
import Vue from 'vue'

import {getUniqueId} from '~/utils.js'

export const P2PRaisePlaceholder = (id) => {
	return {
		id: id,
		username: "",
		gender: "",
		job: "",
		age:"",
		tag_id: "",
		phone: "",
		city: "",
		province: "",
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
				detail: "",
				id: getUniqueId()
			}
		]
	}
}

const p2pRaise = {
	state: {
		lists: [],
		listInfos: {},
		params: [],
		lookup: {}
	},
	mutations: {
		addP2PRaiseProof(state, {id}){
			var index = state.lookup[id]
			state.params[index].proof.push({
				name: "",
				detail: "",
				id: getUniqueId()
			})
		},
		removeP2PRaiseProof(state, {id, index}){
			var index_ = state.lookup[id]
			state.params[index_].proof.splice(index, 1)
		},
		getList(state, lists) {
			state.lists = lists
		},
		getListInfos(state, {listInfo, id}) {
			Vue.set(state.listInfos, id, listInfo)
		},
		makeParamsPlaceholder(state, {id}) {
			var index = state.lookup[id]
			if (state.params[index]) {
				return
			}
			var params = P2PRaisePlaceholder(id)
			state.params.push(params)
			Vue.set(state.lookup, id, state.params.length - 1)
		},
		changeStringProp(state, {id, item}) {
			var index = state.lookup[id]
			state.params[index][item.prop] = item.value
		},
		changeProofName(state, {id, item}) {
			var index = state.lookup[id]
			var proof_index = item.prop 
			var proof_name = item.value
			state.params[index].proof[proof_index].name = proof_name	
		},
		changeProofDetail(state, {id, item}) {
			var index = state.lookup[id]
			var proof_index = item.prop 
			var proof_name = item.value
			state.params[index].proof[proof_index].detail = proof_name	
		}
	},
	getters: {
		p2pParam(state, getters, root){
			var id = root.route.query.id
			var index = state.lookup[id]
			return state.params[index]
		}
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

			// 异步ajax获取
			return getP2PRaiseInfo(id).then((listInfo) => {
				commit('getListInfos', {
					listInfo, id
				})
			})
		}
	}
}

export default p2pRaise