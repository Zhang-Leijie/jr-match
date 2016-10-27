import {getFactory as factory, serverGet} from './const.js'

function normalize(p){
	return p.then(function(res){
		return Promise.resolve(res.map((item)=>{
			return {
				name: item.name,
				value: item.id
			}
		}))
	})
}

const getListInfo = factory('/index/ListInfo')
export const getP2PRaiseInfo = function(id) {
	return getListInfo({
		id: id,
		type: 3
	})
}

export const getP2PTag = function(){
	return normalize(factory('/P2P/P2PTagList')())
}

export const getProvinceList = () => {
	return normalize(serverGet('/asist/ProvinceList')())
}
export const getCityList = (cityId) => {
	return normalize(serverGet('/asist/CityList')({id: cityId}))
}
export const getRequestList = () => {
	return normalize(factory('/P2P/RiskList')())
}
export const getRepaymentList = () => {
	return normalize(serverGet('/asist/RepayTypelist')())
}

/* 审标详情页*/
export const getInvestDetail = factory('/index/VerifyInfo')