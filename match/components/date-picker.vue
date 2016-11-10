<template>
	<input class="input input-date" 
		:id="inputname" 
		type="text" 
		:style="style || {width:'200px'}"
		:value="model"
		@focus="popDatepicker">
</template>
<script>
	import {toTimestampFormat, timestampFormat} from '~/utils.js'

	export default {
		props: ['style', 'min', 'max', 'inputname', 'init'],
		data(){
			return {
				model: ""
			}
		},
		watch: {
			model(val){
				this.$emit('date-change', toTimestampFormat(val) * 1000)
			}
		},
		methods: {
			popDatepicker: function(){
				var self = this
				var options = {
					el: this.inputname,
					onpicked($D){
						self.model = $D.cal.getDateStr()
					}
				}

				if (this.min) {
					options.minDate = `#F{$dp.$D(\'${this.min}\')}`
				}
				if (this.max) {
					options.maxDate = `#F{$dp.$D(\'${this.max}\')}`
				}
				//console.log(`datepicker options: ${JSON.stringify(options)}, min: ${self.min}`)
				WdatePicker(options)
			}
		},
		mounted(){
			if (this.init) {
				this.model = timestampFormat(parseInt(this.init) / 1000 | 0)
			}
		},	
		events: {
			'date-clear': function(){
				this.model = ""
			}
		}
	}
</script>