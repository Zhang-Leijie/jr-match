<template>
	<div class="background-image" >
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">P2P</li>
				<li class="item">项目发标</li>
			</ol>
			<p class="remain-time">剩余时间：<span>30分00秒</span></p>
		</div>
		
		<div style="width:1200px;margin:0px auto 20px">
			<router-link  :to="{name:'m-index'}" class="btn-back" style="color:white">
				返回
			</router-link>
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
							<td v-if="list.score==null">未评分</td>
							<td v-if="list.score!=null">{{list.score}}</td>
							<td v-if="list.isfinished == 1">
								<router-link :to="{name: 'm-p2praisedetail', query: {id: list.id}}">去完成</router-link>
							</td>
							<td v-if="list.isfinished == 2">
								<router-link :to="{name: 'm-p2praisecheck', query: {id: list.id, relation_id: list.relation_id}}">查看</router-link>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</template>
<script>
	import router from '~/router.js'
	import {Lists} from '~/ajax/get.js'
	import store from '~/vuex'

	export default{
		data(){
			return {
				lists: []
			}
		},
		mounted:function(){
			Lists({
				type: 3
			}).then((res) => {
				this.lists = res
			})
		}
	}
</script>
<style lang="less">
	.raise{
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