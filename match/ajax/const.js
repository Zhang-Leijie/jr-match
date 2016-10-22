var retCodes = {
    success : "0",
    nonLogin : "10000",
    expired: "10004",
    beReplaced: "10016"
}

import $ from 'jquery'
import router from '~/router.js'

export const server_url = 'http://jr.xiyoukeji.com/index.php/match'

const LOGIN_ERROR = "LOGIN_ERROR_0"

export const postFactory = (url) => (params) => {
    console.dir(params)
    return Promise.resolve($.ajax({
        url: server_url + url,
        type:"POST",
        data: params
    })).then((res) => {
        if (res.state == retCodes.success) {
            return Promise.resolve(res.order)
        } else if (res.state == retCodes.nonLogin || 
            retCodes.expired || 
            retCodes.beReplaced){
            return Promise.reject(new Error(LOGIN_ERROR))
        } else {
            return Promise.reject(new Error(res.detail))
        }
    }).catch((e) => {
        if (e.message == LOGIN_ERROR) {
            router.push({name: 'm-login'})
        }
    })
}

export const getFactory = (url) => (params) => {
    return Promise.resolve($.ajax({
        url: server_url + url,
        type:"GET",
        data: params
    })).then(function(res){
        if (res.state == retCodes.success) {
            return Promise.resolve(res.order)
        } else if (res.state == retCodes.nonLogin || 
            retCodes.expired || 
            retCodes.beReplaced){
            return Promise.reject(new Error(LOGIN_ERROR))
        } else {
            return Promise.reject(new Error(res.detail))
        }
    }).catch(function(e){
        if (e.message == LOGIN_ERROR) {
            router.push({name: 'm-login'})
        }

        return Promise.reject(e)
    })
}