<template>
	<div class="raise background-image">
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">P2P</li>
				<li class="item">审标操作</li>
			</ol>
			<p class="remain-time">剩余时间：<span>30分00秒</span></p>
		</div>
		<div style="width:1200px;margin:0px auto 20px;">
			<router-link  :to="{name:'m-index'}" class="btn-back" style="color:#fff">
				返回
			</router-link>
			<div style="width:100%;">
				<div class="table-box">
					<table class="ne-table">
						<thead>
							<th>编号</th>
							<th style="width:40%">名称</th>
							<th>得分</th>
							<th>操作</th>
						</thead>
						<tbody>
							<tr v-for="(list,index) in lists">
								<td>{{index+1}}</td>
								<td>{{list.name}}</td>
								<td>{{filterScore(list.score)}}</td>
								<td v-if="list.isfinished == 1">
									<router-link :to="{name: 'm-p2pinvestdetail', params: {id: list.id}}">去完成</router-link>
								</td>
								<td v-if="list.isfinished == 2">
									<router-link :to="{name: 'm-p2pinvestdetail', params: {id: list.id}}">查看</router-link>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {VerifyLists} from '~/ajax/get.js'
	import router from '~/router.js'

	export default{
		data(){
			return{
				lists:[]
			}
		},
		mounted:function(){
			var self = this	
			VerifyLists().then((res) => {
				console.dir(res)
				self.lists = res
			})
		},
		methods: {
			filterScore(score){
				return score ? score : '未评分'
			}
		}
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
	}
	.back{
		cursor: pointer;
		width: 60px;
		color: #fff;
		line-height: 40px;
	}
	.table-box{
		width: 100%;
		margin: 0px auto;
		min-height: 560px;
		background:rgba(255, 255, 255, 0.6);
	}
	.flaticon-left-arrow:before{
		margin-left: 0px;
	}
</style>