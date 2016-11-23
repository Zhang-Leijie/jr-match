<template>
	<div>
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">众筹</li>
				<li class="item">公益设计</li>
			</ol>
		</div>
		<div class="crowdfunding-design">
			<table class="high-table">
				<thead>
					<tr style="text-align:left">
						<th>项目信息</th>
						<th style="width:20%;">微信得票</th>
						<th style="width:100px;">得分</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="crowdfunding-item">
							<div class="image-container">
								<img :src="'./image/shangpintupian@2x.png'" alt="">
							</div>
							<span>{{info.name}}</span>
						</td>
						<td>{{info.votes}}</td>
						<td>{{info.score}}</td>
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
	import {CrowdfundingcInfo} from '~/ajax/get.js'

	export default {
		data(){
			return {
				info: ''
			}
		},
		mounted(){
			CrowdfundingcInfo({
			}).then((res) => {
				this.info = res
			})
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