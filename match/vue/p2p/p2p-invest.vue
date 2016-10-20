<template>
	<div class="raise backimg absolute" style="background-image:url('image/beijing.png');">
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">P2P</li>
				<li class="item">审标操作</li>
			</ol>
			<p class="remain-time">剩余时间：<span>30分00秒</span></p>
		</div>
		<div style="width:1200px;margin:20px auto 0px;">
			<router-link  :to="{name:'m-index'}">
				<div class="back relative">
					<i class="flaticon-left-arrow"></i><span class="absolute" style="top:0px;left:25px">返回</span>
				</div>
			</router-link>
			<div style="width:100%;">
				<div class="table-box">
					<table class="ne-table">
						<thead>
							<th>编号</th>
							<th style="width:40%">名称</th>
							<th>得分</th>
							<th>操作</th>
						</thead>
						<tbody>
							<tr>
								<td>1</td>
								<td>名称内容</td>
								<td>未评分</td>
								<td><router-link :to="{name: 'm-p2pinvestdetail'}">去完成</router-link></td>
							</tr>
							<tr>
								<td>2</td>
								<td>名称内容</td>
								<td>80</td>
								<td>查看</td>
							</tr>
							<tr>
								<td>3</td>
								<td>名称内容</td>
								<td>未评分</td>
								<td>去完成</td>
							</tr>
							<tr>
								<td>4</td>
								<td>名称内容</td>
								<td>未评分</td>
								<td>去完成</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		methods: {
			back(){
				if (this.route) {
					this.route()
				} else {
					window.history.go(-1)
				}
			}
		}
	}
</script>
<style lang="less">
	.raise{
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		min-width: 1200px;
		width: 100%;
	}
	.back{
		cursor: pointer;
		width: 60px;
		color: #fff;
		line-height: 40px;
	}
	.table-box{
		width: 100%;
		margin: 10px auto 0px;
		min-height: 560px;
		background:rgba(255, 255, 255, 0.6);
	}
	.flaticon-left-arrow:before{
		margin-left: 0px;
	}
</style>