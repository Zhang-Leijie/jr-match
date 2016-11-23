<template>
	<div style="min-width:1200px;">
		<div class="header-bar">
			<ol class="breadcrumb">
				<li class="item">客观考察</li>
			</ol>
			<p class="remain-time">剩余时间：<span v-if="show==1">{{remainTime | filterTime}}</span><span v-else>结束</span></p>
		</div>
		<div class='obj relative'>
			<a class="btn blue" style="margin-right:20px;margin-bottom:20px;" @click="ques(1,'单项选择')">单项选择</a> 
			<a class="btn blue" style="margin-right:20px;" @click="ques(2,'多项选择')">多项选择</a> 
			<a class="btn blue" @click="ques(3,'判断题')">判断题</a>
			<!-- <a class="btn blue absolute" style="background-color:rgb(196,33,43);right:0px;" v-if="!begin" @click="end">退出答题</a> -->
			<div class="obj-table">
				<div class="item" v-for="(list,index) in single_choices" v-if="type==1" @click="choosenumber(index+1)" :class="{inblue:list.answer!=''&&list.answer!=null}">{{index+1}}</div>
				<div class="item" v-for="(list,index) in multi_choices" v-if="type==2" @click="choosenumber(index+1)" :class="{inblue:list.answer!=''&&list.answer!=null}">{{index+1}}</div>
				<div class="item" v-for="(list,index) in judgments" v-if="type==3" @click="choosenumber(index+1)" :class="{inblue:list.answer!=''&&list.answer!=null}">{{index+1}}</div>
				<!-- <div class="item" v-for="n in 20" v-if="type==1" @click="choosenumber(n)">{{n}}</div> -->
				<!-- <div class="item" v-for="n in 20" v-if="type==2" @click="choosenumber(n)">{{n}}</div>
				<div class="item" v-for="n in 10" v-if="type==3" @click="choosenumber(n)" style="width:10%">{{n}}</div> -->
			</div>
			<div class="obj-box">
				<div class="title f8">{{name}}</div>
				<div class="ques">
					<div class="begin relative" v-if="begin" @click="ifbegin">开始答题！</div>
					<!-- <div class="content f8" v-if="!begin">
						<div>
							1.这里是客观考察单项选择题第一题的题目这里是客观考察单项选择题第一题的题目这里是客观考察单项选择题第一题的题目这里是客观考察单项选择题第一题的题目这里是客观考察单项选择题第一题的题目这里是客观考察单项选择题第一题的题目。
						</div>
						<div class="answer">
							<input type='radio' name="ans" id="an1"> <label for="an1">&nbsp;&nbsp;A.这里是客观考察单项选择题第一题的第一个不知道是对还是错的答案</label><br>
							<input type='radio' name="ans" id="an2"> <label for="an2">&nbsp;&nbsp;B.这里是客观考察单项选择题第一题的第一个不知道是对还是错的答案</label><br>
							<input type='radio' name="ans" id="an3"> <label for="an3">&nbsp;&nbsp;C.这里是客观考察单项选择题第一题的第一个不知道是对还是错的答案</label><br>
							<input type='radio' name="ans" id="an4"> <label for="an4">&nbsp;&nbsp;D.这里是客观考察单项选择题第一题的第一个不知道是对还是错的答案</label><br>
						</div>
					</div> -->
					<div class="content f8" v-show="!begin&&type==1&&number==indexOutter+1" v-for="(single_choice,indexOutter) in getAnswer(single_choices)">
						<div>
							{{indexOutter+1}}.{{single_choice.branch}}
						</div>
						<div class="answer">
							<div v-for="(option, index) in single_choice.options">
								<input type='radio' 
									:name="'sin'+ indexOutter +'_ans'" 
									:id="'sin'+ indexOutter +'_an' + index"
									:value="option.value"
									@click="changeAnswer(option.value, 'single_choices', indexOutter)"
									:checked="option.value == single_choice.answer"
								>
								<label 
									:for="'sin'+ indexOutter + '_an' + index">
									&nbsp;&nbsp;{{option.value}}.{{option.name}}
								</label>
							</div>		
						</div>
					</div>
					<div class="content f8" v-show="!begin&&type==2&&number==indexOutter+1" v-for="(multi_choice,indexOutter) in getAnswer(multi_choices)">
						<div>
							{{indexOutter+1}}.{{multi_choice.branch}}
						</div>
						<div class="answer">
							<div v-for="(option, index) in multi_choice.options">
								<input type='checkbox' 
									:name="'mul'+ indexOutter +'_ans'" 
									:id="'mul'+ indexOutter +'_an' + index"
									:value="option.value"
									@change="changeAnswer(option.value, 'multi_choices', indexOutter)"
									:checked="multi_choice.answer==null?false:multi_choice.answer.indexOf(option.value) > -1"
								>
								<label 
									:for="'mul'+ indexOutter + '_an' + index">
									&nbsp;&nbsp;{{option.value}}.{{option.name}}
								</label>	
							</div>		
						</div>
					</div>
					<div class="content f8" v-show="!begin&&type==3&&number==indexOutter+1" v-for="(judgment, indexOutter) in getAnswer(judgments)">
						<div>
							{{indexOutter+1}}.{{judgment.branch}}
						</div>
						<div class="answer">
							<div v-for="(judg_, index) in judgment.options">
								<input type='radio' 
									:name="'jud'+ indexOutter +'_ans'" 
									:id="'jud'+ indexOutter +'_an' + index"
									:value="judg_.value"
									@click="changeAnswer(judg_.value, 'judgments', indexOutter)"
									:checked="judg_.value==judgment.answer"
								>
								<label 
									:for="'jud'+ indexOutter + '_an' + index">
									&nbsp;&nbsp;{{judg_.value}}.{{judg_.name}}
								</label>
							</div>		
						</div>
					</div>
				</div>
			</div>
			<div class="button-group">
				<router-link class="btn blue" :to="{name: 'm-index'}" style="margin-top:20px;" v-if="begin">返回</router-link>
				<div style="margin-top:20px;" v-if="!begin">
					<a class="btn blue" @click="add">下一题</a>
					<a class="btn blue" style="margin-left:20px;" @click="dec">上一题</a>
					<!-- <router-link :to="{name: 'm-objpoint'}"> -->
					<a class="btn blue" style="margin-left:20px;background-color:#37bc22" @click="poptest" v-if="isfinish==1">提交试卷</a>
					<!-- </router-link> -->
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
		<modal v-if="showsecModal">
			<p slot="header" class='f8' style="text-align:center;margin-top:30px;">是否开始答题?</p>
			<p slot="body" class='f6' style="text-align:center;">考试时间为15分钟, 到时不可再提交申请</p>
			<p slot="footer" style="text-align:center;">
				<router-link class="btn white" :to="{name: 'm-index'}">返回</router-link>
				<a class="btn blue" @click="sureTime" style="margin-left:30px;">确认</a>
			</p>
		</modal>
	</div>
