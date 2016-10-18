<template>
	<a class="btn-back f6" @click="back">
		返回
	</a>
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
	.btn-back{
		padding: 9px 49px;
		background-color:#419bf9;
		color: #fff;
		border-radius:4px;
	}
</style>