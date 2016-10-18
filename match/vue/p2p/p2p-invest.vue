<template>
	<div class="raise backimg absolute" style="background-image:url('image/beijing.png');">
		<back-link></back-link>
		<div style="width:100%;padding:0px 40px">
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
	.header{
		padding: 0px 40px;
		width: 100%;
		height: 50px;
		top: 0px;
		background:rgba(255, 255, 255, 0.6);
		line-height: 50px;
		.time{
			top: 0px;
			right: 40px;
		}
	}
	.raise{
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		min-width: 1200px;
		padding: 70px 0px;
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