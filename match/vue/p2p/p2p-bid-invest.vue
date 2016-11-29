<template>
	<div>
		<time-remain type="p2pBid" @time-set="getData"></time-remain>

		<div class="p2p-invest-page">
			<div class="invest-input">
				<label for="">投资金额：</label>
				<input type="text" class="input-text" v-model="money">
				<span>万元</span>
			</div>
			<div class="question" v-for="(list , indexOutter) in lists">
				<p>{{indexOutter+1}}.{{list.branch}}</p>
				<div class="options">
					<div class="option" v-for="(option, index) in list.options">
						<input type="radio" class="input-radio"
								:name="'ans'+ indexOutter " 
								:id="'ans'+ indexOutter  + index"
								:value="option.value"
								v-model="list.answer">
						<label :for="'ans'+ indexOutter  + index">&nbsp;&nbsp;{{option.value}}.{{option.name}}</label>
					</div>
				</div>
			</div>
			<div class="button-group">
				<!-- <router-link class="btn blue" :to="{name: 'm-p2pbid-detail',params:{id:$route.params.id}}">提交</router-link> -->
				<a class="btn blue" @click="poptest">
					提交
				</a>
			</div>
		</div>
		<modal v-if="showModal">
			<p slot="body" class='f8' style="text-align:center;margin-top:30px;">{{detail}}</p>
			<p slot="footer" style="text-align:center;">
				<a class="btn blue" @click="close">确认</a>
			</p>
		</modal>
		<modal v-if="endModal">
			<p slot="body" class='f8' style="text-align:center;margin-top:30px;">投资成功,答题已结束</p>
			<p slot="footer" style="text-align:center;">
				<router-link class="btn  blue" :to="{name:'m-index'}">确认</router-link>
			</p>
		</modal>
	</div>
</template>
<script>
	import Modal from '~/components/modal.vue'
	import {InvestQuestionList} from '~/ajax/get.js'
	import {Invest} from '~/ajax/post.js'
	import router from '~/router.js'
	

	export default{
		data(){
			return{
				pay:false,
				showModal:false,
				endModal:false,
				lists:[],
				total_answer:[],
				money:'',
				detail:''
			}
		},
		methods:{
			getData(){
				var self = this
				InvestQuestionList({
					id:self.$route.params.id,
				}).then((res) => {
					var a = res.map((item)=>{
						item.answer = ""
						var judgment = item
						item.options = ['a', 'b','c', 'd'].reduce((ret, item) => {
							if (judgment[item] != "") {
								ret.push({
									name: judgment[item],
									value: item.toUpperCase()
								})
							}
							return ret 
						}, [])
						return item
					})
					self.lists = a
				})
			},
			close(){
				var self = this
				if (!self.pay) {
					self.showModal = false
					self.total_answer = []
				}
				else{
					self.showModal = false
					self.total_answer = []
					router.push({name: 'm-p2pbid'})
				}
			},
			poptest(){
				var self = this
				var numf = self.lists.length
				for (var i = 0; i < numf; i++) {
					self.total_answer.push(self.lists[i].answer)
				}
				if (self.money=='') {
					self.showModal=true
					self.detail = "请输入投资金额"
				}
				else{
					Invest({
						id:self.$route.params.id,
						answer:self.total_answer,
						money:self.money*10000
					}).then((res)=>{
						if(res!=0){
							self.detail = "投资成功"
							self.pay = true
							self.showModal=true
						}
						else{
							self.endModal=true
						}
					}, (e) => {
						self.showModal=true
						self.detail = e.message
						console.dir(e)
					})
				}
			},
		},
		components: {
			'modal': Modal
		}
	}
</script>
<style lang="less">
	.p2p-invest-page {
		padding: 0 60px;
	}

	.invest-input {
		margin-top: 45px;
		margin-bottom: 45px;

		> label {
			font-size:16px;
			color:#419bf9;
		}
	}
	.button-group {
		text-align: center;
		margin-bottom: 40px;
	}
	.option{
		>*{
			vertical-align: middle;
		}	
	}
</style>