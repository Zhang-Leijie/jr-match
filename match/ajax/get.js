const server_url = 'http://jr.xiyoukeji.com/index.php/match'
import $ from 'jquery'

var retCodes = {
    'success' : "0",
    'error_login': "10000", //用户未登录
    'error_sys': "10001", //系统错误
    'error_void_input': "10002", //输入值为空
    'error_args': "10003", //参数错误
    'error_account_timeout': "10004", //您的账号体验时间已结束
    'error_email_existed': "10005",  //邮箱已存在
    'error_stuid_unfound': "10006",  //学号不存在
    'error_wrong_email_phone': "10007", //请输入正确的邮箱或手机号码
    'error_too_long_name': "10008", //昵称过长
    'error_network': "10009", //网络异常
    'error_trade_code': "10010", //原交易密码不正确
    'error_origin_pwd': "10011", //原密码不正确
    'error_pwd_format': "10012", //交易密码必须由6~10位的数字或字母组成 
    'error_email_format': "10014", //邮箱格式不正确
    'error_empty_search': "10015", //搜索为空
    'error_tag_existed': "10016", //标签已存在
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




