<template>
	<div style="min-width:1200px;">
		<div class='obj'>
			<a class="btn blue" style="margin-right:20px;margin-bottom:20px;">单项选择</a> 
			<a class="btn blue" style="margin-right:20px;">多项选择</a> 
			<a class="btn blue">判断题</a>
			<div class="obj-table">
				<div class="item" v-for="n in 50">{{n}}</div>
			</div>
			<div class="obj-box">
				
			</div>
		</div>
	</div>
</template>
<style lang="less">
.obj{
	width: 100%;
	padding: 70px 40px;
	.obj-table{
		width: 100%;
		border-top: 1px solid #4198f9;
		border-left: 1px solid #4198f9;
		.item{
			font-size: 20px;
			cursor: pointer;
			cursor: pointer;
			display: inline-block;
			width: 5%;
			height: 40px;
			text-align: center;
			line-height: 40px;
			border-right: 1px solid #4198f9;
			border-bottom: 1px solid #4198f9;
		}
	}
	.obj-box{
		width: 100%;
	}
}
</style>