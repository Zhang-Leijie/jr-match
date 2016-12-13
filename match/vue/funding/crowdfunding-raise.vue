<template>
	<div>
		<time-remain type="cfRaise" @time-set="getData" @time-out="whenTimeout"></time-remain>
		<div class="form-page" v-if="dataReady">
			<div>
				<div class="form-title">
					<h1>项目信息</h1>
					<router-link 
						class="btn blue" 
						:to="{name:'m-cfitem-detail', query: {id: $route.query.id, relation_id:$route.query.relation_id}}">
						查看资料
					</router-link>
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
					<input-select ref="city" prop="city" :init="params.city" :getOptions="getCityList" @select-result-change="changeStringProp" @deps-change="changeGetCityList"></input-select>
				</div>
				<div class="form-input">
					<span class="name">是否领投：</span>
					<div class="input-radio" v-for="(lead,index) in leadOptions">
						<input type="radio" :id="'tag_'+index" name="tag_lead" @change="changeStringProp({prop: 'lead', value: lead.value})" :value="lead.value" v-model="params.lead">
						<label :for="'tag_'+index">{{lead.name}}</label>
					</div>
				</div>
				<div class="form-input">
					<span class="name">创立时间：</span>
					<date-picker
						inputname="found_time"
						:init="params.found_time"
						@date-change="changeStringProp({prop: 'found_time', value: $event})"
					>
					</date-picker>
				</div>
				<div class="form-input">
					<span class="name">项目阶段：</span>
					<input-select prop="period_id" :init="params.period_id" :getOptions="getPeriodOptions" @select-result-change="changeStringProp"></input-select>
				</div>
				<div class="form-input">
					<span class="name">盈利状况：</span>
					<input-select prop="profit_id" :init="params.profit_id" :getOptions="getProfitOptions" @select-result-change="changeStringProp"></input-select>
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
					<span class="name">商业计划书（可选）：</span>
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
					<span class="name">融资计划书（可选）：</span>
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
				<div v-for="(member_,index) in member">
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
					<h1>认证信息（可选）</h1>
				</div>
				<div v-for="(proof_, index) in proof">
					<div class="form-input">
						<span class="name">认证名称：</span>
						<input-text :prop="index" :init="proof_.name" placeholder="10个字以内" @text-result-change="changeProofProp($event, 'name')"></input-text>
						<a class="btn-cancel" @click="removeProof(index)"></a>
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
					<router-link class="btn white" :to="{name:'m-cfitem-detail', query: {id: $route.query.id}}">返回</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import router from '~/router.js'

	import {
		getProvinceList, 
		getCityList,
		getPeriodOptions,
		getProfitOptions,
		getCFDetail
	} from '~/ajax/get.js'

	import {
		postCF
	} from '~/ajax/post.js'

	import {validPdfExt, verifyLength} from '~/utils.js'
	import {getUniqueId, debounce, DEBOUNCE} from '~/utils.js'

	export default {
		data(){
			return {
				leadOptions: [{
					name: '是',value: '2'
				},{
					name: '否', value: '1'
				}],
				dataReady: false,
				params: {

				},
				member: [],
				proof: []
			}
		},
		methods: {
			whenTimeout(){
				alert('考试时间已到, 结果已为您提交')
				router.push({name:'m-index'}) 
			},
			getData(){
				var self = this

				getCFDetail({
					id: this.$route.query.id,
					relation_id: this.$route.query.relation_id || 'null'
				}).then((res) => {
					console.log(res)

					;['name', 'summary', "money", "province", "city", "shares", "lead", "prospectus", "proposal", "index_photo", "project_photo", "mode_photo", "analysis_photo", "core_photo", "detail", "team_logo", "team_name", "team_summary"].forEach((key)=>{
						this.params[key] = res.baseinfo[key] || ""
					})

					this.params['found_time'] = res.baseinfo.found_time_timestamp || 0
					this.params['period_id'] = res.baseinfo.period || 0
					this.params['profit_id'] = res.baseinfo.profit || 0

					this.member = res.team
					this.proof = res.proof.map((proof_)=>{
						return {
							name: proof_.proof_name,
							detail: proof_.proof_detail
						}
					})
					this.dataReady = true
				})
			},
			openDate(){
				WdatePicker({el: 'found_time'})
			},
			changeGetCityList(item){ // {prop: .., value: {value: .., name: ..}}
				var cityId = item.value.value
				var self = this
				getCityList(cityId).then(function(res){
					self.$refs.city.options = res
				})
			},
			provinceChange(val){
				this.changeStringProp(val)
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
			changeMemberProp(item, member_prop){
				this.member[item.prop][member_prop] = item.value
				this.uploadMember()
			},
			addMember(){
				this.member.push({
					member_avartar: "",
					member_intro: "",
					member_name: "",
					member_position: ""
				})
			},
			removeMember(index){
				this.member.splice(index, 1)
				this.uploadMember()
			},
			uploadMember: debounce(function(){
				this.changeStringProp({
					prop: 'member',
					value: JSON.parse(JSON.stringify(this.member))
				})
			}, DEBOUNCE),
			changeProofProp(item, prop){
				this.proof[item.prop][prop] = item.value 
				this.uploadProof()
			},
			addProof(){
				this.proof.push({
					name: "",
					detail: "",
					id: getUniqueId()
				})
			},
			removeProof(index){
				this.proof.splice(index, 1)
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
				postCF(params).then(()=>{

				}).catch(()=>{
					alert('修改失败！')
				})
				var val = item.value.value || item.value
				this.params[item.prop] = val
			},
			complete(){
				router.push({name: 'm-cfitem-detail'})
			}
		}
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