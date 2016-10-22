const server_url = 'http://jr.xiyoukeji.com/index.php/match'
import $ from 'jquery'

var retCodes = {
    'success' : "0"
}

const factory = (url) => (params) => {
    console.dir(params)
    return Promise.resolve($.ajax({
        url: server_url + url,
        type:"POST",
        data: params
    })).then(function(res){
        if (res.state == retCodes.success) {
            return Promise.resolve(res.order)
        } else {
            return Promise.reject(new Error(res.detail))
        }
    }).catch(function(e){
        return Promise.reject(e)
    })
}
//登录
export const login = factory('/log/Login')
//登出
export const logout = factory('/log/Logout')