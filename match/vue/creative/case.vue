<template>
	<div class="raise background-image">
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">创新创业</li>
				<li class="item">案例分析</li>
			</ol>
			<p class="remain-time">剩余时间：<span>30分00秒</span></p>
		</div>
		<div style="width:1200px;margin:20px auto 0px">
			<div class="table-box" style="padding:20px 40px">
				<div class="word f2" style="min-height:480px;" v-html="text">
				</div>
				<div class="button-group">
					<router-link class="btn blue" :to="{name:'m-index'}">
						返回
					</router-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {AnalysisLists} from '~/ajax/get.js'
	import {unescapeHTML} from '~/utils.js'
	import router from '~/router.js'

	export default{
		data(){
			return{
				text:''
			}
		},
		mounted:function(){
			var self = this	
			AnalysisLists().then((res) => {
				//console.dir(res)
				self.text = unescapeHTML(res.text)
			})
		},
	}
</script>
<style lang="less">
	.raise{
		top: 0px;
		bottom: 0px;
		left: 0px;
		right: 0px;
		min-width: 1200px;
		width: 100%;
		.point{
			margin: 0px auto;
			text-align: right;

		}
	}
	.table-box{
		width: 100%;
		margin: 10px auto 0px;
		min-height: 560px;
		background:rgba(255, 255, 255, 0.6);
	}
	.btn-box{
		text-align: center;		
	}
</style>