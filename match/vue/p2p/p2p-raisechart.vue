<template>
	<div>
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">P2P</li>
				<li class="item">发标操作</li>
			</ol>
			<p class="remain-time">剩余时间：<span>30分00秒</span></p>
		</div>
		<div class="form-page" v-if="showPage">
			<div>
				<div class="form-title">
					<h1>类型选择</h1>
					<router-link class="btn blue" :to="{name:'m-p2praisedetail', query: {id: $route.query.id}}">查看资料</router-link>
				</div>
				<div class="form-input">
					<span class="name">类型：</span>
					<input-select prop="tag_id" :init="params.tag_id" :getOptions="getP2PTag" @select-result-change="changeSelectProp"></input-select>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>基本信息</h1>
				</div>
				<div class="form-input">
					<span class="name">姓名：</span>
					<input-text prop="username" :init="params.username" placeholder="5个字以内" @text-result-change="changeStringProp"></input-text>
				</div>
				<div class="form-input">
					<span class="name">姓别：</span>
					<input-select prop="gender" :init="params.gender" :getOptions="getGenderOptions" @select-result-change="changeSelectProp"></input-select>
				</div>
				<div class="form-input">
					<span class="name">职业：</span>
					<input-text prop="job" :init="params.job" placeholder="10个字以内" @text-result-change="changeStringProp"></input-text>
				</div>
				<div class="form-input">
					<span class="name">手机号码：</span>
					<input-text prop="phone" :init="params.phone" placeholder="请输入手机号码" @text-result-change="changeStringProp"></input-text>
				</div>
				<div class="form-input">
					<span class="name">地区：</span>
					<input-select ref="province" prop="province" :init="params.province" :getOptions="getProvinceList" @select-result-change="provinceChange"></input-select>
					<input-select ref="city" prop="city" :init="params.city" :getOptions="getCityList" @select-result-change="cityChange" @deps-change="changeGetCityList"></input-select>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>借款信息</h1>
				</div>
				<div class="form-input">
					<span class="name">项目名称：</span>
					<input-text prop="name" :init="params.name" placeholder="15字以内" @text-result-change="changeStringProp"></input-text>
				</div>
				<div class="form-input">
					<span class="name">风险要求：</span>
					<input-select prop="request_id" :init="params.request_id" :getOptions="getRequestList" @select-result-change="changeSelectProp"></input-select>
				</div>
				<div class="form-input">
					<span class="name">还款方式：</span>
					<input-select prop="repay_type_id" :init="params.repay_type_id" :getOptions="getRepaymentList" @select-result-change="changeSelectProp"></input-select>
				</div>
				<div class="form-input">
					<span class="name">利息偿付：</span>
					<input-text prop="rate" :init="params.rate" placeholder="年利率" @text-result-change="changeStringProp"></input-text>
				</div>
				<div class="form-input">
					<span class="name">借款金额：</span>
					<input-text prop="money" :init="params.money" placeholder="20万以内" @text-result-change="changeStringProp"></input-text>
					<span>万元</span>
				</div>
				<div class="form-input">
					<span class="name">大写：</span>
					<span class="input">{{params.money | transferMoney}}</span>
				</div>
				<div class="form-input">
					<span class="name">借款期限：</span>
					<input-select prop="loan_time" :init="params.loan_time" :getOptions="getLoanTimeOptions" @select-result-change="changeSelectProp"></input-select>
				</div>
				<div class="form-input">
					<span class="name">借款说明：</span>
					<input-textarea prop="detail" :init="params.detail" placeholder="200字以内" @text-result-change="changeStringProp"></input-textarea>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>认证信息</h1>
				</div>
				<div v-for="(proof_,index) in params.proof">
					<div class="form-input">
						<span class="name">认证名称：</span>
						<input-text :prop="index" :init="proof_.name" placeholder="10个字以内" @text-result-change="changeProofName"></input-text>
					</div>
					<div class="form-input">
						<span class="name">&nbsp</span>
						<input-image :prop="index" :init="proof_.detail" @image-result-change="changeProofDetail"></input-image>
					</div>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>还款计划</h1>
				</div>
				<div class="form-table">
					<table class="table">
						<thead>
							<tr>
								<th>时间</th>
								<th>总额</th>
								<th>本金</th>
								<th>利息</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="i in 10">
								<td>{{i}}</td>
								<td>10</td>
								<td>XXX</td>
								<td>0.5%</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div>
				<div class="button-group">
					<router-link class="btn white" :to="{name:'m-p2praisedetail', query: {id: $route.query.id}}">返回</router-link>
					<a class="btn blue">提交</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import inputSelect from '~/components/inputs/input-select.vue'
	import inputText from '~/components/inputs/input-text.vue'
	import inputTextarea from '~/components/inputs/input-textarea.vue'
	import inputImage from '~/components/inputs/input-image.vue'

	import {transferMoney} from '~/utils.js'
	import {P2PRaisePlaceholder} from '~/vuex/p2pRaise.js'

	import {
		getP2PTag, 
		getProvinceList, 
		getCityList,
		getRequestList,
		getRepaymentList
	} from '~/ajax/get_y.js'

	import router from '~/router.js'
	import store from '~/vuex'		


	export default {
		computed: {
			params(){
				return store.getters.p2pParam || P2PRaisePlaceholder()
			},
			showPage(){
				return this.params.id !== undefined && this.params.id !== ""
			}
		},
		methods: {
			provinceChange(val){
				this.changeSelectProp(val)
				this.$refs.city.$emit('deps-change', val)
			},
			cityChange(val){
				this.changeSelectProp(val)
			},
			changeGetCityList(item){ // {prop: .., value: {value: .., name: ..}}
				var cityId = item.value.value
				var self = this
				getCityList(cityId).then(function(res){
					self.$refs.city.options = res
				})
			},
			getRepaymentList,
			getRequestList,
			getProvinceList,
			getCityList: function(){
				if (this.params.province) {
					return getCityList(this.params.province)
				} else {
					return Promise.resolve([])
				}
			},
			getP2PTag,
			getGenderOptions(){
				return Promise.resolve([
					{name: '男', value: '男'},
					{name: '女', value: '女'}
				])
			},
			getLoanTimeOptions(){
				return Promise.resolve([
					{name: '3个月', value: '3个月'},
					{name: '6个月', value: '6个月'},
					{name: '9个月', value: '9个月'},
					{name: '12个月', value: '12个月'},
					{name: '24个月', value: '24个月'}
				])
			},
			changeProofName(item){ // item { prop: proof编号, value: proof 名称}
				store.commit('changeProofName', {
					id: this.id,
					item: item
				})	
			},
			changeProofDetail(item){ // item { prop: proof编号, value: proof 图片地址}
				console.log(`change: ${JSON.stringify(item)}`)
			},
			changeSelectProp(item){
				var item = {
					prop: item.prop,
					value: item.value.value
				}
				store.commit('changeStringProp', {
					id: this.id,
					item: item
				})
			},
			changeStringProp(item){
				store.commit('changeStringProp', {
					id: this.id,
					item: item
				})
			}
		},
		components: {
			'input-select': inputSelect,
			'input-text': inputText,
			'input-textarea': inputTextarea,
			'input-image': inputImage
		},
		mounted(){
			var id = store.state.route.query.id
			this.id = id
			store.commit('makeParamsPlaceholder', {
				id: id
			})
		},
		filters: {
			transferMoney(val){
				if (!val) 
					return ""
				return transferMoney(val)
			}
		}
	}
</script>