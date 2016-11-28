export const transferMoney = function (money) {
	if (!money) {
		return ""
	}

	money = money.replace(',', '')
	var n = Number.parseInt(money)

	if (Number.isNaN(n)) {
		return "不合法输入"
	}
	
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
export const validImgExt = (file) => {
	var filename = file.name
	if (filename.match(_ImgReg) !== null) {
		return true
	} else {
		return '不支持该图片格式'
	}
}

const _pdfReg = /\.pdf$/
export const validPdfExt = (file) => {
	var filename = file.name
	if (filename.match(_pdfReg) !== null) {
		return true
	} else {
		return '请上传pdf文件'
	}
}

// p 贷款总额 
// r 期数
// n 利率
export const toFixed = (str) => {
	return parseFloat(str).toFixed(2)
}
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
			pAndI: toFixed(_pAndI, 2),
			i: toFixed(_i, 2),
			p: toFixed(_p, 2),
			rP: toFixed(_pAndI, 2)
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
				i: toFixed(totalInterest, 2),
				p: 0,
				pAndI: toFixed(totalInterest, 2),
				rP: toFixed(p, 2)
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
			i: toFixed(_i, 2),
			pAndI: toFixed(pAndI, 2),
			rP: toFixed(_rP, 2),
			p: toFixed(_p, 2) 
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


var _date = new Date()
export const timestampFormat = function(timestamp){
	var date = _date
	date.setTime(Number.parseInt(timestamp) * 1000)
	var year = date.getFullYear()
	var month = "0" + (date.getMonth()+1)
	var hours = "0" + date.getHours()
	var minutes = "0" + date.getMinutes()
	var date = "0" + date.getUTCDate()
	return year + '-' + 
		month.substr(-2) + '-' + 
		date.substr(-2) + ' ' + 
		hours.substr(-2) + ":" + 
		minutes.substr(-2)
}

var toTimeReg = /(\d+)-(\d+)-(\d+) (\d+):(\d+)/
export const toTimestampFormat = function(time){
	if (time === "" || typeof time != 'string') {
		return (new Date()).getTime()
	}
	var date_ = _date
	var [_, year, month, date, hours, minutes] = time.match(toTimeReg)

	date_.setFullYear(parseInt(year))
	date_.setMonth(parseInt(month) - 1)
	date_.setHours(parseInt(hours))
	date_.setMinutes(parseInt(minutes))
	date_.setUTCDate(parseInt(date))

	console.log(`ret: ${JSON.stringify([_, year, month, date, hours, minutes])}`)
	console.log(`time: ${date_.getTime()}`)

	return date_.getTime() / 1000
}

export function verifyLength(name, max, min) {
	return (str) => {
		if (str == "") {
			return `请填写${name}`
		} else if (max && str.length > max) {
			return `${name}需要少于${max}个字`
		} else if (min && str.length < min) {
			return `${name}需要至少有${min}个字`
		} else {
			return true
		}
	}
}

var __$textarea = document.createElement('textarea')
export function unescapeHTML(str){
    __$textarea.innerHTML = str
    return __$textarea.value
}

export function genLsId(id, module) {
	return id + '.' + module
}