<template>
	<div>
		<time-remain type="cfRaise" :canset="true" @time-set="getData"></time-remain>
		<div class="crowdfunding-design">
			<table class="high-table">
				<thead>
					<tr>
						<th>项目信息</th>
						<th style="width:20%;">得分</th>
						<th style="width:100px;">操作</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="cf in cfList">
						<td class="crowdfunding-item">
							<div class="image-container">
								<img :src="'./image/shangpintupian@2x.png'" alt="">
							</div>
							<span>{{cf.name}}</span>
						</td>
						<td>{{cf.score ? cf.score : '未评分'}}</td>
						<td v-if="cf.isfinished==1"><router-link :to="{name: 'm-cfitem-detail', query: { id: cf.id }}">去完成</router-link></td>
						<td v-if="cf.isfinished==2"><router-link :to="{name: 'm-cfitem-check', query: { id: cf.id, relation_id: cf.relation_id }}">查看</router-link></td>
					</tr>
				</tbody>
			</table>
			<div class="button-group">
				<router-link :to="{name: 'm-index'}" class="btn blue">返回</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	import {Lists} from '~/ajax/get.js'

	export default {
		data(){
			return {
				cfList: []
			}
		},
		methods: {
			getData(){
				Lists({
					type: 2
				}).then((res) => {
					this.cfList = res
				})
			}
		}
	}
</script>
<style lang="less">
	.crowdfunding-design {
		margin-left: 40px;
		margin-right: 40px;
		margin-top: 10px;

		> .high-table {
			td:not(:first-child) {
				text-align: center;
			}
		}

		.button-group {
			margin-top: 20px;
		}
	}
	
	.crowdfunding-item {
		padding-left: 110px;
		position: relative;

		> .image-container {
			position: absolute;
			top: 20px;
			left: 0;
			width: 100px;
			height: 100px;

			> img {
				max-width: 100px;
				max-height: 100px;
			}
		}
	}
</style>