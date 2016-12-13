<template>
	<div class="input">
		<div v-if="!uploading"> 
			<input type="file" style="display:none;" :id="inputId" @change="Upload">
			<label 
				class="btn" 
				:class="result == '' ? 'blue' : 'green'"
				:style="style" 
				:for="inputId"
				style="cursor:pointer;"
			>
			{{result == "" ? '上传文件' : '上传成功'}}
			</label>
		</div>
		<div v-if="uploading">
			<a class="btn white btn-progress-container">
				<div class="btn-progress" :style="{width:progress+'%'}"></div>
				<span class="btn-progress-text">上传中 {{progress}}%</span>
			</a>
		</div>
	</div>
</template>
<script>
	// import Modal from '~/components/modal.vue'
	import {getUniqueId, validPdfExt} from '~/utils.js'
	import {uploadFile} from '~/ajax/post.js'

	import $ from 'jquery'

	// img为空时, 默认上传提示图片的地址

	export default {
		data(){
			return {
				result: "",
				uploading: false,
				inputId: 'file_' + getUniqueId(),
				progress: 0
			}
		},
		props: {
			prop: {
				required: true
			},
			init: {
				required: true,
				type: String,
				default: ""
			},
			style: {
				required: false,
				default: ()=>{}
			},
			verify: {
				required: true
			}
		},
		watch: {
			result(value){
				if (this.init === value) {
					return 
				}
				this.$emit('file-result-change', {
					prop: this.prop,
					value: value
				})
			}
		},
		methods: {
			Upload(event){
				var file = event.target.files[0]

				if (!this.verify) {
					console.log('Error: image-file needs verify function')
					return
				}
				var self = this 

				// 文件正在上传
				this.uploading = true
				this.progress = 0

				uploadFile({
					file: file, // 图片文件, 来自input
					validFile: this.verify, // 验证后缀名
					errorCB: (e) => {
						alert(e.message || '上传失败')
						console.dir(e)
					}, // 错误回调
					successCB: (res) => {
						self.result = res
					}, // 成功回调
					progressCB: (progress) => {
						self.progress = progress 
					},  // 上传进度回调
					finallyCB: () => { 
						self.uploading = false
					}, // 结束后回调
					queryInterval: 1000
				})
			}
		},
		created(){
			this.result = this.init
		}
	}
</script>
<style lang="less">
	.img-container > .input-image-progress {
		width: 200px;
		text-align: center;
		padding: 10px;
	}
	.input-image-progress > p {
		font-size: 14px;
		color: $666;
	}
	.img-container > .input-image-success {
		width: 200px;
		text-align: center;
		font-size: 14px;
		color: #37bc22;
		padding: 10px;
	}
</style>