<template>
	<div>hehe</div>
</template>
<script>
	// export default {
	// 	data(){
	// 		params: {

	// 		}	
	// 	}
	// }

	/*
		<div>
			<div class="header-bar">
				<ol class="breadcrumb">
					<li class="item">P2P</li>
					<li class="item">发标操作</li>
				</ol>
			</div>
			<div class="form-page" v-if="showPage">
				<div>
					<div class="form-title">
						<h1>类型选择</h1>
					</div>
					<div class="form-input">
						<span class="name">类型：</span>
						<span class="input">{{params.tag_id}}</span>
					</div>
				</div>
				<div>
					<div class="form-title">
						<h1>基本信息</h1>
					</div>
					<div class="form-input">
						<span class="name">姓名：</span>
						<span class="input">{{params.username}}</span>
					</div>
					<div class="form-input">
						<span class="name">姓别：</span>
						<span class="input">{{params.gender}}</span>
					</div>
					<div class="form-input">
						<span class="name">年龄：</span>
						<span class="input">{{params.age}}</span>
					</div>
					<div class="form-input">
						<span class="name">职业：</span>
						<span class="input">{{params.job}}</span>
					</div>
					<div class="form-input">
						<span class="name">手机号码：</span>
						<span class="input">{{params.phone}}</span>
					</div>
					<div class="form-input">
						<span class="name">地区：</span>
						<span class="input">{{params.block}}</span>
					</div>
				</div>
				<div>
					<div class="form-title">
						<h1>借款信息</h1>
					</div>
					<div class="form-input">
						<span class="name">项目名称：</span>
						<span class="input">{{params.name}}</span>
					</div>
					<div class="form-input">
						<span class="name">风险要求：</span>
						<span class="input">{{params.request}}</span>
					</div>
					<div class="form-input">
						<span class="name">还款方式：</span>
						<span class="input">{{params.repay_type}}</span>
					</div>
					<div class="form-input">
						<span class="name">利息偿付：</span>
						<span class="input">{{params.rate}}</span>
						<span>%</span>
					</div>
					<div class="form-input">
						<span class="name">借款金额：</span>
						<span class="input">{{params.money}}</span>
						<span>万元</span>
					</div>
					<div class="form-input">
						<span class="name">大写：</span>
						<span class="input">{{params.money | transferMoney}}</span>
					</div>
					<div class="form-input">
						<span class="name">借款期限：</span>
						<span class="input">{{params.loan_time}}</span>
					</div>
					<div class="form-input">
						<span class="name">借款说明：</span>
						<span class="input">{{params.detail}}</span>
					</div>
				</div>
				<div>
					<div class="form-title">
						<h1>认证信息</h1>
					</div>
					<div v-for="(proof_, index) in params.proof">
						<div class="form-input">
							<span class="name">认证名称：</span>
							<span class="input">{{proof_.name}}</span>
						</div>
						<div class="form-input">
							<span class="name">&nbsp;</span>
							<div class="img-container">
								<img :src="proof_.detail">
							</div>
						</div>
					</div>
				</div>
				<div>
					<div class="form-title">
						<h1>还款计划</h1>
					</div>
					<div class="form-table">
						<table class="table">
							<thead style="text-align:left">
								<tr>
									<th>时间</th>
									<th>总额</th>
									<th>本金</th>
									<th>利息</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="cal in calrets">
									<td>{{cal.order}}</td>
									<td>{{cal.pAndI}}</td>
									<td>{{cal.p}}</td>
									<td>{{cal.i}}</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div>
					<div class="button-group">
						<router-link class="btn white" :to="{name:'m-p2praise'}">返回</router-link>
					</div>
				</div>
			</div>
		</div>
	*/
</script>