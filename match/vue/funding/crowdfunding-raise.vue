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
					<input-textarea prop="detail" :init="params.detail" placeholder="200字以内" @text-result-change="changeStringProp"></input-textarea>
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
					<input type="text" class="input input-text">
				</div>
				<div class="form-input">
					<span class="name">项目阶段：</span>
					<select class="input-select input">
						<option value="">1</option>
						<option value="">2</option>
					</select>
				</div>
				<div class="form-input">
					<span class="name">盈利状况：</span>
					<select class="input-select input">
						<option value="">1</option>
						<option value="">2</option>
					</select>
				</div>
				<div class="form-input">
					<span class="name">运营数据：</span>
					<textarea class="input input-textarea"></textarea>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>项目展示</h1>
				</div>
				<div class="form-input">
					<span class="name">首页图片：</span>
					<div class="image-container">
						<img :src="'./image/zhaopian@2x.png'" alt="">
					</div>
				</div>
				<div class="form-input">
					<span class="name">项目图片：</span>
					<div class="image-container">
						<img :src="'./image/zhaopian@2x.png'" alt="">
					</div>
				</div>
				<div class="form-input">
					<span class="name">商业模式：</span>
					<div class="image-container">
						<img :src="'./image/zhaopian@2x.png'" alt="">
					</div>
				</div>
				<div class="form-input">
					<span class="name">市场分析：</span>
					<div class="image-container">
						<img :src="'./image/zhaopian@2x.png'" alt="">
					</div>
				</div>
				<div class="form-input">
					<span class="name">核心竞争力：</span>
					<div class="image-container">
						<img :src="'./image/zhaopian@2x.png'" alt="">
					</div>
				</div>
				<div class="form-input">
					<span class="name">商业计划书：</span>
					<a class="btn blue">点击上传</a>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>项目信息</h1>
				</div>
				<div class="form-input">
					<span class="name">目标额度：</span>
					<input type="text" class="input input-text">
					<span>元</span>
				</div>
				<div class="form-input">
					<span class="name">出让股份：</span>
					<input type="text" class="input input-text">
					<span>%</span>
				</div>
				<div class="form-input">
					<span class="name">融资计划书：</span>
					<a class="btn blue">点击上传</a>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>项目信息</h1>
				</div>
				<div class="form-input">
					<span class="name">目标额度：</span>
					<input type="text" class="input input-text">
					<span>元</span>
				</div>
				<div class="form-input">
					<span class="name">出让股份：</span>
					<input type="text" class="input input-text">
					<span>%</span>
				</div>
				<div class="form-input">
					<span class="name">融资计划书：</span>
					<a class="btn blue">点击上传</a>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>发起者信息</h1>
				</div>
				<div class="form-input">
					<span class="name">
						<div class="avatar-image">
							<img :src="'./image/tipian@2x.png'" alt="">
						</div>
					</span>
				</div>
				<div class="form-input">
					<span class="name">团队名称：</span>
					<input type="text" class="input input-text">
				</div>
				<div class="form-input">
					<span class="name">团队简介：</span>
					<textarea class="input input-textarea"></textarea>
				</div>
				<div class="form-input">
					<span class="name">团队成员：</span>
				</div>
				<div>
					<div class="form-input">
						<span class="name">
							<div class="avatar-image small">
								<img :src="'./image/tipian@2x.png'" alt="">
							</div>
						</span>
					</div>
					<div class="form-input indent0">
						<span class="name">姓名：</span>
						<input type="text" class="input input-text">
					</div>
					<div class="form-input indent0">
						<span class="name">团队职务：</span>
						<input type="text" class="input input-text">
					</div>
					<div class="form-input indent0">
						<span class="name">个人简介：</span>
						<textarea class="input input-textarea"></textarea>
					</div>
				</div>

			</div>
			<div>
				<div class="form-title">
					<h1>认证信息</h1>
				</div>
				<div class="form-input">
					<span class="name">认证名称：</span>
					<input type="text" class="input input-text">
				</div>
				<div class="form-input">
					<span class="name">&nbsp</span>
					<div class="image-container">
						<img :src="'./image/touxiang@2x.png'" alt="">
					</div>
				</div>
				<div class="form-input">
					<span class="name">认证名称：</span>
					<input type="text" class="input input-text">
				</div>
				<div class="form-input">
					<span class="name">&nbsp</span>
					<div class="image-container">
						<img :src="'./image/beijing.png'" alt="">
					</div>
				</div>
			</div>
			<div>
				<div class="button-group">
					<router-link class="btn white" :to="{name:'m-cfitem-detail'}">返回</router-link>
					<a class="btn blue" @click="showModal = true">提交</a>
				</div>
			</div>
		</div>
		<modal v-if="showModal" @close="complete">
			<p slot="body" style="text-align:center;">发标成功</p>
		</modal>
	</div>
</template>
<script>
	import router from '~/router.js'
	import {CFRaisePlaceholder} from '~/vuex/crowdfunding.js' 
	//import {getCrowdfundingTagList} from '~/get.js'

	import inputSelect from '~/components/inputs/input-select.vue'
	import inputText from '~/components/inputs/input-text.vue'
	import inputTextarea from '~/components/inputs/input-textarea.vue'
	import inputImage from '~/components/inputs/input-image.vue'
	import Modal from '~/components/modal.vue'


	import {
		getProvinceList, 
		getCityList
	} from '~/ajax/get.js'

	export default {
		data(){
			return {
				leadOptions: [{
					name: '是',value: '2'
				},{
					name: '否', value: '1'
				}],
				showModal: false
			}
		},
		computed: {
			params(){
				return store.getters.CFParams || CFRaisePlaceholder()
			}
		},
		components: {
			'input-select': inputSelect,
			'input-text': inputText,
			'input-textarea': inputTextarea,
			'input-image': inputImage,
			'modal': Modal
		},
		methods: {
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
			getProvinceList, 
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