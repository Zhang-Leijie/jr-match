<template>
	<div class="header-bar">
		<ol class="breadcrumb">
			<li class="item">{{router0}}</li>
			<li class="item">{{router1}}</li>
		</ol>
		<p class="remain-time">剩余时间：<span>{{remainTime | filterTime}}</span></p>

		<modal v-if="showModal">
			<p slot="header" class='f8' style="text-align:center;margin-top:30px;">是否开始答题?</p>
			<p slot="body" class='f6' style="text-align:center;">考试时间为{{totalTime}}分钟, 到时不可再提交申请</p>
			<p slot="footer" style="text-align:center;">
				<router-link class="btn white" :to="{name: 'm-index'}">返回</router-link>
				<a class="btn blue" @click="startExam" style="margin-left:30px;">确认</a>
			</p>
		</modal>

		<modal v-if="showEnd">
			<p slot="header" class='f8' style="text-align:center;margin-top:30px;">该模块考试已结束</p>
			<p slot="footer" style="text-align:center;">
				<a class="btn blue" @click="end" style="margin-left:30px;">确认</a>
			</p>
		</modal>
	</div>
</template>
<script>
	import {filterTime} from '~/utils.js'
	import {AnswerTime} from '~/ajax/get.js'
	import router from '~/router.js'

	const lookup = {
		'p2pRaise': {
			words: ['P2P', '项目发标'],
			type: 3,
			exam_period: 15 * 60 * 1000
		},
		'p2pBid': {
			words: ['P2P', '项目投标'],
			type: 6,
			exam_period: 10 * 60 * 1000
		},
		'p2pInvest': {
			words: ['P2P', '项目审标'],
			type: 4,
			exam_period: 5 * 60 * 1000
		},
		'cfRaise': {
			words: ['众筹', '项目设计'],
			type: 2,
			exam_period: 15 * 60 * 1000
		},
		'cfCase': {
			words: ['创新创业', '案例分析'],
			type: 5,
			exam_period: 15 * 60 * 1000
		}
	}

	import Modal from '~/components/modal.vue'

	export default {
		props: {
			type: {
				type: String,
				required: true
			},
			canset: {
				type: Boolean,
				required: false
			}
		},	
		data(){
			return {
				router0: "",
				router1: "",
				remainTime: "",
				showModal: false,
				showEnd: false,
				totalTime: ""
			}
		},
		methods: {
			startExam(){
				// 点击了modal的确认并设置开始时间
				AnswerTime({
					type: this.metaInfo.type,
					in_time: Date.now()
				}).then((res)=>{
					this.setTime(res.in_time)
					this.$emit('time-set')
					this.showModal = false
				})
			},
			setTime(startTime){
				if (this.timeid) {
					clearInterval(this.timeid)
				}

				this.timeid = setInterval(() => {
					var gap = (Date.now() - parseInt(startTime))
					var exam_period = this.metaInfo.exam_period
					if (gap >= exam_period) {
						this.remainTime = 0
						clearInterval(this.timeid)
						this.timeid = null
						this.showEnd = true
						this.$emit('time-out')
					} else {
						this.remainTime = exam_period - gap
					}
				})
			},
			end(){
				this.showEnd = false
				this.$emit('time-out')
			}
		},
		mounted(){
			// 获取关于该类型的信息, answerTime api参数, 字段
			this.metaInfo = lookup[this.type]
			// 设置倒计时标题
			this.router0 = this.metaInfo.words[0]
			this.router1 = this.metaInfo.words[1]

			this.totalTime = this.metaInfo.exam_period / 60 / 1000

			// 查看剩余时间信息
			AnswerTime({
				type: this.metaInfo.type
			}).then((res) => {
				// 如果res.in_time 为空, 则是未设置
				if (res.in_time == "") {
					if (!this.canset) {
						router.push({name: 'm-index'})
						return
					}
					this.$emit('time-not-set')
					// 打开modal, 进行确认
					this.showModal = true
				}
				// 如果不为空, 则是已设置 
				else {
					this.$emit('time-set')
					// 设置时间
					this.setTime(res.in_time)
				}
			})
		},
		components: {
			'modal': Modal
		},
		filters: {
			filterTime: (time) => {
				if (time === 0) {
					return '已结束'
				} else {
					return filterTime(time)
				}
			}
		}
	}
</script>