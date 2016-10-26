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