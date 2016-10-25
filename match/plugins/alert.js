import alertOp from './alert.vue'

const install = (Vue) => {
	if (install.installed) {
		return
	}
	install.installed = true

	var alertContructor = Vue.extend(alertOp) 
	var alertInstance = null

	Object.defineProperty(Vue.prototype, '$alert', {
		get: function(){
			return (message, options) => {	
				options = options || {}

				if (!alertInstance) {
					alertInstance = new alertContructor({
						propsData: {
							position: options.position || [],
							type: options.type || "success"
						}
					}).$mount()
					var alertEl = alertInstance.$el
					document.body.appendChild(alertEl)
				}

				alertInstance.messages.unshift(message)

				setTimeout(() => {
					if (alertInstance.messages.length > 0){
						alertInstance.messages.pop()
					}
				}, options.delay || 10000)

			}
		}
	})
}
export default {
	install: install
}