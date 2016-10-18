<template>
	<div class="back relative" @click="back">
		<i class="flaticon-left-arrow"></i><span class="absolute" style="top:0px;left:25px">返回</span>
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
	.back{
		margin-left: 40px;
		cursor: pointer;
		width: 60px;
		color: #fff;
		line-height: 40px;
	}
	.flaticon-left-arrow:before{
		margin-left: 0px;
	}
</style>