<template>
	<div class="background-image">
		<time-remain type="p2pRaise" @time-set="getData"></time-remain>
		<div class="white-board">
			<div class="paragraph">
				<h1 class="title-with-border">背景描述</h1>
				<div class="content" v-html="listInfo.background">
				</div>
			</div>
			<!-- <div class="paragraph">
				<h1 class="title-with-border">详细信息</h1>
				<div class="content" v-html="listInfo.detail">
				</div>
			</div> -->
			<div class="button-group">
				<router-link :to="{name: 'm-p2praise'}" class="btn white" >返回</router-link>
				<a @click="design" class="btn blue">设计</a>
			</div>
		</div>
	</div>
</template>
<script>
	import {getP2PRaiseInfo} from '~/ajax/get.js'
	import router from '~/router.js'
	import {unescapeHTML} from '~/utils.js'

	import {postP2P} from '~/ajax/post.js'

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
		methods: {
			getData(){
				getP2PRaiseInfo(this.$route.query.id).then((listInfo) => {
					this.listInfo.background = listInfo.background
					this.listInfo.detail = listInfo.detail
					this.listInfo.muser_id = listInfo.muser_id
				})
			},
			design(){
				postP2P({
					relation_id: this.$route.query.id
				}).then((res)=>{
					router.push({
						name: 'm-p2praisechart', 
						query: {
							id: this.$route.query.id, 
							relation_id: res.relation_id
						}
					})
				})
			}
		}
	}
</script>