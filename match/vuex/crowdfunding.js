import {Lists, getP2PRaiseInfo} from '~/ajax/get.js'
import Vue from 'vue'

import {getUniqueId} from '~/utils.js'

export const CFRaisePlaceholder = (id) => {
	return {
		id: "",
		name: "",
		summary: "",
		money: "",
		found_time: "",
		province: "",
		city: "",
		period_id: "",
		profit_id: "",
		shares: "",
		lead: "",
		prospectus: "",
		proposal: "",
		index_photo: "",
		project_photo: "",
		mode_photo: "",
		analysis_photo: "",
		core_photo: "",
		detail: "",
		team_logo: "",
		team_name: "",
		team_summary: "",
		member: [
			{
				member_name: "",
				member_avartar: "",
				member_position: "",
				member_intro: "",
				id: getUniqueId()
			}
		],
		proof: [
			{
				name: "",
				detail: "",
				id: getUniqueId()
			}
		]
	}
}

const crowdfunding = {
	state: {
		params: [],
		lookup: {}
	},
	mutations: {
		changeCFStringProp(state, {id, item}) {
			var index = state.lookup[id]
			state.params[index][item.prop] = item.value
		},
		makeCFPlaceholder(state, {id}) {
			var index = state.lookup[id]
			if (state.params[index]) {
				return
			}
			var params = CFRaisePlaceholder(id)
			params.id = id
			state.params.push(params)
			Vue.set(state.lookup, id, state.params.length - 1)
		},
		addCFRaiseProof(state, {id}){
			var index = state.lookup[id]
			state.params[index].proof.push({
				name: "",
				detail: "",
				id: getUniqueId()
			})
		},
		removeCFRaiseProof(state, {id, index}){
			var index_ = state.lookup[id]
			state.params[index_].proof.splice(index, 1)
		},
		addCFRaiseMember(state, {id}){
			var index = state.lookup[id]
			state.params[index].member.push({
				name: "",
				detail: "",
				id: getUniqueId()
			})
		},
		removeCFRaiseMember(state, {id, index}){
			var index_ = state.lookup[id]
			state.params[index_].member.splice(index, 1)
		},
		changeCFRaiseMemberProp(state, {id, item, prop}){
			var index_ = state.lookup[id]
			state.params[index_].member[item.prop][prop] = item.value 
		},
		changeCFRaiseProofProp(state, {id, item, prop}){
			var index_ = state.lookup[id]
			state.params[index_].proof[item.prop][prop] = item.value 
		}
	},
	getters: {
		CFParams(state, getters, root){
			var id = root.route.query.id
			var index = state.lookup[id]
			return state.params[index]
		}
	},
	actions: {
	}
}

export default crowdfunding