<template>
	<select class="input-select" :style="style" v-model="result">
		<option :value="option" v-for="option in options">{{option.name}}</option>
	</select>
</template>
<script>
	export default {
		props: {
			style: {
				required: false,
				default: ()=>{}
			},
			getOptions: {
				type: Function,
				required: false
			}
		},
		watch: {
			result(val){
				this.$emit('select-result-change', val)
			}
		},
		data(){
			return {
				result: {},
				options: []
			}
		},
		mounted(){
			this.getOptions().then((options) => {
				this.options = options
			})
		}
	}
</script>