<template>
	<div>
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">P2P</li>
				<li class="item">投标操作</li>
			</ol>
			<p class="remain-time">剩余时间：<span>30分00秒</span></p>
		</div>
		<div class="p2p-page">
			<router-link :to="{name: 'm-index'}" class="btn-back blue">返回</router-link>
			<div class="filter-box">
				<div class="filter-row">
					<span class="name">项目类型：</span>
					<a class="tag-item blue">全部</a>
					<a class="tag-item square red">车</a>
					<a class="tag-item square purple">房</a>
					<a class="tag-item square blue">薪</a>
					<a class="tag-item square orange">企</a>
				</div>
				<div class="filter-row">
					<span class="name">还款方式：</span>
					<a class="tag-item blue">全部</a>
					<a class="tag-item">按月付息一次性还本</a>
					<a class="tag-item">一次性还本付息</a>
					<a class="tag-item">每月等额本息</a>
				</div>
				<div class="filter-row">
					<span class="name">投资期限：</span>
					<a class="tag-item blue">全部</a>
					<a class="tag-item">1个月</a>
					<a class="tag-item">3个月</a>
					<a class="tag-item">6个月</a>
					<a class="tag-item">9个月</a>
					<a class="tag-item">12个月</a>
					<a class="tag-item">24个月</a>
				</div>
			</div>
			<h1 class="p2p-panel-title">剩余资金：<span>100万</span></h1>
			<div class="p2p-table">
				<div class="p2p-row" v-for="i in 10">
					<div class="p2p-item">
						<div class="p2p-inline-item">
							<div class="img-container">
								<img :src="'./image/touxiang@2x.png'" alt="">
							</div>
						</div>
					</div>
					<div class="p2p-item">
						<div class="p2p-inline-item">
							<h3 class="p2p-item-title">项目名称/类型</h3>
							<div class="p2p-item-content">
								<span>财富汇</span><span class="tag-item square red">车</span>
							</div>
						</div>
					</div>
					<div class="p2p-item">
						<div class="p2p-inline-item">
							<h3 class="p2p-item-title">借款金额</h3>
							<div class="p2p-item-content">
								<span class="red-text">￥5,000.00</span>
							</div>
						</div>	
					</div>
					<div class="p2p-item">
						<div class="p2p-inline-item">
							<h3 class="p2p-item-title">年化利率</h3>
							<div class="p2p-item-content">
								<span class="red-text">6.10%</span>/年
							</div>
						</div>
					</div>
					<div class="p2p-item">
						<div class="p2p-inline-item">
							<h3 class="p2p-item-title">借款期限/收益方式</h3>
							<div class="p2p-item-content">
								<span>3个月/按天计息到期</span>
							</div>
						</div>
					</div>
					<div class="p2p-item">
						<div class="p2p-inline-item">
							<h3 class="p2p-item-title">项目进度</h3>
							<div class="p2p-item-content">
								<div class="progress-bar">
									<div class="inline" :style="{width:i*10+'%'}"></div>
								</div>
								<span class="progress-text">{{i*10}}%</span>
							</div>
						</div>
					</div>
					<div class="p2p-item">
						<div class="p2p-inline-item">
							<router-link class="btn blue" :to="{name: 'm-p2pbid-detail'}">我要投资</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		
	}
</script>
<style lang="less">
	.p2p-page {
		padding: 0px 40px;
		margin-bottom: 20px;
		.high-table {
		}
	}

	.p2p-panel-title {
		background:#f8f9fe;
		box-shadow:0px -1px 0px 0px #e6e5ff;
		line-height:1.2;
		padding: (40px - 28px * 1.2)/2 20px;
		font-size: 28px;
		color: #419bf9;
	}

	.p2p-table {
		display: table;
		width: 100%;
		table-layout: fixed;
		border-collapse: collapse;
		position: relative;

	}
	.p2p-row {
		display: table-row;

		border-bottom: 1px solid #e0e0e0;
	}
	.p2p-item {
		display: table-cell;
		vertical-align: middle;
		padding-bottom: 20px;

		&:first-child {
			width: 100px;
		}

		&:nth-child(5) {
			width: 18%;
		}

		+ .p2p-item {

			> .p2p-inline-item {
				border-left: 1px solid #eee;
				padding-left: 20px;
			}
		}
	}

	.p2p-inline-item {
		display: block;
		margin-top: 20px;
		margin-left: 20px;

		> .img-container {
			width: 77px;
			height: 77px;

			> img {
				max-width: 77px;
				max-height: 77px;				
			}
		}

		> .p2p-item-title {
			font-size:12px;
			color:#999999;
			text-align:left;
			padding: 10px 0;
		}

		> .p2p-item-content {
			padding-bottom: 15px;
			font-size: 14px;
			word-break: break-all;
			> .tag-item {
				margin: 0 10px;
			}
		}
	}
</style>