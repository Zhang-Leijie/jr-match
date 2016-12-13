<template>
	<div>
		<time-remain type="p2pRaise" @time-set="getData" @time-out="whenTimeout"></time-remain>
		<div class="form-page" v-if="dataReady">
			<div>
				<div class="form-title">
					<h1>类型选择</h1>
					<router-link 
						class="btn blue" 
						:to="{name:'m-p2praisedetail', query: {id: $route.query.id, relation_id:$route.query.relation_id}}">
						查看资料
					</router-link>
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
					<span class="name">法人姓名：</span>
					<input-text prop="username" :init="params.username" placeholder="5个字以内" @text-result-change="changeStringProp"></input-text>
				</div>
				<div class="form-input">
					<span class="name">性别：</span>
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
					<span class="name">风险评级：</span>
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
					<span>元</span>
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
					<span class="name">借款用途：</span>
					<input-textarea prop="detail" :init="params.detail" placeholder="200字以内" @text-result-change="changeStringProp"></input-textarea>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>认证信息（可选）</h1>
				</div>
				<div v-for="(proof_, index) in proof">
					<div class="form-input">
						<span class="name">认证名称：</span>
						<input-text :prop="index" :init="proof_.name" placeholder="10个字以内" @text-result-change="changeProofName"></input-text>
						<a class="btn-cancel" @click="removeProof(index)"></a>
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
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		transferMoney, 
		payInOnce, 
		payEveryMonth, 
		payInMonth, 
		verifyLength,
		debounce,
		DEBOUNCE
	} from '~/utils.js'

	import {
		getP2PTag, 
		getProvinceList, 
		getCityList,
		getRequestList,
		getRepaymentList,
		getRaiseDetail
	} from '~/ajax/get.js'

	import router from '~/router.js'

	import {postP2P} from '~/ajax/post.js'

	export default {
		data(){
			return {
				dataReady: false,
				calrets: [],
				params: {
					tag_id: "", // 类型
					username: "", // 法人姓名
					gender: "",  // 性别
					age:"", // 年龄
					job: "", // 职业
					phone: "", // 手机号
					city: "", // 省份
					province: "", // 城市
					name: "", // 项目名称
					request_id: "", // 风险评级
					repay_type_id: "", // 还款方式
					rate: "", // 利息偿付
					money: "", // 借款金额
					loan_time: "", // 借款期限
					detail: "", // 借款用途
				},
				proof:	[] // 认证信息
			}
		},
		methods: {
			whenTimeout(){
				alert('考试时间已到, 结果已为您提交')
				router.push({name:'m-index'}) 
			},
			getData(){
				var self = this

				getRaiseDetail({
					id: this.$route.query.id,
					relation_id: this.$route.query.relation_id || 'null'
				}).then((res)=>{
					console.dir(res)
					if (res.baseinfo && res.baseinfo.age !== undefined) {
						var i = res.baseinfo
						var p = this.params 
						;['tag_id', 'username', 'gender', 'age', 'job','phone', 'city', 'province', 'name', 'request_id', 'repay_type_id', 'rate', 'money', 'loan_time', 'detail'].forEach((key) => {
							if (key == 'loan_time') {
								p[key] = i[key] + '个月'
								return 
							}
							p[key] = i[key] || ''
						})
						this.proof = res.match_proof.map((proof_)=>{
							return {
								name: proof_.proof_name,
								detail: proof_.proof_detail
							}
						})
					}

					this.dataReady = true
				})

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
			addProof(){
				this.proof.push({
					name: "",
					detail: ""
				})
			},
			removeProof(index){
				this.proof.splice(index, 1)
				this.uploadProof()
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
			getCityList: function(){
				if (this.params.province) {
					return getCityList(this.params.province)
				} else {
					return Promise.resolve([])
				}
			},
			getRepaymentList,
			getRequestList,
			getProvinceList,
			getP2PTag,
			getGenderOptions,
			getLoanTimeOptions,
			changeProofName(item){ // item { prop: proof编号, value: proof 名称}
				this.proof[item.prop].name = item.value
				this.uploadProof()
			},
			changeProofDetail(item){ // item { prop: proof编号, value: proof 图片地址}
				this.proof[item.prop].detail = item.value
				this.uploadProof()
			},
			uploadProof: debounce(function(){
				this.changeStringProp({
					prop: 'proof',
					value: JSON.parse(JSON.stringify(this.proof))
				})
			}, DEBOUNCE),
			changeStringProp(item){
				var params = {relation_id: this.$route.query.id}
				var value
				if (item.value && item.value.value) {
					value = item.value.value
				} else {
					value = item.value
				}
				params[item.prop] = value
				postP2P(params).then(()=>{

				}).catch(()=>{
					alert('修改失败！')
				})
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
		filters: {
			transferMoney(val){
				if (!val) 
					return ""
				return transferMoney(val)
			}
		}
	}

	var info__ = undefined
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

	function getLoanTimeOptions(){
		return Promise.resolve([
			{name: '1个月', value: '1个月'},
			{name: '2个月', value: '2个月'},
			{name: '3个月', value: '3个月'},
			{name: '6个月', value: '6个月'},
			{name: '9个月', value: '9个月'},
			{name: '12个月', value: '12个月'},
			{name: '24个月', value: '24个月'}
		])
	}

	function getGenderOptions(){
		return Promise.resolve([
			{name: '男', value: '男'},
			{name: '女', value: '女'}
		])
	}
</script>