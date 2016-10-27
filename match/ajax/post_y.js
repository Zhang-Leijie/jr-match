import {postFactory as factory} from './const.js'
import {serverPost} from './const.js'

import {getUniqueId, NO, isEmptyArray} from '~/utils.js'
import $ from 'jquery'

export const postP2P = factory('/P2P/P2PPublish')

export const postP2PInvest = factory('/index/VerifyAnswer')

export const uploadFile = ({
	file, // 文件, 来自input
	validFile, // 验证后缀名
	errorCB = NO, // 错误回调
	successCB = NO, // 成功回调
	progressCB = NO,  // 上传进度回调
	finallyCB = NO, // 结束后回调
	queryInterval = 1000
}) => {
	if (validFile && !validFile(file.name)) {
		errorCB(new Error('文件格式不支持'))
		return
	}

	var formData = new FormData()

	var timestamp = String(getUniqueId()) + (new Date()).getTime()
	if (progressCB !== NO) {
		formData.append('PHP_SESSION_UPLOAD_PROGRESS', timestamp)
	}

	formData.append('file', file)

	var upload_p = Promise.resolve($.ajax({
		url: 'http://jr.xiyoukeji.com/upload.php',
		type: "POST",
		cache: false,
	    data: formData,
	    processData: false,
	    contentType: false,
	    beforeSend: () => {
	    	if (progressCB !== NO) {
	    		startCheckProgress(timestamp, progressCB, queryInterval)
	    	}
	    }
	}))

	upload_p.then(function(res){
	    var res = JSON.parse(res)
	    if (!isEmptyArray(res)) {
	        successCB(res[0].file)
	    } else {
	        errorCB(new Error(res.detail))
	    }
	    finallyCB()
	}).catch(function(e){
	    errorCB(e)
	})
}

const startCheckProgress = (timestamp, progressCB, queryInterval) => {
	let preProgress = -1
	let timer = null

	function _checkProgress(timestamp, solveRes) {
		$.get('http://jr.xiyoukeji.com/progress.php',{
				'PHP_SESSION_UPLOAD_PROGRESS' : timestamp
			}, solveRes, 'html')
	}

	function _resolve(res) {
		var progress = parseInt(res)
		//console.log(`${progress},${preProgress}`)
		if (progress < preProgress) {
			timer && clearTimeout(timer)
			timer = null
        	progressCB(100)
        	return
        } else {
        	preProgress = progress
        	timer = setTimeout(()=>{
        		_checkProgress(timestamp, _resolve)
        	}, queryInterval)
        }
		progressCB(res)
	}

	_checkProgress(timestamp, _resolve)
}
