<template>
	<div class="background-image">
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">众筹</li>
				<li class="item">项目设计</li>
			</ol>
			<p class="remain-time">剩余时间：<span>30分00秒</span></p>
		</div>
		<div class="white-board">
			<div class="paragraph">
				<h1 class="title-with-border">背景描述</h1>
				<div class="content" v-html="info.background">
				</div>
			</div>
			<div class="paragraph">
				<h1 class="title-with-border">详细信息</h1>
				<div class="content" v-html="info.detail">
				</div>
			</div>
			<div class="button-group">
				<router-link :to="{name: 'm-cfitem'}" class="btn white" >返回</router-link>
				<router-link :to="{name: 'm-cfitem-raise', query: {id: info.id, userid: info.userid}}" class="btn blue">设计</router-link>
			</div>
		</div>
	</div>
</template>
<script>
	import {getCrowdFundingRaiseInfo} from '~/ajax/get.js'
	import {unescapeHTML} from '~/utils.js'

	export default {
		data(){
			return {
				info: {
					background: "",
					detail: "",
					id: "",
					userid: ""
				}
			}
		},
		mounted(){
			this.id = this.$route.query.id 

			getCrowdFundingRaiseInfo(this.id).then((res) => {
				this.info.background = unescapeHTML(res.background)
				this.info.detail = unescapeHTML(res.detail)
				this.info.id = res.id
				this.info.userid = res.muser_id
			})
		}
	}
</script>