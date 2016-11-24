<template>
	<div class="p2p-invest-page">
		<time-remain type="p2pInvest" @time-set="getData"></time-remain>

		<div class="form-page">
			<div>
				<div class="form-title">
					<h1>类型选择</h1>
				</div>
				<div class="form-input">
					<span class="name">法人姓名：</span>
					<span class="value">{{params.username}}</span>
				</div>
				<div class="form-input">
					<span class="name">性别：</span>
					<span class="value">{{params.gender}}</span>
				</div>
				<div class="form-input">
					<span class="name">职业：</span>
					<span class="value">{{params.job}}</span>
				</div>
				<div class="form-input">
					<span class="name">年龄：</span>
					<span class="value">{{params.age}}</span>
				</div>
				<div class="form-input">
					<span class="name">手机号码：</span>
					<span class="value">{{params.phone}}</span>
				</div>
				<div class="form-input">
					<span class="name">地区：</span>
					<span class="value">{{params.block}}</span>
				</div>
			</div>
		</div>
		<div class="form-page">
			<div>
				<div class="form-title">
					<h1>借款信息</h1>
				</div>
				<div class="form-input">
					<span class="name">项目名称：</span>
					<span class="value">{{params.name}}</span>
				</div>
				<div class="form-input">
					<span class="name">风险评级：</span>
					<span class="value">{{params.request}}</span>
				</div>
				<div class="form-input">
					<span class="name">还款方式：</span>
					<span class="value">{{params.repay_type}}</span>
				</div>
				<div class="form-input">
					<span class="name">利息偿付：</span>
					<span class="value">{{params.rate}}</span>
				</div>
				<div class="form-input">
					<span class="name">借款金额：</span>
					<span class="value">{{params.money}}</span>
				</div>
				<div class="form-input">
					<span class="name">大写：</span>
					<span class="value">{{params.money | transferMoney}}</span>
				</div>
				<div class="form-input">
					<span class="name">借款期限：</span>
					<span class="value">{{params.loan_time}}</span>
				</div>
				<div class="form-input">
					<span class="name">借款用途：</span>
					<span class="value">{{params.detail}}</span>
				</div>
			</div>
		</div>
		<div class="form-page">
			<div>
				<div class="form-title">
					<h1>借款计算器</h1>
				</div>
				<div class="form-table">
					<div class="clear" style="margin-bottom:20px;">
						<div class="form-input col-3">
							<span class="name">借款金额：</span>
							<span class="value">{{params.money}}</span>
						</div>
						<div class="form-input col-3">
							<span class="name">利息偿付：</span>
							<span class="value">{{params.rate}}</span>
						</div>
						<div class="form-input col-3">
							<span class="name">计息日：</span>
							<span class="value">项目发起成功时</span>
						</div>
						<div class="form-input col-3">
							<span class="name">借款期限：</span>
							<span class="value">{{params.loan_time}}</span>
						</div>
						<div class="form-input col-3">
							<span class="name">还款方式：</span>
							<span class="value">{{params.repay_type}}</span>
						</div>
					</div>
					<table class="table">
						<thead style="text-align:left;">
							<tr>
								<th>期数</th>
								<th>每期还款本息</th>
								<th>每期还款本金</th>
								<th>利息</th>
								<th>余额</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="term in terms">
								<td>{{term.qs}}</td>
								<td>{{term.emTotal}}</td>
								<td>{{term.em}}</td>
								<td>{{term.lx}}</td>
								<td>{{term.restTotal}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="form-page">
			<div>
				<div class="form-title">
					<h1>认证信息（可选）</h1>
				</div>
				<div v-for="proof_ in proof">
					<div class="form-input">
						<span class="name">认证名称：</span>
						<span class="value">{{proof_.proof_name}}</span>
					</div>
					<div class="form-input">
						<span class="name">&nbsp;</span>
						<div class="image-container">
							<img :src="proof_.proof_detail" alt="">
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="button-group">
			<router-link :to="{name: 'm-p2pinvest'}" class="btn white">返回</router-link>
			<a class="btn blue" @click="showModal=true">提交</a>
		</div>
		<!-- <modal v-show="showModal">
			<p slot="header" class='f8' style="text-align:center;margin-top:30px;">选择推荐等级</p>
			<div slot="body" style="text-align:center;">
				<star-rating></star-rating>	
			</div>

			<p slot="footer" style="text-align:center;">
				<a class="btn white" @click="showModal=false">返回</a>
				<a class="btn blue" @click="confirm" style="margin-left:30px;">确认</a>
			</p>
		</modal> -->
		<modal v-show="showModal" class="answerbox">
			<p slot="header" class='f8' style="text-align:center;margin-top:30px;">请叙述审标结果及叙述原因</p>
			<div slot="body" style="text-align:center;">
				<textarea v-model="textareaCont"></textarea>
			</div>
			<p slot="footer" style="text-align:center;">
				<a class="btn white" @click="showModal=false">返回</a>
				<a class="btn blue" @click="confirm" style="margin-left:30px;">确认</a>
			</p>
		</modal>
		<modal v-if="requesting">
			<p slot="header" class="f8" style="text-align:center;margin-top:30px;">正在提交</p>
			<p slot="body" class="f6" style="text-align:center;">
				请耐心等待
			</p>
			<p slot="footer"></p>			
		</modal>
	</div>
</template>
<script>
	import {getInvestDetail} from '~/ajax/get.js'
	import {postP2PInvest} from '~/ajax/post.js'

	import {transferMoney} from '~/utils.js'
	import store from '~/vuex'
	import router from '~/router.js'
	import Modal from '~/components/modal.vue'
	import starRating from '~/components/star-rating.vue'

	export default {
		data(){
			return {
				params: {
					username: "",
					gender: "",
					job: "",
					age: "",
					phone: "",
					block: "",
					name: "",
					repay_type: "",
					request: "",
					rate: "",
					money: "",
					loan_time: "",
					detail: "",
				},
				terms: [],
				proof: [],
				showModal: false,
				requesting: false,
				textareaCont:''
			}
		},
		methods: {
			confirm(){
				this.showModal = false
				this.requesting = true

				postP2PInvest({
					id: this.id,
					answer:this.textareaCont
				}).then((res) => {
					router.push({name: 'm-p2pinvest'})
				}).catch((e) => {
					alert('项目已提交')
					this.requesting = false
				})
			},
			getData(){
				var id = store.state.route.params.id 

				this.id = id 
				getInvestDetail({
					id: this.id
				}).then((res) => {
					//console.log(res)
					for (let prop in this.params) {
						var value = res.baseinfo[prop]
						if (value) {
							this.params[prop] = value
						}
					}
					this.terms = res.back.terms
					this.proof = res.proof
					this.textareaCont = res.baseinfo.answer
				})

			}
		},
		mounted(){
			
		},
		filters: {
			transferMoney(str){
				return transferMoney(str.replace(',', ""))
			}
		},
		components: {
			'modal': Modal,
			'star-rating': starRating
		}
	}
</script>
<style lang="less">
	.p2p-invest-page > .button-group {
		margin: 80px 0;
	}

	.p2p-invest-page > .button-group .btn + .btn {
		margin-left: 20px;
	}
	.answerbox{
		.modal-container{
			width: 800px;
			textarea{
				width: 100%;
				height: 300px;
				border:1px solid #ccc;
				outline: none;
				padding: 10px;
			}
		}
	}
</style>