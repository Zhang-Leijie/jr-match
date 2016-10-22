const server_url = 'http://jr.xiyoukeji.com/index.php/match'
import $ from 'jquery'

var retCodes = {
    'success' : "0"
}

const factory = (url) => (params) => {
    return Promise.resolve($.ajax({
        url: server_url + url,
        type:"GET",
        data: params
    })).then(function(res){
        console.log(`in ${url}, params: ${JSON.stringify(params)}, return: ${JSON.stringify(res)}`)
        if (res.state == retCodes.success) {
            return Promise.resolve(res.order)
        } else {
            return Promise.reject(new Error(res.detail))
        }
    }).catch(function(e){
        return Promise.reject(e)
    })
}

//比赛团队个人信息页
export const UserInfo = factory('/index/UserInfo')
//P2P审核列表页
export const VerifyLists = factory('/index/VerifyLists')




