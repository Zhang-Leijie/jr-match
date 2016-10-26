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
					<a class="tag-item blue" @click="typeFilter=1">全部</a>
					<a class="tag-item square red" @click="typeFilter=5">车</a>
					<a class="tag-item square purple" @click="typeFilter=2">房</a>
					<a class="tag-item square blue" @click="typeFilter=3">薪</a>
					<a class="tag-item square orange" @click="typeFilter=4">企</a>
				</div>
				<div class="filter-row">
					<span class="name">还款方式：</span>
					<a class="tag-item blue" @click="payFilter=4">全部</a>
					<a class="tag-item" @click="payFilter=1">按月付息一次性还本</a>
					<a class="tag-item" @click="payFilter=2">一次性还本付息</a>
					<a class="tag-item" @click="payFilter=3">每月等额本息</a>
				</div>
				<div class="filter-row">
					<span class="name">投资期限：</span>
					<a class="tag-item blue" @click="monthFilter=0">全部</a>
					<a class="tag-item" @click="monthFilter=1">1个月</a>
					<a class="tag-item" @click="monthFilter=3">3个月</a>
					<a class="tag-item" @click="monthFilter=6">6个月</a>
					<a class="tag-item" @click="monthFilter=9">9个月</a>
					<a class="tag-item" @click="monthFilter=12">12个月</a>
					<a class="tag-item" @click="monthFilter=24">24个月</a>
				</div>
			</div>
			<h1 class="p2p-panel-title">剩余资金：<span>{{amount}}</span></h1>
			<div class="p2p-table">
				<div class="p2p-row" v-for="investLint in result">
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
								<span>{{investLint.name}}</span><span class="tag-item square" v-bind:class="{red:investLint.tag_id==5,purple:investLint.tag_id==2,blue:investLint.tag_id==3,orange:investLint.tag_id==4}">{{investLint.tag}}</span>
							</div>
						</div>
					</div>
					<div class="p2p-item">
						<div class="p2p-inline-item">
							<h3 class="p2p-item-title">借款金额</h3>
							<div class="p2p-item-content">
								<span class="red-text">￥{{investLint.money}}</span>
							</div>
						</div>	
					</div>
					<div class="p2p-item">
						<div class="p2p-inline-item">
							<h3 class="p2p-item-title">年化利率</h3>
							<div class="p2p-item-content">
								<span class="red-text">{{investLint.rate}}</span>/年
							</div>
						</div>
					</div>
					<div class="p2p-item">
						<div class="p2p-inline-item">
							<h3 class="p2p-item-title">借款期限/收益方式</h3>
							<div class="p2p-item-content">
								<span>{{investLint.loan_time}}个月/{{investLint.repay_type}}</span>
							</div>
						</div>
					</div>
					<div class="p2p-item">
						<div class="p2p-inline-item">
							<h3 class="p2p-item-title">项目进度</h3>
							<div class="p2p-item-content">
								<div class="progress-bar">
									<div class="inline" :style="{width:investLint.schedule}"></div>
								</div>
								<span class="progress-text">{{investLint.schedule}}</span>
							</div>
						</div>
					</div>
					<div class="p2p-item">
						<div class="p2p-inline-item">
							<router-link class="btn blue" :to="{name: 'm-p2pbid-detail',params:{id:investLint.id}}">我要投资</router-link>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import router from '~/router.js'
	import {InvestLists} from '~/ajax/get.js'

	export default {
		data(){
			return{
				amount:'',
				investLints:[],
				typeFilter: "1",
				payFilter:'4',
				monthFilter:'0'
			}
		},
		computed: {
			result(){
				var self = this
				return this.investLints.filter(function(item){
					if (self.typeFilter == "1") {
						return true
					} else {
						return item.tag_id == self.typeFilter
					}
				}).filter(function(item){
					if (self.payFilter == "4") {
						return true
					} else {
						return item.repay_type_id == self.payFilter
					}
				}).filter(function(item){
					if (self.monthFilter == "0") {
						return true
					} else {
						return item.loan_time == self.monthFilter
					}
				})
			}
		},
		mounted:function(){
			var self = this
			InvestLists({

			}).then((res) => {
				self.investLints = res.list
				self.amount = res.rest_money

			})
		}
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