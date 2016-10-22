var retCodes = {
    'success' : "0"
}

export const server_url = 'http://jr.xiyoukeji.com/index.php/match'

export const postFactory = (url) => (params) => {
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

export const getFactory = (url) => (params) => {
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