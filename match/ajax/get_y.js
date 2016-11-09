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
export const getCrowdFundingRaiseInfo = function(id) {
	return getListInfo({
		id: id,
		type: 2
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

/* 众筹项目阶段 列表*/
export const getPeriodOptions = () => {
	return normalize(factory('/peer/CrowdfundingsPeriods')())
}

/* 众筹盈利阶段 列表*/
export const getProfitOptions = () => {
	return normalize(factory('/peer/CrowdfundingsProfits')())
}

/* 创新 */
export const getCreativeField = factory('/index/Field')

/* 发标详情 */
export const getRaiseDetail = factory('/P2P/P2PInfo')

/* 众筹详情 */
export const getCFDetail = factory('/peer/CrowdfundingsInfo')