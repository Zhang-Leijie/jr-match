<template>
	<div class="background-image">
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">P2P</li>
				<li class="item">项目发标</li>
			</ol>
			<p class="remain-time">剩余时间：<span>30分00秒</span></p>
		</div>
		<div class="white-board">
			<div class="paragraph">
				<h1 class="title-with-border">背景描述</h1>
				<div class="content" v-html="listInfo.background">
				</div>
			</div>
			<div class="paragraph">
				<h1 class="title-with-border">详细信息</h1>
				<div class="content" v-html="listInfo.detail">
				</div>
			</div>
			<div class="button-group">
				<router-link :to="{name: 'm-p2praise'}" class="btn white" >返回</router-link>
				<router-link :to="{name: 'm-p2praisechart', query: {id: $route.query.id, userid: listInfo.muser_id}}" class="btn blue">设计</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	import {getP2PRaiseInfo} from '~/ajax/get.js'
	import router from '~/router.js'
	import {unescapeHTML} from '~/utils.js'

	export default {
		data(){
			return {
				listInfo: {
					background: "",
					detail: "",
					muser_id: ""
				}
			}
		},	
		mounted() {
			getP2PRaiseInfo(this.$route.query.id).then((listInfo) => {
				this.listInfo.background = listInfo.background
				this.listInfo.detail = listInfo.detail
				this.listInfo.muser_id = listInfo.muser_id
			})
		}
	}
</script>