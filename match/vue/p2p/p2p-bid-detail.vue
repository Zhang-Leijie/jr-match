<template>
	<div>
		<time-remain type="p2pBid" @time-set="getData"></time-remain>

		<div class="p2p-detail-page">
			<router-link :to="{name: 'm-p2pbid'}" class="btn-back blue">返回</router-link>
			<div class="p2p-detail-panel">
				<div class="panel-left">
					<div class="avatar-image">
						<img :src="'./image/touxiang@2x.png'" alt="">
					</div>
					<div class="line">
						<div class="title">项目标签</div>
						<div class="content"><span class="tag-item square" style="overflow:hidden" v-bind:class="{red:baseinfo.tag_id==5,purple:baseinfo.tag_id==2,blue:baseinfo.tag_id==3,orange:baseinfo.tag_id==4}">{{baseinfo.tag}}</span></div>
					</div>
					<div class="line">
						<div class="title">投资期限</div>
						<div class="content">{{baseinfo.loan_time}}个月</div>
					</div>
					<div class="line">
						<div class="title">年化收益</div>
						<div class="content">{{baseinfo.rate}}/年（{{baseinfo.mrate}}/月）</div>
					</div>
					<div class="line">
						<div class="title">资金进度</div>
						<div class="content">
							<div class="progress-bar">
								<span class="inline" :style="{width:baseinfo.schedule}"></span>
							</div>
							<span class="progress-text">{{baseinfo.schedule}}</span>
						</div>
					</div>
					<div class="line">
						<div class="title">借款总额</div>
						<div class="content">{{baseinfo.x}}/{{baseinfo.y}}</div>
					</div>
					<div class="line" v-if="baseinfo.id!==undefined">
						<!-- <router-link class="btn blue" :to="{name:'m-p2pbid-invest',params:{id:baseinfo.id}}">我要投资</router-link> -->
						<a class="btn blue" @click="toInvest">我要投资</a>
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
									<span class="content">{{baseinfo.name}}</span>
								</div>
								<div class="line">
									<span class="title">投资条件</span>
									<span class="content">{{baseinfo.mark_name}}</span>
								</div>
								<div class="line">
									<span class="title">发布时间</span>
									<span class="content">{{baseinfo.publish_time}}</span>
								</div>
								<div class="line">
									<span class="title">起息日</span>
									<span class="content">项目发起成功时</span>
								</div>
								<div class="line">
									<span class="title">还款方式</span>
									<span class="content">{{baseinfo.repay_type}}</span>
								</div>
								<div class="line wide">
									<span class="title">借款信息</span>
									<p class="content">适用于学生操作，学生注册登录，经过各项信息认证后，绑定银行卡，银行卡内有由后台统一发放的初始资金，可用于投标和支持众筹，后台设置多家银行卡，学生可以选择银行申请办卡，自动批准，但限制张在三张之内，且一家银行只能办一次；除首次统一分配的银行卡由初始资金，其余银行申请资金为0</p>
								</div>
								<table class="table">
									<thead>
										<tr style="text-align:left">
											<th>期数</th>
											<th>每期还款本息</th>
											<th>每期还款本金</th>
											<th>每期还款利息</th>
											<th>余额</th>
										</tr>
									</thead>
									<tbody>
										<tr v-for="term in back.terms">
											<td>{{term.qs}}</td>
											<td>{{term.emTotal}}</td>
											<td>{{term.em}}</td>
											<td>{{term.lx}}</td>
											<td>{{term.restTotal}}</td>
										</tr>
									</tbody>
								</table>
							</div>
							<div class="tab-content" v-if="tab_index==1">
								<div class="pack">
									<h3 class="title">基本信息：</h3>
									<div class="line">
										<span class="title">法人名称</span>
										<span class="content">{{baseinfo.username}}</span>
									</div>
									<div class="line">
										<span class="title">职业</span>
										<span class="content">{{baseinfo.job}}</span>
									</div>
									<div class="line">
										<span class="title">年龄</span>
										<span class="content">{{baseinfo.age}}</span>
									</div>
									<div class="line">
										<span class="title">地区</span>
										<span class="content">{{baseinfo.block}}</span>
									</div>
								</div>
								<div class="pack">
									<h3 class="title">认证资料：</h3>
									<div class="line" v-for = "pro in proof">
										<span class="title">{{pro.proof_name}}</span>
										<span class="content">
											<i class="flaticon-check icon-blue"></i>
										</span>
									</div>
									<!-- <div class="line">
										<span class="title">个人信用报告</span>
										<span class="content">
											<i class="flaticon-check icon-blue"></i>
										</span>
									</div> -->
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<modal v-if="showModal">
			<p slot="body" class='f8' style="text-align:center;margin-top:30px;">已投资该项目</p>
			<p slot="footer" style="text-align:center;">
				<a class="btn blue" @click="close">确认</a>
			</p>
		</modal>
	</div>
</template>
<script>
	
	import {InvestInfo} from '~/ajax/get.js'
	import router from '~/router.js'
	import Modal from '~/components/modal.vue'

	export default {
		data(){
			return {
				showModal:false,
				tab_index: 0,
				baseinfo:'',
				back:'',
				proof:''
			}
		},
		methods:{
			getData(){
				var self = this
				InvestInfo({
					id:self.$route.params.id,
				}).then((res) => {
					self.baseinfo = res.baseinfo
					self.back = res.back
					self.proof = res.proof
				})
			},
			toInvest(){
				var self = this
				if (self.baseinfo.isinvest==1) {
					router.push({name: 'm-p2pbid-invest',params:{id:self.$route.params.id}})
				}
				else{
					self.showModal = true
				}
			},
			close(){
				var self = this
				self.showModal = false
			}
		},
		components: {
			'modal': Modal
		},
		filters:{
			changetime(time){
				return new Date(parseInt(time) * 1000).toLocaleString().substr(0,9)
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