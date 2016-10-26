<template>
	<div class="input" v-if="mount">
		<input type="file" style="display:none;" :id="inputId" @change="imageUpload">
		<label 
			class="image-container" 
			:style="style" 
			:for="inputId"
		>
			<img :src="result" alt="" ref="img">
		</label>
	</div>
</template>
<script>
	import Modal from '~/components/modal.vue'
	import {getUniqueId, validImgExt} from '~/utils.js'
	import {uploadFile as postImage} from '~/ajax/post.js'
	console.dir(postImage)
	// img为空时, 默认上传提示图片的地址
	const defaultImg = './image/zhaopian@2x.png'

	export default {
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
			}
		},
		watch: {
			result(value){
				console.log(`Image result: ${JSON.stringify({
					prop: this.prop,
					value: value
				})}`)
				this.$emit('image-result-change', {
					prop: this.prop,
					value: value
				})
			}
		},
		methods: {
			imageUpload(event){
				var file = event.target.files[0]
				postImage({
					file: file, // 图片文件, 来自input
					validFile: validImgExt, // 验证后缀名
					errorCB: (e)=>{console.log('error');console.log(e)}, // 错误回调
					successCB: (res)=>{console.log('success');console.log(res)}, // 成功回调
					progressCB: (progress)=>{console.log('progress:', progress)},  // 上传进度回调
					finallyCB: ()=>{console.log('end')}, // 结束后回调
					queryInterval: 1000
				})
			}
		},
		data(){
			return {
				result: defaultImg,
				mount: false,
				inputId: 'image_' + getUniqueId()
			}
		},
		mounted(){
			console.log(typeof this.$refs.img)
			if (this.init) {
				this.result = this.init
			}
			this.mount = true
		}
	}
</script>