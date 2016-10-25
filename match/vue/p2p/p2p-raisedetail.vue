<template>
	<div class="background-image">
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">P2P</li>
				<li class="item">项目发标</li>
			</ol>
			<p class="remain-time">剩余时间：<span>30分00秒</span></p>
		</div>
		<div class="white-board" v-if="listInfo.id !== undefined">
			<div class="paragraph">
				<h1 class="title-with-border">背景描述</h1>
				<div class="content">
					{{listInfo.background}}
				</div>
			</div>
			<div class="paragraph">
				<h1 class="title-with-border">详细信息</h1>
				<div class="content">
					{{listInfo.detail}}
				</div>
			</div>
			<div class="button-group">
				<router-link :to="{name: 'm-p2praise'}" class="btn white" >返回</router-link>
				<router-link :to="{name: 'm-p2praisechart', query: {id: listInfo.id}}" class="btn blue">设计</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	import router from '~/router.js'
	import store from '~/vuex'

	export default {
		computed: {
			listInfo(){
				var listInfos = store.state.p2pRaise.listInfos
				var id = store.state.route.query.id 
				return listInfos[id] || {}
			}
		},
		mounted() {
			store.dispatch('getP2PRaiseInfo', {
				id: store.state.route.query.id
			})
		}
	}
</script>