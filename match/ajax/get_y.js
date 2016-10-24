import {getFactory as factory} from './const.js'

export const getP2PTag = factory('/P2P/P2PTagList')

const getListInfo = factory('/index/ListInfo')
export const getP2PRaiseInfo = function(id) {
	return getListInfo({
		id: id,
		type: 3
	})
}