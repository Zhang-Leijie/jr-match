import {ObjectInfo} from '~/ajax/get.js'
import Vue from 'vue/dist/vue.js'

function normalize(arr, default_){
	if (!arr) {
		return []
	}
	return arr.map((item)=>{
		item.answer = default_ || ""
		return item
	})
}

const objQuestion = {
	state: {
		inited: false,
		judgments:[],
		multi_choices:[],
		short_answers:[],
		single_choices:[]
	},
	mutations: {
		getQuestion(state, {lists}) {
			state.inited = true
			state.judgments = normalize(lists.questioninfo.judgment.children),
			state.multi_choices = normalize(lists.questioninfo.multi_choice.children),
			state.single_choices = normalize(lists.questioninfo.single_choice.children),
			state.short_answers = normalize(lists.questioninfo.short_answer && 
				lists.questioninfo.short_answer.children)
			
		},
		changeAnswer(state, {value, type, index}) {
			if (type==="multi_choices") {
				var ans = state[type][index].answer.split("")
				var ret = {}
				ans.forEach((item) => {
					ret[item] = true
				})
				if (ret[value]) {
					delete ret[value]
				} else {
					ret[value] = true
				}
				value = Object.keys(ret).sort((charA, charB) => {
					return charA > charB ? 1: -1
				}).join("")
			}
			state[type][index].answer = value
		}
	},
	getters: {

	},
	actions: {
		getObjectiveQuestion({commit, state}){
			//debugger
			if (state.inited) {
				return 
			}
			return ObjectInfo({

			}).then((res) => {
				commit('getQuestion', {lists:res})
			})
		}
	}
}

export default objQuestion