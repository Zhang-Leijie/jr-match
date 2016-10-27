<template>
	<div ref="container">
		<span class="star" :class="{checked: hoverRating >= i || rating >= i}"
			v-for="i in 5" 
			@mouseenter="onhoverin(i)" 
			@mouseleave="hoverRating = 0"
			@click="rating = i"></span>
	</div>
</template>
<script>
	export default {
		data(){
			return {
				rating: 0,
				hoverRating: 0
			}
		},
		methods: {
			onhoverin(i){
				this.hoverRating = i
			}
		},
		mounted(){
		}
	}
</script>