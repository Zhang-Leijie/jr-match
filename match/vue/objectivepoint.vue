<template>
	<div style="min-width:1200px;">
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">客观考察</li>
			</ol>
			<p class="remain-time">剩余时间：<span>30分00秒</span></p>
		</div>
		<div class="objpoint f8">
				<div class="point-box">
					总正确率：0/{{result.sum}}
				</div>
				<div class="point-box">
					单选题正确率：{{result.judge_count}}/{{result.single_sum}}
				</div>
				<div class="point-box">
					多选题正确率：{{result.multi_count}}/{{result.multi_sum}}
				</div>
				<div class="point-box">
					判断题正确率：{{result.judge_count}}/{{result.judge_sum}}
				</div>
				<div class="point-box">
					得分：{{result.totalscore}}
				</div>
		</div>
		<div class="button-group">
			<router-link class="btn blue" :to="{name:'m-index'}">确定</router-link>
		</div>
	</div>
</template>
<script>
	import {ObjectScore} from '~/ajax/get.js'

	export default {
		data(){
			return{
				result:''
			}
		},
		mounted:function(){
			var self = this
			ObjectScore().then((res)=>{
				console.dir(res)
				self.result = res
			})
		}
	}
</script>
<style lang="less">
	.objpoint{
		width: 1200px;
		margin: 30px auto;
		border:1px solid #cccccc;
		height:60px;
		color: #999;
		margin-bottom: 100px;
			.point-box{
				display: inline-block;
				text-align: center;
				width: 19.6%;
				line-height: 60px;
			}	
	}
</style>