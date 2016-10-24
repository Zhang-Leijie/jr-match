<template>
	<div style="min-width:1200px;">
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">客观考察</li>
			</ol>
			<p class="remain-time">剩余时间：<span>30分00秒</span></p>
		</div>
		<div class='obj relative'>
			<a class="btn blue" style="margin-right:20px;margin-bottom:20px;" @click="ques(1,'单项选择')">单项选择</a> 
			<a class="btn blue" style="margin-right:20px;" @click="ques(2,'多项选择')">多项选择</a> 
			<a class="btn blue" @click="ques(3,'判断题')">判断题</a>
			<a class="btn blue absolute" style="background-color:rgb(196,33,43);right:0px;" v-if="!begin" @click="end">退出答题</a>
			<div class="obj-table">
				<div class="item" v-for="n in 20" v-if="type==1">{{n}}</div>
				<div class="item" v-for="n in 20" v-if="type==2">{{n}}</div>
				<div class="item" v-for="n in 10" v-if="type==3" style="width:10%">{{n}}</div>
			</div>
			<div class="obj-box">
				<div class="title f8">{{name}}</div>
				<div class="ques">
					<div class="begin relative" v-if="begin" @click="ifbegin">开始答题！</div>
					<div class="content f8" v-if="!begin">
						<div>
							1.这里是客观考察单项选择题第一题的题目这里是客观考察单项选择题第一题的题目这里是客观考察单项选择题第一题的题目这里是客观考察单项选择题第一题的题目这里是客观考察单项选择题第一题的题目这里是客观考察单项选择题第一题的题目。
						</div>
						<div class="answer">
							<input type='radio' name="ans" id="an1"> <label for="an1">&nbsp;&nbsp;A.这里是客观考察单项选择题第一题的第一个不知道是对还是错的答案</label><br>
							<input type='radio' name="ans" id="an2"> <label for="an2">&nbsp;&nbsp;B.这里是客观考察单项选择题第一题的第一个不知道是对还是错的答案</label><br>
							<input type='radio' name="ans" id="an3"> <label for="an3">&nbsp;&nbsp;C.这里是客观考察单项选择题第一题的第一个不知道是对还是错的答案</label><br>
							<input type='radio' name="ans" id="an4"> <label for="an4">&nbsp;&nbsp;D.这里是客观考察单项选择题第一题的第一个不知道是对还是错的答案</label><br>
						</div>
					</div>
				</div>
			</div>
			<div class="button-group">
				<router-link class="btn blue" :to="{name: 'm-index'}" style="margin-top:20px;" v-if="begin">返回</router-link>
				<div style="margin-top:20px;" v-if="!begin">
					<a class="btn blue">下一题</a>
					<a class="btn blue" style="margin-left:20px;">上一题</a>
					<router-link :to="{name: 'm-objpoint'}">
						<a class="btn blue" style="margin-left:20px;background-color:#37bc22">提交试卷</a>
					</router-link>
				</div>
			</div>
		</div>
		<modal v-if="showModal">
			<p slot="header" class='f8' style="text-align:center;margin-top:30px;">确认退出答题?</p>
			<p slot="body" class='f6' style="text-align:center;">退出答题后可以再次重新答题</p>
			<p slot="footer" style="text-align:center;">
				<a class="btn white" @click="close">返回</a>
				<a class="btn blue" @click="sure" style="margin-left:30px;">确认</a>
			</p>
		</modal>
	</div>
</template>
<script type="text/javascript">

	import Modal from '~/components/modal.vue'
	import router from '~/router.js'
	import {ObjectInfo} from '~/ajax/get.js'

	export default {
		data(){
			return {
				showModal:false,
				begin:true,
				type: 1,
				name:"单项选择",
				question:[]
			}
		},
		components: {
			'modal': Modal
		},
		methods: {
			ques(num,name){
				var self = this
				self.type = num
				self.name = name
			},
			end(){
				var self = this
				// self.begin = true
				self.showModal = true
			},
			ifbegin(){
				var self = this
				self.begin = false
			},
			close(){
				var self = this
				self.showModal = false
			},
			sure(){
				var self = this
				self.begin = true
				self.showModal = false
			}
		},
		mounted:function(){
			var self = this	
			ObjectInfo().then((res) => {
				console.dir(res)
				self.question = res
			})
		},
	}
</script>
<style lang="less">
.obj{
	width: 1200px;
	margin: 30px auto;
	//dding: 30px 40px;
	.obj-table{
		// width: 100%;
		border-top: 1px solid #4198f9;
		border-left: 1px solid #4198f9;
		font-size: 0px;
		.item{
			font-size: 20px;
			cursor: pointer;
			display: inline-block;
			width: 5%;
			height: 40px;
			text-align: center;
			line-height: 40px;
			border-right: 1px solid #4198f9;
			border-bottom: 1px solid #4198f9;
		}
	}
	.obj-box{
		border: 1px solid #ccc;
		border-top:none; 
		width: 100%;
		.title{
			padding-left: 20px;
			width: 100%;
			height: 40px;
			background-color: #f8f9fe;
			line-height: 40px;
		}
		.ques{
			min-height: 260px;
			.begin{
				top: 60px;
				cursor: pointer;
				margin: 0px auto;
				background:#f3f4f5;
				border:1px solid #ccc;
				border-radius:6px;
				width:240px;
				height:100px;
				line-height: 100px;
				text-align: center;
			}
			.content{
				padding: 20px;
				.answer{
					margin-top: 30px;
					padding-left: 20px;
					> * {
						vertical-align: middle;
					}
				}
			}
		}
	}
}
</style>