<template>
	<div>
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">P2P</li>
				<li class="item">发标操作</li>
			</ol>
			<p class="remain-time">剩余时间：<span>30分00秒</span></p>
		</div>
		<div class="form-page">
			<div>
				<div class="form-title">
					<h1>类型选择</h1>
					<router-link class="btn blue" :to="{name:'m-p2praisedetail', query: {id: $route.query.id}}">查看资料</router-link>
				</div>
				<div class="form-input">
					<span class="name">类型：</span>
					<input-select prop="tag_id" :init="params.tag_id" :getOptions="getP2PTag" @select-result-change="changeStringProp"></input-select>
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
					<input-select prop="gender" :init="params.gender" :getOptions="getGenderOptions" @select-result-change="changeStringProp"></input-select>
				</div>
				<div class="form-input">
					<span class="name">年龄：</span>
					<input-text prop="age" :init="params.age" @text-result-change="changeStringProp"></input-text>
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
					<input-select ref="city" prop="city" :init="params.city" :getOptions="getCityList" @select-result-change="changeStringProp" @deps-change="changeGetCityList"></input-select>
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
					<input-select prop="request_id" :init="params.request_id" :getOptions="getRequestList" @select-result-change="changeStringProp"></input-select>
				</div>
				<div class="form-input">
					<span class="name">还款方式：</span>
					<input-select prop="repay_type_id" :init="params.repay_type_id" :getOptions="getRepaymentList" @select-result-change="changeStringProp"></input-select>
				</div>
				<div class="form-input">
					<span class="name">利息偿付：</span>
					<input-text prop="rate" :init="params.rate" placeholder="年利率" @text-result-change="changeStringProp"></input-text>
					<span>%</span>
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
					<input-select prop="loan_time" :init="params.loan_time" :getOptions="getLoanTimeOptions" @select-result-change="changeStringProp"></input-select>
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
				<div v-for="(proof_, index) in params.proof" :key="proof_.id">
					<div class="form-input">
						<span class="name">认证名称：</span>
						<input-text :prop="index" :init="proof_.name" placeholder="10个字以内" @text-result-change="changeProofName"></input-text>
						<a v-if="index > 0" class="btn-cancel" @click="removeProof(index)"></a>
					</div>
					<div class="form-input">
						<span class="name">&nbsp;</span>
						<input-image :prop="index" :init="proof_.detail" @image-result-change="changeProofDetail"></input-image>
					</div>
				</div>
				<div class="form-input">
					<span class="name">&nbsp;</span>
					<a class="input btn-add" @click="addProof"></a>
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
								<th>时间</th>
								<th>总额</th>
								<th>本金</th>
								<th>利息</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="cal in calrets">
								<td>{{cal.order}}</td>
								<td>{{cal.pAndI}}</td>
								<td>{{cal.p}}</td>
								<td>{{cal.i}}</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<div>
				<div class="button-group">
					<router-link class="btn white" :to="{name:'m-p2praisedetail', query: {id: $route.query.id}}">返回</router-link>
					<a class="btn blue" @click="openModal">提交</a>
				</div>
			</div>
		</div>
		<modal v-if="showModal">
			<p slot="header" class='f8' style="text-align:center;margin-top:30px;">{{title}}</p>
			<p slot="body" class='f6' style="text-align:center;">{{message}}</p>

			<p slot="footer" style="text-align:center;" v-if="!uploading&&state==''">
				<a class="btn white" @click="showModal=false">返回</a>
				<a class="btn blue" @click="confirm" style="margin-left:30px;">确认</a>
			</p>
			<p slot="footer" style="text-align:center;" v-if="uploading">
			</p>
			<p slot="footer" style="text-align:center;" v-if="!uploading&&state=='成功'">
				<router-link class="btn blue" :to="{name:'m-p2praise'}">完成</router-link>
			</p>
			<p slot="footer" style="text-align:center;" v-if="!uploading&&state=='失败'">
				<a class="btn white" @click="showModal=false">返回</a>
			</p>
		</modal>
	</div>
