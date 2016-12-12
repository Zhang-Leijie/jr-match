<template>
	<select class="input-select" :style="style" v-model="result">
		<option :value="option" v-for="option in options">{{option.name}}</option>
	</select>
</template>
<script>
	/*
	 * option format
	 * name: string , 必需
	 * value: any, 必需
	 * 
	 * select-result-change: 返回一个数据改变事件, 参数格式
	 * prop: 数据项名称
	 * val: option格式
	 */
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
			},
			getOptions: {
				type: Function,
				required: false
			}
		},
		data(){
			return {
				result: {},
				options: []
			}
		},
		watch: {
			result(value){
				this.$emit('select-result-change', {
					prop: this.prop,
					value: value
				})
			}
		},
		mounted(){
			var self = this
			this.getOptions().then(function(options){
				self.options = options

				/*
					如果初始值不为空, 则寻找并设定初始值
				*/
				if (self.init) {
					var option = self.options.find(function(item){
						return (self.init.value || self.init) === item.value
					})
					self.result = option
				}
			})
		}
	}
</script>