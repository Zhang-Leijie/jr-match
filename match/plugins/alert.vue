<template>
	<transition-group tag="div" class="xy-alert-container" name="alert">
		<div class="xy-alert-message" :class="type" v-for="(message, index) in messages" :key="index">{{message}}</div>
	</transition-group>
</template>
<script>
	export default {
		data(){
			return {
				messages: []
			}
		},
		props: {
			position: {
				required: false
			},
			type: {
				required: false
			}
		}
	}
</script>
<style lang="less">
	.xy-alert-container {
		position: fixed;
		left: 0px;
		right: 0px;
		bottom: 0px;
	}

	.xy-alert-message {
		padding-top: 10px;
		padding-bottom: 10px;

		text-align: center;

		margin: 0px auto 10px;

		border-radius: 4px;
		width: 200px;
		background-color: lighten(#62cb31, 2%);
		color: #fff;
	}

	.alert-enter-active, .alert-leave-active {
	  transition: all 1s;
	}
	.alert-enter, .alert-leave-active {
	  opacity: 0;
	  transform: translateY(30px);
	}

	.alert-move {
	  transition: transform 0.3s;
	}
</style>