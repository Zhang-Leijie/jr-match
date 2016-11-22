<template>
	<div class="raise background-image">
		<time-remain type="cfCase" :canset="true" @time-out="timeout=true"></time-remain>
		
		<div style="width:1200px;margin:20px auto 0px">
			<div class="table-box" style="padding:20px 40px">
				<div class="word f2" v-html="text">
				</div>
				<div style="width:100%;margin-top:30px;">
                    <textarea id="project_detail" v-html="tinytext"></textarea>
                </div>
                <input name="file" type="file" id="img_upload" style="display:none;">
				<div class="button-group" style="margin-top:30px;">
					<router-link class="btn white" :to="{name:'m-index'}">
						返回
					</router-link>
					<span class="btn blue" :to="{name:'m-index'}" @click="sureAnswer">
						确认答案
					</span>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {AnalysisLists} from '~/ajax/get.js'
	import {uploadFactory,AnalysisAnswer} from '~/ajax/post.js'
	import {unescapeHTML} from '~/utils.js'
	import router from '~/router.js'
	import {getUniqueId, genLsId} from '~/utils.js'

	var ls = require('localStorage')

	export default{
		data(){
			var tinytext = ls.getItem(genLsId(this.$route.query.userid, 'tinytext'))
			var intext
			if (tinytext) {
				intext = tinytext
			}
			else{
				intext = ''
			}

			return{
				text:'',
				tinytext:intext,
				timeout: false
			}
		},
		methods:{
			sureAnswer:function(){
				AnalysisAnswer({
					answer: this.editor.getContent()
				}).then((res) => {
					alert('提交成功')
					router.push({name: 'm-index'})
				})
			},
			goNext(list){
				if (this.timeout) {
					alert('该模块考试已结束')
				} else {
					router.push({name: 'm-index'})
				}
			},
		},
		mounted:function(){
			var self = this	

			var ret = uploadFactory('img_upload')

			var editor = new tinymce.Editor('project_detail', {
				selector: '#project_detail',
				language: 'zh_CN',
				plugins: ['image'],
				file_browser_callback: ret.callback,
				height: 400
			}, tinymce.EditorManager)
			
			editor.render()

			this.editor = editor

			AnalysisLists().then((res) => {
				//console.dir(res)
				self.text = unescapeHTML(res.text)
			})

			self.clockid = setInterval(()=>{
				var content = self.editor.getContent()
				var userid = self.$route.query.userid
				ls.setItem(genLsId(userid, 'tinytext'), content)
			}, 1000)

		},
		beforeDestroy(){
			clearInterval(this.clockid)
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
	.btn{
		cursor: pointer;
	}
</style>