<template>
	<input type="text" :style="style" :placeholder="placeholder" class="input input-text" v-model="result">
</template>
<script>
	export default {
		props: {
			prop: {
				required: true	
			},
			init: {
				required: true
			},
			placeholder: {
				required: false,
				default: ""
			},
			style: {
				required: false,
				default: ()=>{}
			},
			verify: {
				required: false
			}
		},
		watch: {
			result(value){
				this.$emit('text-result-change', {
					prop: this.prop,
					value: value
				})
			}
		},
		data(){
			return {
				result: ""
			}
		},
		mounted(){
			if (this.init) {
				this.result = this.init
			}
		}
	}
</script>