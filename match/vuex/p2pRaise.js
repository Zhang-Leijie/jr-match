import Vue from 'vue'

import {getUniqueId} from '~/utils.js'

import router from '~/router.js'
import {genLsId} from '~/utils.js'
var ls = require('localStorage')

export const P2PRaisePlaceholder = (id) => {
	return {
		relation_id: id,
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
	}
}

export default p2pRaise