var retCodes = {
    success : "0",
    nonLogin : "10000",
    expired: "10004",
    beReplaced: "10016"
}

import $ from 'jquery'
import router from '~/router.js'
import {routerState} from '~/router.js'

export const server_match_url = '/index.php/match'

export const server_url = '/home'

const LOGIN_ERROR = "LOGIN_ERROR_0"

var hasNonLoginError = false

export const Factory_ = (server_url) => (method) => (url) => (params, loginSilent) => {
    //console.dir(params)
    return Promise.resolve($.ajax({
        url: server_url + url,
        type:method,
        data: params
    })).then((res) => {
        if (res.state == retCodes.success) {
            hasNonLoginError = false
            return Promise.resolve(res.order)
        } else if (res.state == retCodes.nonLogin || 
            res.state == retCodes.expired || 
            res.state == retCodes.beReplaced){

            var e = new Error(LOGIN_ERROR)
            e.detail__ = res.detail
            return Promise.reject(e)
        } else {
            return Promise.reject(new Error(res.detail))
        }
    }).catch((e) => {
        if (e.message == LOGIN_ERROR && !loginSilent) {
            if (!hasNonLoginError) {
                hasNonLoginError = true
            } else {
                return
            }
            alert(e.detail__)
            routerState.previous = router.currentRoute.name
            router.push({name: 'm-login'})
        }
        return Promise.reject(e)
    })
}

const matchFactory = Factory_(server_match_url)
const serverFactory = Factory_(server_url)


export const postFactory = matchFactory('POST')
export const getFactory = matchFactory('GET')

export const serverGet = serverFactory('GET')
export const serverPOST = serverFactory('POST')