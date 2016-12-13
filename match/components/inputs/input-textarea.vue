<template>
	<textarea class="input input-textarea" :style="style" :placeholder="placeholder" v-model="result">
	</textarea>
</template>
<script>
	import {debounce, DEBOUNCE} from '~/utils.js'

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
			result: debounce(function(value){
				this.$emit('text-result-change', {
					prop: this.prop,
					value: value
				})
			}, DEBOUNCE)
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