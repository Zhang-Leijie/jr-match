export const transferMoney = function (money) {
	var n = Number.parseInt(money)
	var fraction = ['角', '分']  
	var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
	var unit = [ ['元', '万', '亿'], ['', '拾', '佰', '仟']  ]
	var head = n < 0? '欠': ''
	n = Math.abs(n)

	var s = ''

	for (var i = 0; i < fraction.length; i++) {  
	    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '')
	}  
	s = s || '整'
	n = Math.floor(n)

	for (var i = 0; i < unit[0].length && n > 0; i++) {  
	    var p = ''
	    for (var j = 0; j < unit[1].length && n > 0; j++) {  
	        p = digit[n % 10] + unit[1][j] + p
	        n = Math.floor(n / 10)  
	    }  
	    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零')  + unit[0][i] + s
	}  
	return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')  
}

var uniqueId = 0

export const getUniqueId = () =>{
	return uniqueId++ 
}

export const NO = () => {}

export const isEmptyArray = (arr) => {
	if (!arr || (arr.length && arr.length === 0)) {
	    return true
	}
	return false
}

// 验证图片后缀名
const _ImgReg = /\.(jpg|png|gif|bmp|jpeg)/
export const validImgExt = (filename) => {
	return filename.match(_ImgReg) !== null
}

// p 贷款总额 
// r 期数
// n 利率
export const payInMonth = (p, n, r) => {
	var i = 0
	var totalI = p * r * (n / 12)
	var totalPAndI = totalI + 0
	var interest = totalI / n  
	var pAndI = totalPAndI / n

	var _order, _pAndI, _p, _i, _rP, rets = []
	for (; i < n; i++) {
		_order = i + 1 // 期数
		_pAndI = pAndI // 只含利息
		_i = interest // 每月利息一样
		_p = 0 // 应收本金为0
		_rP = p - (_pAndI - _i) * _order // 本金 + 已还利息和 - 已还本息和
		rets.push({
			order: _order,
			pAndI: truncatedDot(_pAndI),
			i: truncatedDot(_i),
			p: truncatedDot(_p),
			rP: truncatedDot(_rP)
		})
	}
	return rets
}
export const payInOnce = (p, n, r) => {
	var totalInterest = p * r * n / 12
	var i, _order, rets = []
	for (i = 0; i < n; i++) {
		_order = i + 1
		if (_order == n) {
			rets.push({
				order: _order,
				i: truncatedDot(totalInterest),
				p: 0,
				pAndI: truncatedDot(totalInterest),
				rP: truncatedDot(p)
			})
		} else {
			rets.push({
				order: _order, i: 0, p: 0, pAndI:0, rP: p
			})
		}
	}
	return rets
}
export const payEveryMonth = function(p, n, r){
	var monthR = r / 12
	var pAndI = p * monthR * Math.pow(1+monthR, n) / (Math.pow(1+monthR, n) - 1)
	var _i, _order, _p, _pAccum = 0, _pAndI, _rP, rets = []
	for (var i = 0; i < n; i++) {
		_order = i + 1
		_i = (p * monthR - pAndI) * Math.pow(1+monthR, i) + pAndI
		_p = pAndI - _i
		_rP = p - (pAndI- p*monthR)*(Math.pow(1+monthR, _order) - 1)/monthR
		//_rP = p - _pAccum
		rets.push({
			order: _order,
			i: truncatedDot(_i),
			pAndI: truncatedDot(pAndI),
			rP: truncatedDot(_rP),
			p: truncatedDot(_p) 
		})
	}
	return rets
}

export const filterTime = function(time){
	if (time == "") {return ""} 
	var hour = parseInt(time/1000/3600)
	var min = parseInt((time/1000 - hour * 3600)/60)
	var sec = parseInt(time/1000 - hour * 3600 - min * 60)
	return time = min + '分' + sec + '秒'
}