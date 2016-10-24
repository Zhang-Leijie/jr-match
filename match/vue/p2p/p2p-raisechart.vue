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
					<router-link class="btn blue" :to="{name:'m-p2praisedetail'}">查看资料</router-link>
				</div>
				<div class="form-input">
					<span class="name">类型：</span>
					<input-select :getOptions="getP2PTag" @select-result-change="getTagId"></input-select>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>基本信息</h1>
				</div>
				<div class="form-input">
					<span class="name">姓名：</span>
					<input type="text" placeholder="5个字以内" class="input input-text" v-model="params.name">
				</div>
				<div class="form-input">
					<span class="name">姓别：</span>
					<input-select :getOptions="getGenderOptions" @select-result-change="getGender"></input-select>
				</div>
				<div class="form-input">
					<span class="name">职业：</span>
					<input type="text" class="input input-text">
				</div>
				<div class="form-input">
					<span class="name">手机号码：</span>
					<input type="text" class="input input-text">
				</div>
				<div class="form-input">
					<span class="name">地区：</span>
					<select class="input-select input">
						<option value="">1</option>
						<option value="">2</option>
					</select>
					<select class="input-select input">
						<option value="">a</option>
						<option value="">b</option>
					</select>
				</div>
			</div>
			<div>
				<div class="form-title">
					<h1>借款信息</h1>
				</div>
				<div class="form-input">
					<span class="name">项目名称：</span>
					<input type="text" class="input input-text">
				</div>
				<div class="form-input">
					<span class="name">风险要求：</span>
					<select class="input-select input">
						<option value="">1</option>
						<option value="">2</option>
					</select>
				</div>
				<div class="form-input">
					<span class="name">还款方式：</span>
					<select class="input-select input">
						<option value="">1</option>
						<option value="">2</option>
					</select>
				</div>
				<div class="form-input">
					<span class="name">利息偿付：</span>
					<select class="input-select input">
						<option value="">1</option>
						<option value="">2</option>
					</select>
				</div>
				<div class="form-input">
					<span class="name">借款金额：</span>
					<input type="text" class="input input-text">
					<span>万元</span>
				</div>
				<div class="form-input">
					<span class="name">大写：</span>
					<input type="text" class="input input-text">
				</div>
				<div class="form-input">
					<span class="name">借款期限：</span>
					<select class="input-select input">
						<option value="">1</option>
						<option value="">2</option>
					</select>
				</div>
				<div class="form-input">
					<span class="name">发布期限：</span>
					<select class="input-select input">
						<option value="">1</option>
						<option value="">2</option>
					</select>
				</div>
				<div class="form-input">
					<span class="name">借款说明：</span>
					<textarea class="input input-textarea"></textarea>
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
					<router-link class="btn white" :to="{name:'m-p2praisedetail'}">返回</router-link>
					<a class="btn blue">提交</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import inputSelect from '~/components/inputs/input-select.vue'
	import {getP2PTag} from '~/ajax/get_y.js'

	export default {
		data(){
			return {
				params: {
					tag_id: "",
					gender: "",
					name: ""
				}
			}
		},
		methods: {
			getP2PTag,
			getTagId(option){
				return this.params.tag_id = option && option.id
			},
			getGenderOptions(){
				return Promise.resolve([
					{name: '男'},
					{name: '女'}
				])
			},
			getGender(option){
				return this.params.gender = gender && gender.name
			}
		},
		components: {
			'input-select': inputSelect
		}
	}
</script>