</template>
<script>
	import inputSelect from '~/components/inputs/input-select.vue'
	import inputText from '~/components/inputs/input-text.vue'
	import inputTextarea from '~/components/inputs/input-textarea.vue'
	import inputImage from '~/components/inputs/input-image.vue'
	import Modal from '~/components/modal.vue'

	import {transferMoney, payInOnce, payEveryMonth, payInMonth, verifyLength} from '~/utils.js'
	import {getUniqueId, genLsId} from '~/utils.js'

	import {
		getP2PTag, 
		getProvinceList, 
		getCityList,
		getRequestList,
		getRepaymentList
	} from '~/ajax/get.js'

	import router from '~/router.js'

	import {postP2P} from '~/ajax/post.js'
	var ls = require('localStorage')

	export default {
		data(){
			var params = ls.getItem(genLsId(this.$route.query.userid, 'p2pRaise'))
			if (params) {
				params = JSON.parse(params)
			} else {
				params = P2PRaisePlaceholder(this.$route.query.id)
				ls.setItem(genLsId(this.$route.query.userid, 'p2pRaise'), JSON.stringify(params))
			}
			return {
				calrets: [],
				showModal: false,
				uploading: false,
				isSuccess: false,
				state: "",
				error: "",
				params: params
			}
		},
		watch: {
			params: {
				deep: true,
				handler: function(val, oldVal){
					ls.setItem(genLsId(this.userid, 'p2pRaise'), JSON.stringify(val))
				}
			}
		},
		computed: {
			title(){
				var up = this.uploading 
				var state = this.state
				if (up) {
					return '正在提交P2P项目'
				} else if (state == "") {
					return '确认提交P2P项目?'
				} else if (state == "失败") {
					return '提交失败'
				} else {
					return '提交成功'
				}
			},
			message(){
				var up = this.uploading 
				var state = this.state
				if (up) {
					return '请耐心等待'
				} else if (state == "") {
					return '提交后不能再进行更改'
				} else if (state == "失败") {
					return this.error
				} else {
					return '点击完成回到审标列表页'
				}	
			}
		},
		methods: {
			openModal(){
				this.state = ""
				this.uploading = false
				this.showModal = true
			},
			confirm(){
				var params = normalizeParams(this.params)
				var error = checkP2PParams(params)
				if (error!==true) {
					this.state = "失败"
					this.error = error
					return
				}

				this.uploading = true
				setTimeout(() => {
					postP2P(params).then((res) => {
						this.state = '成功'
						this.uploading = false
					}).catch((e) => {
						this.state = '失败'
						this.error = e.message
						this.uploading = false 
					})
				}, 2000)
			},
			addProof(){
				this.params.proof.push({
					name: "",
					detail: "",
					id: getUniqueId()
				})
			},
			removeProof(index){
				this.params.proof.splice(index, 1)
			},
			provinceChange(val){
				this.changeStringProp(val)
				this.$refs.city.$emit('deps-change', val)
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
					{name: '1个月', value: '1个月'},
					{name: '2个月', value: '2个月'},
					{name: '3个月', value: '3个月'},
					{name: '6个月', value: '6个月'},
					{name: '9个月', value: '9个月'},
					{name: '12个月', value: '12个月'},
					{name: '24个月', value: '24个月'}
				])
			},
			changeProofName(item){ // item { prop: proof编号, value: proof 名称}
				this.params.proof[item.prop].name = item.value
			},
			changeProofDetail(item){ // item { prop: proof编号, value: proof 图片地址}
				this.params.proof[item.prop].detail = item.value
			},
			changeStringProp(item){
				var val = item.value.value || item.value
				this.params[item.prop] = val
			},
			calculate(rate, money, loan_time, repay_type_id){
				//console.log(`rate: ${rate},money: ${money},loan_time: ${loan_time}, repay_type_id: ${repay_type_id}`)
				switch(repay_type_id) {
					case "1": this.calrets = payInMonth(money, loan_time, rate);break;
					case "2": this.calrets = payInOnce(money, loan_time, rate);break;
					case "3": this.calrets = payEveryMonth(money, loan_time, rate);break;
					default: alert('不支持该还款方式')
				}
			}
		},
		components: {
			'input-select': inputSelect,
			'input-text': inputText,
			'input-textarea': inputTextarea,
			'input-image': inputImage,
			'modal': Modal
		},
		mounted(){
			var id = this.$route.query.id
			var userid = this.$route.query.userid

			this.id = id
			this.userid = userid

			var self = this
			var calTable = throttle(function([rate, money, loan_time, repay_type_id]){
				//console.log(`--- rate: ${rate},money: ${money},loan_time: ${loan_time}, repay_type_id: ${repay_type_id} ---`)
				var rate = parseFloat(rate).toFixed(3)
				if (Number.isNaN(rate)) return 
				var money = parseInt(money).toFixed()
				if (Number.isNaN(money)) return
				var loan_time = parseInt(loan_time)
				if (Number.isNaN(loan_time)) return 

				if (repay_type_id == "") {
					return
				}

				self.calculate(rate, money, loan_time, repay_type_id)
			}, 2000)

			this.$nextTick(() => {
				this.$watch(() => {
					return [
						this.params.rate, 
						this.params.money, 
						this.params.loan_time, 
						this.params.repay_type_id
					]
				}, function(val){
					calTable(val)
				})
				calTable([
					this.params.rate, 
					this.params.money, 
					this.params.loan_time, 
					this.params.repay_type_id
				])	
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

	function normalizeParams(params) {
		var ret = JSON.parse(JSON.stringify(params))
		ret.proof.forEach((item)=>{
			delete item.id
		})
		return ret
	}

	const checklist = {
		username: { verify: verifyLength('姓名', 5) },
		gender: { verify: verifyLength('性别') },
		job: { verify: verifyLength('职业') },
		age: { verify: verifyLength('年龄') },
		tag_id: { verify: verifyLength('项目类型') },
		phone: { verify: verifyLength('手机号码') },
		city: { verify: verifyLength('城市') },
		province: { verify: verifyLength('省份') },
		name: { verify: verifyLength('') },
		request_id: { verify: verifyLength('风险要求') },
		money: { verify: verifyLength('借款金额') },
		rate: { verify: verifyLength('利息偿付') },
		loan_time: { verify: verifyLength('借款期限') },
		repay_type_id: { verify: verifyLength('还款方式') },
		detail: { verify: verifyLength('借款说明') },
		proof: { 
			verify: function(proof){
				return proof.every((item) => {
					return item.name !== "" && item.detail !== ""
				}) ? true : '请填写将认证信息完整'
			} 
		}
	}
	function checkP2PParams(params){
		var propVerify, verify, error
		for (let prop in params) {
			propVerify = checklist[prop]
			verify = propVerify && propVerify.verify

			if (verify) {
				error = verify(params[prop])
				if (error !== true) {
					return error
				}
			}
		}
		return true
	}

	/* http://stackoverflow.com/questions/27078285/simple-throttle-in-js */
	function throttle(func, wait, options) {
	  var context, args, result;
	  var timeout = null;
	  var previous = 0;
	  if (!options) options = {};
	  var later = function() {
	    previous = options.leading === false ? 0 : Date.now();
	    timeout = null;
	    result = func.apply(context, args);
	    if (!timeout) context = args = null;
	  };
	  return function() {
	    var now = Date.now();
	    if (!previous && options.leading === false) previous = now;
	    var remaining = wait - (now - previous);
	    context = this;
	    args = arguments;
	    if (remaining <= 0 || remaining > wait) {
	      if (timeout) {
	        clearTimeout(timeout);
	        timeout = null;
	      }
	      previous = now;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    } else if (!timeout && options.trailing !== false) {
	      timeout = setTimeout(later, remaining);
	    }
	    return result;
	  };
	};

	const P2PRaisePlaceholder = (id) => {
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
</script>