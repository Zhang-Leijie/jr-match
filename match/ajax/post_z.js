import {postFactory as factory} from './const.js'

//登录
var ls = require('localStorage')

export const login = (params) => {
	return factory('/log/Login')(params).then((res) => {
		ls.setItem('userid', res.id)
		return Promise.resolve(res)
	}).catch((e) => {
		return Promise.reject(e)
	})
}
//登出
export const logout = () => {
	return factory('/log/Logout')().then((res) => {
		ls.setItem('userid', '')
		return Promise.resolve(res)
	}).catch((e) => {
		return Promise.reject(e)
	})
}
//客观题回答页
export const ObjectAnswer = factory('/index/ObjectAnswer')
//P2P投标投资
export const Invest = factory('/index/Invest')