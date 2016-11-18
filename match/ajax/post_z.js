import $ from 'jquery'
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
//案例分析提交
export const AnalysisAnswer = factory('/index/AnalysisAnswer')

export const uploadFactory = function(imgId) {
    var state = {
        uploading: false
    }
    return {
        state: state,
        callback: function(field_name, url, type, win) {
            if(type=='image') {
                $('#' + field_name).attr('placeholder', '上传中...')
                var $img = $('#' + imgId)
                if (state.uploading) {
                    alert('请等待现有一张图片上传')
                    return
                }
                $img.click()
                $img.unbind('change')
                $img.on('change', function(e){
                    var file = e.target.files[0]
                    var formData = new FormData()
                    state.uploading = true
                    formData.append('file', file)
                    Promise.resolve($.ajax({
                        url: '/home/asist/photo_upload',
                        data: formData,
                        type: "POST",
                        processData: false,
                        contentType: false,
                        cache: false
                    })).then(function(res){
                        res = JSON.parse(res)
                        $('#' + field_name).val(res.order[0].file)
                        $('#' + field_name).attr('placeholder', '')
                       state.uploading = false
                    })
                })
            }
        } 
    }
}