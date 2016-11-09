<template>
	<div>
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">P2P</li>
				<li class="item">发标操作</li>
			</ol>
		</div>
		<div class="form-page">
			<div>
				<div class="form-title">
					<h1>类型选择</h1>
				</div>
				<div class="form-input">
					<span class="name">类型：</span>
					<span class="input">{{params.tag}}</span>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>基本信息</h1>
				</div>
				<div class="form-input">
					<span class="name">姓名：</span>
					<span class="input">{{params.username}}</span>
				</div>
				<div class="form-input">
					<span class="name">姓别：</span>
					<span class="input">{{params.gender}}</span>
				</div>
				<div class="form-input">
					<span class="name">年龄：</span>
					<span class="input">{{params.age}}</span>
				</div>
				<div class="form-input">
					<span class="name">职业：</span>
					<span class="input">{{params.job}}</span>
				</div>
				<div class="form-input">
					<span class="name">手机号码：</span>
					<span class="input">{{params.phone}}</span>
				</div>
				<div class="form-input">
					<span class="name">地区：</span>
					<span class="input">{{params.block}}</span>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>借款信息</h1>
				</div>
				<div class="form-input">
					<span class="name">项目名称：</span>
					<span class="input">{{params.name}}</span>
				</div>
				<div class="form-input">
					<span class="name">风险要求：</span>
					<span class="input">{{params.request}}</span>
				</div>
				<div class="form-input">
					<span class="name">还款方式：</span>
					<span class="input">{{params.repay_type}}</span>
				</div>
				<div class="form-input">
					<span class="name">利息偿付：</span>
					<span class="input">{{params.rate}}</span>
					<span>%</span>
				</div>
				<div class="form-input">
					<span class="name">借款金额：</span>
					<span class="input">{{params.money}}</span>
					<span>万元</span>
				</div>
				<div class="form-input">
					<span class="name">大写：</span>
					<span class="input">{{params.money | transferMoney}}</span>
				</div>
				<div class="form-input">
					<span class="name">借款期限：</span>
					<span class="input">{{params.loan_time + '个月'}}</span>
				</div>
				<div class="form-input">
					<span class="name">借款说明：</span>
					<span class="input">{{params.detail}}</span>
				</div>
			</div>
			<div v-if="match_proof.length > 0">
				<div class="form-title">
					<h1>认证信息</h1>
				</div>
				<div v-for="(proof_, index) in match_proof">
					<div class="form-input">
						<span class="name">认证名称：</span>
						<span class="input">{{proof_.proof_name}}</span>
					</div>
					<div class="form-input">
						<span class="name">&nbsp;</span>
						<div class="image-container">
							<img :src="proof_.proof_detail">
						</div>
					</div>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>还款计划</h1>
				</div>
				<div class="form-table">
					<table class="table">
						<thead style="text-align:left">
							<tr>
								<th>期数</th>
								<th>总额</th>
								<th>本金</th>
								<th>利息</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="cal in back.terms">
								<td>{{cal.qs}}</td>
								<td>{{cal.emTotal}}</td>
								<td>{{cal.em}}</td>
								<td>{{cal.lx}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div>
				<div class="button-group">
					<router-link class="btn white" :to="{name:'m-p2praise'}">返回</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {getRaiseDetail} from '~/ajax/get.js'
	import {transferMoney} from '~/utils.js'

	export default {
		filters: {
			transferMoney
		},
		data(){
			return {
				params: {
					username: "",
					age: "",
					block: "",
					detail: "",
					gender: "",
					job: "",
					loan_time: "",
					money: "",
					rate: "",
					name: "",
					phone: "",
					publish_time: "",
					request: "",
					tag: "",
					repay: "",
					repay_type: ""
				},
				back: {
					terms: []
				},
				match_proof: []
			}
		},
		mounted(){
			getRaiseDetail({
				id: this.$route.query.relation_id
			}).then((res)=>{
				console.dir(res)
				Object.keys(this.params).forEach((prop) => {
					var val = res.baseinfo[prop]
					if (val) {
						this.params[prop] = val 
					}
				})
				this.back.terms = res.back.terms
				this.match_proof = res.match_proof
			})
		}
	}
</script>