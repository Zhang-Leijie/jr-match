<template>
	<div>
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">众筹</li>
				<li class="item">项目设计</li>
			</ol>
			<p class="remain-time">剩余时间：<span>30分00秒</span></p>
		</div>
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
					<tr>
						<td class="crowdfunding-item">
							<div class="image-container">
								<img :src="'./image/shangpintupian@2x.png'" alt="">
							</div>
							<span>SOCO城市锂电跨骑车</span>
						</td>
						<td>11050</td>
						<td><router-link :to="{name: 'm-cfitem-detail'}">去完成</router-link></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
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