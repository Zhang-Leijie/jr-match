<template>
	<div>
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">众筹</li>
				<li class="item">项目设计</li>
			</ol>
			<p class="remain-time">剩余时间：<span>30分00秒</span></p>
		</div>
		<div class="form-page">
			<div>
				<div class="form-title">
					<h1>项目信息</h1>
					<router-link class="btn blue" :to="{name:'m-cfitem-detail'}">查看资料</router-link>
				</div>
				<div class="form-input">
					<span class="name">标签：</span>
					<div class="input-tag" v-for="i in 4">
						<input type="radio" :id="'tag'+i" name="tag_1">
						<label :for="'tag'+i">标签{{i}}</label>
					</div>
				</div>
				<div class="form-input">
					<span class="name">项目名称：</span>
					<select class="input-select input">
						<option value="">1</option>
						<option value="">2</option>
					</select>
				</div>
				<div class="form-input">
					<span class="name">项目简介：</span>
					<textarea class="input input-textarea"></textarea>
				</div>
				<div class="form-input">
					<span class="name">所在城市：</span>
					<select class="input-select input">
						<option value="">1</option>
						<option value="">2</option>
					</select>
					<select class="input-select input">
						<option value="">a</option>
						<option value="">b</option>
					</select>
				</div>
				<div class="form-input">
					<span class="name">是否领头：</span>
					<div class="input-radio" v-for="i in 2">
						<input type="radio" :id="'tag_'+i" name="tag_2">
						<label :for="'tag_'+i">标签{{i}}</label>
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
					<h1>发起者信息</h1>
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
					<router-link class="btn white" :to="{name:'m-cfitem-detail'}">返回</router-link>
					<a class="btn blue" @click="showModal = true">提交</a>
				</div>
			</div>
		</div>
		<modal v-if="showModal" @close="showModal = false"></modal>
	</div>
</template>
<script>
	import Modal from '~/components/modal.vue'

	export default {
		data(){
			return {
				showModal: false
			}
		},
		components: {
			'modal': Modal
		},
		events: {
			close(){
				this.showModal = false
			}
		}
	}
</script>