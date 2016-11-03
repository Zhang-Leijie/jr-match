<template>
	<div class="carousel" @mousedown="startDrag" @mousemove="drag" @selectstart="show">
		<div class="carousel-content clear" :style="{transform: toLeft}">
			<div class="image-container" v-for="(img,index) in imgs" :key="img">
				<img :src="img" alt="">
			</div>
		</div>
		<ol>
			<li v-for="i in imgs.length" class="carousel-btn">
				<input type="radio" :id="'setup_'+i" name="carousel-btn" :value="i-1" v-model="current">
				<label :for="'setup_'+i"></label>
			</li>
		</ol>
	</div>
</template>
<script>
	export default {
		props: {
			interval: {
				required: false,
				type: Number
			},
			imgs: {
				required: true,
				type: Array
			}
		},
		data(){
			return {
				current: 0,
				toX: 0
			}
		},
		computed: {
			toLeft(){
				return `translateX(${this.toX}%)`
			}
		},
		watch: {
			current(val){
				this.toX = - val * 100
			}
		},
		methods: {
			show(e){
				console.dir(e)
			},
			startDrag(e){
				this.dragging = true
				this.startX = parseInt(this.toX)
				this.dragX = e.pageX
			},
			drag(e){
				if (!this.dragging) {
					return
				}
				var gap = (e.pageX - this.dragX)/10
				if (gap > 5 || gap < -5) {
					this.dragging = false
					if (gap > 0) {
						this.nextPage()
					} else {
						this.previousPage()
					}
					return
				}
				this.toX = this.startX + gap
			},
			nextPage(){
				this.current++
				if (this.current == this.imgs.length) {
					this.current = 0
				}
			},
			previousPage(){
				this.current--
				if (this.current == -1) {
					this.current = this.imgs.length - 1
				}
			}
		},
		mounted(){
			if (this.interval) {
				setInterval(()=>{
					this.nextPage()
				}, this.interval)
			}
		}
	}
</script>
<style lang="less">

	.carousel {
		position: relative;
		top: 0;
		left: 0;
		width: 100%;
		overflow: hidden;
		white-space: nowrap;

		.carousel-content {
			transition: transform 1s ease-in-out;
		}

		.image-container {
			background: transparent;
			width: 100%;
			height: 400px;
			display: inline-block;
			> img {
				max-height: 400px;
				max-width: 100%;
				width: 100%;
				-webkit-user-select: none;
				-khtml-user-select: none;
				-moz-user-select: none;
				-o-user-select: none;
				user-select: none;
				-webkit-user-drag: none;
			}
		}

		&:before {
			content: "";
			position: absolute;
			width: 100%;
			min-height: 400px;
		}

		> ol {
			position: absolute;
			bottom: 10px;
			left: 50%;
			transform: translateX(-50%);
			list-style: none;

			> li {
				float: left;
			}
		}

		.carousel-btn {
			> input {
				display: none;
				&:checked + label {
					background: #419af8;	
				}
			}

			> label {
				cursor: pointer;
				display: inline-block;
				width: 10px;
				height: 10px; 
				background: white;
				border-radius: 50%;
			}

			+ .carousel-btn {
				margin-left: 10px;
			}
		}
	}
</style>