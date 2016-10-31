<template>
	<div style="display:inline-block" :style="outterStyle" :class="outterClass">
		<div v-show="!mounting&&!uploading"> 
			<input type="file" style="display:none;" :id="inputId" @change="imageUpload">
			<label 
				class="avatar-image"
				:for="inputId"
				:style="style"
				:class="avatarClass"
				style="cursor:pointer;"
			>
			</label>
		</div>
		<div v-if="uploading">
			<div class="avatar-image avartar-progress-container">
				<div class="avartar-progress" :style="{height: progress + '%'}"></div>
				<span class="avartar-progress-text">{{progress}}%</span>
			</div>
		</div>
	</div>
</template>
<script>
	import Modal from '~/components/modal.vue'
	import {getUniqueId, validImgExt} from '~/utils.js'
	import {uploadFile as postImage} from '~/ajax/post.js'

	import $ from 'jquery'

	// img为空时, 默认上传提示图片的地址
	const defaultImg = './image/zhaopian@2x.png'

	export default {
		data(){
			return {
				result: defaultImg,
				mounting: true,
				uploading: true,
				inputId: 'image_' + getUniqueId(),
				progress: 0
			}
		},
		props: {
			prop: {
				required: true
			},
			init: {
				required: true
			},
			style: {
				required: false,
				default: ()=>{}
			},
			avatarClass: {
				required: false,
				default: ()=>[]	
			},
			outterStyle: {
				required: false,
				default: ()=>{}	
			},
			outterClass: {
				required: false,
				default: ()=>[]	
			}
		},
		watch: {
			result(value){
				this.$emit('image-result-change', {
					prop: this.prop,
					value: value
				})
			}
		},
		methods: {
			imageUpload(event){
				var file = event.target.files[0]

				var self = this 

				// 图片正在上传
				this.uploading = true
				this.progress = 0
				
				postImage({
					file: file, // 图片文件, 来自input
					validFile: validImgExt, // 验证后缀名
					errorCB: (e) => {
						alert(e.message)
						console.dir(e)
					}, // 错误回调
					successCB: (res) => {
						self.mounting = true

						// 图片上传成功, 改变其src, 服务器开始下载图片, 这段时间里保持"上传成功字样"

						var img = self.img

						img.onload = () => {
							self.mounting = false
						}
						img.src = res
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
		mounted(){
			if (this.init) {
				this.result = this.init
			}

			// 也许用render方法会更好, 主要用以避免img开始未显示
			this.$nextTick(() => {
				var img = new Image()
				img.onload = () => {
					this.mounting = false 
					this.uploading = false
				}

				img.src = this.result
				this.img = img
				$('#' + this.inputId).siblings('label').append(img)
			})

		}
	}
</script>