</template>
<script type="text/javascript">

	import Modal from '~/components/modal.vue'
	import router from '~/router.js'
	import {ObjectInfo,AnswerTime} from '~/ajax/get.js'
	import {ObjectAnswer} from '~/ajax/post.js'
	import {filterTime} from '~/utils.js'
	import {getUniqueId, genLsId} from '~/utils.js'
	import store from '~/vuex'
	var ls = require('localStorage')
	export default {
		data(){
			return {
				show:1,
				starttime:'',
				showsecModal:'',
				showModal:false,
				begin:true,
				type: 1,
				number:1,
				name:"单项选择",
				total_answer:[],
				totalTime:900000,
				remainTime: '',
				isfinish:'',
				judgments: [],
				multi_choices:[],
				single_choices:[]
			}
		},
		watch: {
			judgments: {
				deep: true,
				handler: function(val, oldVal){
					ls.setItem(genLsId(this.$route.query.userid, 'judgments'), JSON.stringify(val))
				}
			},
			multi_choices: {
				deep: true,
				handler: function(val, oldVal){
					ls.setItem(genLsId(this.$route.query.userid, 'multi_choices'), JSON.stringify(val))
				}
			},
			single_choices: {
				deep: true,
				handler: function(val, oldVal){
					ls.setItem(genLsId(this.$route.query.userid, 'single_choices'), JSON.stringify(val))
				}
			},
		},
		components: {
			'modal': Modal
		},
		methods: {
			getItem(){
				var self = this
				var judgments = ls.getItem(genLsId(this.$route.query.userid, 'judgments'))
				var multi_choices = ls.getItem(genLsId(this.$route.query.userid, 'multi_choices'))
				var single_choices = ls.getItem(genLsId(this.$route.query.userid, 'single_choices'))
				var showsecModal = ls.getItem(genLsId(this.$route.query.userid, 'showsecModal'))
				if (judgments&&multi_choices&&single_choices) {
					self.judgments = JSON.parse(judgments)
					self.multi_choices = JSON.parse(multi_choices)
					self.single_choices = JSON.parse(single_choices)
					ObjectInfo({

					}).then((res) => {
						self.isfinish = res.isfinished
						if (res.isfinished==2) {
							self.judgments = res.questioninfo.judgment.children
							self.multi_choices = res.questioninfo.multi_choice.children
							self.single_choices = res.questioninfo.single_choice.children
							self.show = 2
						};
					})
				} else {
					ObjectInfo({

					}).then((res) => {
						self.isfinish = res.isfinished
						if (res.isfinished==1) {
							self.judgments = res.questioninfo.judgment.children
							self.multi_choices = res.questioninfo.multi_choice.children
							self.single_choices = res.questioninfo.single_choice.children
							ls.setItem(genLsId(this.$route.query.userid, 'judgments'), JSON.stringify(self.judgments))
							ls.setItem(genLsId(this.$route.query.userid, 'multi_choices'), JSON.stringify(self.multi_choices))
							ls.setItem(genLsId(this.$route.query.userid, 'single_choices'), JSON.stringify(self.single_choices))	
						}
						else{
							self.sureTime()
							self.judgments = res.questioninfo.judgment.children
							self.multi_choices = res.questioninfo.multi_choice.children
							self.single_choices = res.questioninfo.single_choice.children
							self.show = 2
						}	
					})	
				}
			},
			returnBack(){
				var self = this
				router.push({name:'m-index'})
			},
			sureTime(){
				var self = this
				AnswerTime({
					type:1,
					in_time: Date.now()
				}).then((res)=>{
					self.starttime = res.in_time
					self.showsecModal = false
					var timeid = setInterval(()=>{
						if ((self.totalTime - Date.now() + (self.starttime-0))>0) {
							self.remainTime =  self.totalTime - Date.now() + (self.starttime-0)
						}
						else{
							self.show=2
							self.remainTime = 0
							self.poptest()
							clearInterval(timeid)
						}
					}, 1000)
				}, (e) => {
					console.dir(e)
				})
			},
			getAnswer(judgments){
				
				return judgments.map((judgment) => {
					return {
						answer: judgment.answer,
						id: judgment.id,
						branch: judgment.branch,
						options: ['a', 'b','c', 'd', 'e', 'f', 'g', 'h'].reduce((ret, item) => {
							if (judgment[item] != "") {
								ret.push({
									name: judgment[item],
									value: item.toUpperCase()
								})
							}
							return ret 
						}, [])
					}
				})
				
			},
			changeAnswer(value, type, index) {
				var self = this
				if (type==="multi_choices") {
					var ans
					if (self[type][index].answer) {
						 ans = self[type][index].answer.split("")
					}
					else{
						ans = [""]
					}
					var ret = {}
					ans.forEach((item) => {
						ret[item] = true
					})
					if (ret[value]) {
						delete ret[value]
					} else {
						ret[value] = true
					}
					value = Object.keys(ret).sort((charA, charB) => {
						return charA > charB ? 1: -1
					}).join("")
				}
				self[type][index].answer = value
			},
			poptest(){
				var self = this
				var numf = self.single_choices.length
				for (var i = 0; i < numf; i++) {
					self.total_answer.push(self.single_choices[i].answer)
				}
				var nums = self.multi_choices.length
				for (var i = 0; i < nums; i++) {
					self.total_answer.push(self.multi_choices[i].answer)
				}
				var numt = self.judgments.length
				for (var i = 0; i < numt; i++) {
					self.total_answer.push(self.judgments[i].answer)
				}
				ObjectAnswer({
					answer:self.total_answer
				}).then(()=>{
					self.total_answer =[]
					router.push({name:'m-objpoint'})
				}, (e) => {
					self.total_answer =[]
					console.dir(e)
				})
			},
			add(){
				var self = this
				if (self.number<20) {
					self.number +=1
				}			
			},
			dec(){
				var self = this
				if (self.number>1) {
					self.number -=1
				}
			},
			ques(num,name){
				var self = this
				self.type = num
				self.name = name
				self.number = 1
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
			},
			choosenumber(num){
				var self = this
				self.number = num
			}
		},
		filters:{
			filterTime
		},
		mounted:function(){
			var self = this
			AnswerTime({
					type:1,
			}).then((res)=>{
				if (res.in_time=='') {
					self.showsecModal=true
					self.getItem()
				}
				else{
					self.showsecModal=false
					self.getItem()
					self.sureTime()
				}
			}, (e) => {
				console.dir(e)
			})
			
		},
	}
</script>
<style lang="less">
	.inblue{
		background-color: #f34541;
		color: #fff;
	}
	.obj{
		width: 1200px;
		margin: 30px auto;
		//dding: 30px 40px;
		.obj-table{
			// width: 100%;
			// border-top: 1px solid #4198f9;
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
				border-top: 1px solid #4198f9;
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
						div{
							> * {
								vertical-align: middle;
							}
						}	
					}
				}
			}
		}
	}
</style>