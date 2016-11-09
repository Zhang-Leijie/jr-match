<template>
	<div class="setup-page background-image">
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">创新创业</li>
				<li class="item">创业新天地</li>
			</ol>
		</div>
		<div class="setup-main">
			<carousel :imgs="photo"></carousel>
			<p class="text-content" v-html="text"></p>
			<div class="button-group">
				<router-link class="btn blue" :to="{name:'m-index'}">返回</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	import Carousel from '~/components/carousel.vue'
	import {unescapeHTML} from '~/utils.js'
	import {getCreativeField} from '~/ajax/get.js'

	export default {
		data(){
			return {
				text: "",
				photo: []
			}
		},
		components: {
			'carousel': Carousel
		},
		mounted(){
			getCreativeField().then((res) => {
				this.text = unescapeHTML(res.text) 
				this.photo = res.photo || []
			})
		}
	} 
</script>
<style lang="less">
	.setup-page.background-image:before {
		opacity: 0.5;
	}

	.setup-page {

		.setup-main {
			padding: 20px 40px;
		}

		.carousel {
			margin-bottom: 20px;
		}

		.text-content {
			min-height: 240px;
			font-size: 18px;
			color: #333;
			padding: 10px 25px;
			border: 1px solid #ccc;
			background: white;
			margin-bottom: 20px;
		}

		.button-group {
			padding-top: 20px;
			margin-bottom: 20px;
		}
	}
</style>