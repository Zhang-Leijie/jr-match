<template>
	<div>
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">众筹</li>
				<li class="item">项目设计</li>
			</ol>
			<p class="remain-time">剩余时间：<span>30分00秒</span></p>
		</div>
		<div class="form-page" v-if="params.id!==''">
			<div>
				<div class="form-title">
					<h1>项目信息</h1>
					<router-link class="btn blue" :to="{name:'m-cfitem-detail', query: {id: params.id}}">查看资料</router-link>
				</div>
				<div class="form-input">
					<span class="name">项目名称：</span>
					<input-text prop="name" :init="params.name" placeholder="10个字以内" @text-result-change="changeStringProp"></input-text>
				</div>
				<div class="form-input">
					<span class="name">项目简介：</span>
					<input-textarea prop="summary" :init="params.summary" placeholder="200字以内" @text-result-change="changeStringProp"></input-textarea>
				</div>
				<div class="form-input">
					<span class="name">所在城市：</span>
					<input-select ref="province" prop="province" :init="params.province" :getOptions="getProvinceList" @select-result-change="provinceChange"></input-select>
					<input-select ref="city" prop="city" :init="params.city" :getOptions="getCityList" @select-result-change="cityChange" @deps-change="changeGetCityList"></input-select>
				</div>
				<div class="form-input">
					<span class="name">是否领头：</span>
					<div class="input-radio" v-for="(lead,index) in leadOptions">
						<input type="radio" :id="'tag_'+index" name="tag_lead" @change="changeStringProp({prop: 'lead', value: lead.value})">
						<label :for="'tag_'+index">{{lead.name}}</label>
					</div>
				</div>
				<div class="form-input">
					<span class="name">创立时间：</span>
					<date-picker
						inputname="found_time"
						@date-change="changeStringProp({prop: 'found_time', value: $event})"
					>
					</date-picker>
				</div>
				<div class="form-input">
					<span class="name">项目阶段：</span>
					<input-select prop="period_id" :init="params.period_id" :getOptions="getPeriodOptions" @select-result-change="changeSelectProp"></input-select>
				</div>
				<div class="form-input">
					<span class="name">盈利状况：</span>
					<input-select prop="profit_id" :init="params.profit_id" :getOptions="getProfitOptions" @select-result-change="changeSelectProp"></input-select>
				</div>
				<div class="form-input">
					<span class="name">运营数据：</span>
					<input-textarea prop="detail" :init="params.detail" placeholder="200字以内" @text-result-change="changeStringProp"></input-textarea>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>项目展示</h1>
				</div>
				<div class="form-input">
					<span class="name">首页图片：</span>
					<input-image prop="index_photo" :init="params.index_photo" @image-result-change="changeStringProp"></input-image>
				</div>
				<div class="form-input">
					<span class="name">项目图片：</span>
					<input-image prop="project_photo" :init="params.project_photo" @image-result-change="changeStringProp"></input-image>
				</div>
				<div class="form-input">
					<span class="name">商业模式：</span>
					<input-image prop="mode_photo" :init="params.mode_photo" @image-result-change="changeStringProp"></input-image>
				</div>
				<div class="form-input">
					<span class="name">市场分析：</span>
					<input-image prop="analysis_photo" :init="params.analysis_photo" @image-result-change="changeStringProp"></input-image>
				</div>
				<div class="form-input">
					<span class="name">核心竞争力：</span>
					<input-image prop="core_photo" :init="params.core_photo" @image-result-change="changeStringProp"></input-image>
				</div>
				<div class="form-input">
					<span class="name">商业计划书：</span>
					<input-file 
						prop="prospectus" 
						:init="params.prospectus" 
						:verify="validPdfExt"
						@file-result-change="changeStringProp">
					</input-file>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>项目信息</h1>
				</div>
				<div class="form-input">
					<span class="name">目标额度：</span>
					<input-text prop="money" :init="params.money" placeholder="10个字以内" @text-result-change="changeStringProp"></input-text>
					<span>元</span>
				</div>
				<div class="form-input">
					<span class="name">出让股份：</span>
					<input-text prop="shares" :init="params.shares" placeholder="10个字以内" @text-result-change="changeStringProp"></input-text>
					<span>%</span>
				</div>
				<div class="form-input">
					<span class="name">融资计划书：</span>
					<input-file 
						prop="proposal" 
						:init="params.proposal" 
						:verify="validPdfExt"
						@file-result-change="changeStringProp">
					</input-file>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>发起者信息</h1>
				</div>
				<div class="form-input">
					<span class="name">
						<input-avatar prop="team_logo" :init="params.team_logo" @image-result-change="changeStringProp"></input-avatar>
					</span>
				</div>
				<div class="form-input">
					<span class="name">团队名称：</span>
					<input-text prop="team_name" :init="params.team_name" placeholder="10个字以内" @text-result-change="changeStringProp"></input-text>
				</div>
				<div class="form-input">
					<span class="name">团队简介：</span>
					<input-textarea prop="team_summary" :init="params.team_summary" placeholder="200字以内" @text-result-change="changeStringProp"></input-textarea>
				</div>
				<div class="form-input">
					<span class="name">团队成员：</span>
				</div>
				<div v-for="(member_,index) in params.member" :key="member_.id">
					<div class="form-input">
						<span class="name">
							<input-avatar 
								:prop="index" 
								:avatarClass="['small']" 
								:init="member_.member_avartar" 
								@image-result-change="changeMemberProp($event, 'member_avartar')">
							</input-avatar>
						</span>
						<a class="btn blue" style="margin-top:20px;margin-left:20px" @click="removeMember(index)" v-if="index > 0">移除成员</a>
					</div>
					<div class="form-input indent0">
						<span class="name">姓名：</span>
						<input-text 
							:prop="index" 
							:init="member_.member_name" 
							placeholder="5个字以内" 
							@text-result-change="changeMemberProp($event, 'member_name')">
						</input-text>
					</div>
					<div class="form-input indent0">
						<span class="name">团队职务：</span>
						<input-text 
							:prop="index" 
							:init="member_.member_position" 
							placeholder="10个字以内" 
							@text-result-change="changeMemberProp($event, 'member_position')">
						</input-text>
					</div>
					<div class="form-input indent0">
						<span class="name">个人简介：</span>
						<input-textarea 
							:prop="index" 
							:init="member_.member_intro" 
							placeholder="200字以内" 
							@text-result-change="changeMemberProp($event, 'member_intro')">
						</input-textarea>
					</div>
				</div>
				<div class="form-input">
					<span class="name">&nbsp;</span>
					<a class="input btn-add" @click="addMember"></a>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>认证信息</h1>
				</div>
				<div v-for="(proof_, index) in params.proof" :key="proof_.id">
					<div class="form-input">
						<span class="name">认证名称：</span>
						<input-text :prop="index" :init="proof_.name" placeholder="10个字以内" @text-result-change="changeProofProp($event, 'name')"></input-text>
						<a v-if="index > 0" class="btn-cancel" @click="removeProof(index)"></a>
					</div>
					<div class="form-input">
						<span class="name">&nbsp;</span>
						<input-image :prop="index" :init="proof_.detail" @image-result-change="changeProofProp($event, 'detail')"></input-image>
					</div>
				</div>
				<div class="form-input">
					<span class="name">&nbsp;</span>
					<a class="input btn-add" @click="addProof"></a>
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
	import router from '~/router.js'
	import {CFRaisePlaceholder} from '~/vuex/crowdfunding.js' 

	import inputSelect from '~/components/inputs/input-select.vue'
	import inputText from '~/components/inputs/input-text.vue'
	import inputTextarea from '~/components/inputs/input-textarea.vue'
	import inputImage from '~/components/inputs/input-image.vue'
	import inputAvatarImage from '~/components/inputs/input-avatar-image.vue'
	import Modal from '~/components/modal.vue'
	import datePicker from '~/components/date-picker.vue'
	import inputFile from '~/components/inputs/input-file.vue'


	import {
		getProvinceList, 
		getCityList,
		getPeriodOptions,
		getProfitOptions
	} from '~/ajax/get.js'

	import {
		postCF
	} from '~/ajax/post.js'

	import {validPdfExt, verifyLength} from '~/utils.js'

	export default {
		data(){
			return {
				leadOptions: [{
					name: '是',value: '2'
				},{
					name: '否', value: '1'
				}],
				showModal: false,
				uploading: false,
				isSuccess: false,
				state: "",
				error: ""
			}
		},
		computed: {
			params(){
				return store.getters.CFParams || CFRaisePlaceholder()
			},
			title(){
				var up = this.uploading 
				var state = this.state
				if (up) {
					return '正在提交众筹项目'
				} else if (state == "") {
					return '确认提交众筹项目?'
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
				var error = checkCFParams(params)
				console.log('hehe')
				if (error!==true) {
					console.log('hehe')
					this.state = "失败"
					this.error = error
					return
				}

				this.uploading = true
				setTimeout(() => {
					postCF(params).then((res) => {
						this.state = '成功'
						this.uploading = false
					}).catch((e) => {
						this.state = '失败'
						this.error = e.message
						this.uploading = false 
					})
				}, 2000)
			},
			openDate(){
				console.log('hehe')
				WdatePicker({el: 'found_time'})
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
			provinceChange(val){
				this.changeSelectProp(val)
				this.$refs.city.$emit('deps-change', val)
			},
			getPeriodOptions,
			getProfitOptions,
			getProvinceList, 
			validPdfExt,
			getCityList: function(){
				if (this.params.province) {
					return getCityList(this.params.province)
				} else {
					return Promise.resolve([])
				}
			},
			changeSelectProp(item){
				var item = {
					prop: item.prop,
					value: item.value.value
				}
				store.commit('changeCFStringProp', {
					id: this.id,
					item: item
				})
			},
			changeMemberProp(item, member_prop){
				// item.prop = member's index
				store.commit('changeCFRaiseMemberProp', {
					id: this.id,
					item: item,
					prop: member_prop
				})
			},
			addMember(){
				store.commit('addCFRaiseMember', {
					id: this.id
				})
			},
			removeMember(index){
				store.commit('removeCFRaiseMember', {
					id: this.id,
					index: index
				})
			},
			changeProofProp(item, proof_prop){
				store.commit('changeCFRaiseProofProp', {
					id: this.id,
					item: item,
					prop: proof_prop
				})
			},
			addProof(){
				store.commit('addCFRaiseProof', {
					id: this.id
				})
			},
			removeProof(index){
				store.commit('removeCFRaiseProof', {
					id: this.id,
					index: index
				})
			},
			changeStringProp(item){
				store.commit('changeCFStringProp', {
					id: this.id,
					item: item
				})
			},
			complete(){
				console.log('heheh')
				router.push({name: 'm-cfitem-detail'})
			}
		},
		mounted(){
			this.id = store.state.route.query.id
			store.commit('makeCFPlaceholder', {id: this.id})
		},
		components: {
			'input-select': inputSelect,
			'input-text': inputText,
			'input-textarea': inputTextarea,
			'input-image': inputImage,
			'modal': Modal,
			'date-picker': datePicker,
			'input-file': inputFile,
			'input-avatar': inputAvatarImage
		}
	}


	function normalizeParams(params) {
		var ret = JSON.parse(JSON.stringify(params))
		ret.proof.forEach((item)=>{
			delete item.id
		})
		ret.member.forEach((item)=> {
			delete item.id
		})
		delete params.id 
		return ret
	}

	const checklist = {
		proposal: { verify: verifyLength('融资计划书') },
		detail: {verify: verifyLength('项目详情', 200) },
		core_photo: { verify: verifyLength('核心竞争力') },
		analysis_photo: { verify: verifyLength('市场分析') },
		found_time: { verify: verifyLength('创立时间') },
		city: { verify: verifyLength('地区') },
		mode_photo: { verify: verifyLength('商业模式') },
		proof: {
			verify: function(proof){
				return proof.every((item) => {
					return item.name !== "" && item.detail !== ""
				}) ? true : '请填写将认证信息完整'
			} 
		},
		profit_id: { verify: verifyLength('盈利状况') },
		member: {
			verify: function(members){
				var i = 0, length = members.length, member 
				while(++i < length) {
					member = members[i]
					if (member.member_name == "") {
						return '请填写第${i+1}位团队成员名称'
					} else if (member.member_name.length > 5) {
						return '请填写第${i+1}位团队成员名称应少于5个字'
					} else if (member.member_position == "") {
						return '请填写第${i+1}位团队成员职务'
					} else if (member.member_position > 10) {
						return '请填写第${i+1}位团队成员职务应少于10个字'
					} else if (member.member_intro == "") {
						return '请填写第${i+1}位团队成员介绍'
					} else if (member.member_intro > 200) {
						return '请填写第${i+1}位团队成员介绍应少于200个字'
					} else if (member.member_avartar == "") {
						return '请填写第${i+1}位团队成员头像'
					}
				}
				return true
			}
		},
		lead: { verify: verifyLength('是否领头') },
		name: { verify: verifyLength('项目名称') },
		money: { verify: verifyLength('目标金额') },
		index_photo: { verify: verifyLength('首页图片') },
		project_photo: { verify: verifyLength('项目图片') },
		period_id: { verify: verifyLength('项目阶段') },
		prospectus: { verify: verifyLength('商业计划书') },
		province: { verify: verifyLength('地区') },
		shares: { verify: verifyLength('出让股份') },
		summary: { verify: verifyLength('项目简介') },
		team_logo: { verify: verifyLength('团队logo') },
		team_name: { verify: verifyLength('团队名称') },
		team_summary: { verify: verifyLength('商业介绍') }
	}

	function checkCFParams(params){
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
</script>
<style>
	.modal-body p {
		padding-top: 10px;
		font-size:18px;
		color:#666;
		text-align:center;
	}
</style>