<template>
	<div>
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">P2P</li>
				<li class="item">投标操作</li>
			</ol>
			<p class="remain-time">剩余时间：<span>30分00秒</span></p>
		</div>
		<div class="p2p-detail-page">
			<router-link :to="{name: 'm-p2pbid'}" class="btn-back blue">返回</router-link>
			<div class="p2p-detail-panel">
				<div class="panel-left">
					<div class="avatar-image">
						<img :src="'./image/touxiang@2x.png'" alt="">
					</div>
					<div class="line">
						<div class="title">项目标签</div>
						<div class="content"><span class="tag-item purple square">房</span></div>
					</div>
					<div class="line">
						<div class="title">投资期限</div>
						<div class="content">3个月</div>
					</div>
					<div class="line">
						<div class="title">年化收益</div>
						<div class="content">8.8%/年（0.74%/月）</div>
					</div>
					<div class="line">
						<div class="title">资金进度</div>
						<div class="content">
							<div class="progress-bar">
								<span class="inline" style="width:20%"></span>
							</div>
							<span class="progress-text">20%</span>
						</div>
					</div>
					<div class="line">
						<router-link class="btn blue" :to="{name: 'm-p2pbid-invest'}">我要投资</router-link>
					</div>
				</div>
				<div class="panel-right">
					<div class="tabs">
						<div class="tabs-head">
							<a class="tab-name" :class="{active: tab_index==0}" @click="tab_index=0">项目信息</a>
							<a class="tab-name" :class="{active: tab_index==1}" @click="tab_index=1">借款人信息</a>
						</div>
						<div class="tabs-content">
							<div class="tab-content" v-if="tab_index==0">
								<div class="line">
									<span class="title">项目名</span>
									<span class="content">理财宝</span>
								</div>
								<div class="line">
									<span class="title">投资条件</span>
									<span class="content">“保守型”风险承受能力及以上</span>
								</div>
								<div class="line">
									<span class="title">发布时间</span>
									<span class="content">2016.01.01</span>
								</div>
								<div class="line">
									<span class="title">起息日</span>
									<span class="content">项目发起成功时</span>
								</div>
								<div class="line">
									<span class="title">还款方式</span>
									<span class="content">每月等额本息</span>
								</div>
								<div class="line wide">
									<span class="title">借款信息</span>
									<p class="content">适用于学生操作，学生注册登录，经过各项信息认证后，绑定银行卡，银行卡内有由后台统一发放的初始资金，可用于投标和支持众筹，后台设置多家银行卡，学生可以选择银行申请办卡，自动批准，但限制张在三张之内，且一家银行只能办一次；除首次统一分配的银行卡由初始资金，其余银行申请资金为0</p>
								</div>
								<table class="table">
									<thead>
										<tr>
											<th>期数</th>
											<th>每期还款本息</th>
											<th>每期还款本金</th>
											<th>利息</th>
											<th>余额</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="i in 5">
											<td>1</td>
											<td>10</td>
											<td>XXX</td>
											<td>0.5%</td>
											<td>10000</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="tab-content" v-if="tab_index==1">
								<div class="pack">
									<h3 class="title">基本信息：</h3>
									<div class="line">
										<span class="title">姓名</span>
										<span class="content">朱林峰</span>
									</div>
									<div class="line">
										<span class="title">职业</span>
										<span class="content">农民工</span>
									</div>
									<div class="line">
										<span class="title">年龄</span>
										<span class="content">31</span>
									</div>
									<div class="line">
										<span class="title">地区</span>
										<span class="content">杭州市</span>
									</div>
								</div>
								<div class="pack">
									<h3 class="title">认证资料：</h3>
									<div class="line">
										<span class="title">身份证</span>
										<span class="content">
											<i class="flaticon-check icon-blue"></i>
										</span>
									</div>
									<div class="line">
										<span class="title">个人信用报告</span>
										<span class="content">
											<i class="flaticon-check icon-blue"></i>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				tab_index: 0
			}
		}
	}
</script>
<style lang="less">
	.p2p-detail-page {
		padding: 0 40px;
		padding-bottom: 40px;
	}
	.p2p-detail-panel {
		
		position: relative;

		> * {
			background:#ffffff;
			border:1px solid #e0e0e0;
			box-shadow:0px 0px 10px 0px rgba(0,0,0,0.10);
		}
	}

	.panel-left {
		position: absolute;
		top: 0;
		left: 0;
		width: 280px;
		height: 100%;

		> .avatar-image {
			display: block;
			margin: 40px auto;
		}
		
		padding: 0 20px;
		> .line {
			display: table;
			width: 100%;
			
			margin-bottom: 15px;

			> * {
				display: inline-block;
				vertical-align: middle;
			}
			> .title {
				width: 35%;
				text-align: right;
				font-size: 16px;
				color: #333;
				&:after {
					content: "："
				}
			}
			> .content {
				font-size: 14px;
				color: #666;
			}

			> .btn {
				margin: 40px auto;
				display: block;
				width: 130px;
			}
		}
	}
	

	.panel-right {
		margin-left: 300px;
		min-height: 567px;

		padding-left: 20px;
		padding-right: 20px;

		.tab-content {
			padding:20px;
			.line {
				width: 50%;
				float:left;
				margin-bottom:10px;
				
				font-size:16px;
				color:#333333;

				> .title {
					&:after {
						content: "："
					}
				}
				&.wide {
					width: 100%;
					
					> .title {
						margin-bottom: 10px;
					}
					> .content {
						font-size:14px;
						color:#666666;
						margin-bottom: 20px;
					}
				}
			}

			> .table {
				margin-left: -20px;
				margin-right: -20px;
			}

			> .pack {
				
				+ .pack {
					padding-top: 5px;
				}

				> .title {
					font-size:16px;
					color:#333333;
					margin-bottom: 15px;
				}

				&:after {
					display: table;
					content: "";
					clear: both;
				}
			}
		}		
	}


</style>