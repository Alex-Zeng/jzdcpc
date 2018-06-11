import api_test from '../../api/api_test'

const state = {
    goodsRecommend: {}
}

const getters = {
    goodsRecommend: (state, getters, rootState) => {
        return state.goodsRecommend
    }
}

const actions = {
    getGoodsRecommend({commit}){
        api_test.getGoodsRecommend((data)=>{
            commit('updateGoodsRecommend', data)
        })
    }
}

const mutations = {
    updateGoodsRecommend(state, data){
        state.goodsRecommend = data
    }
}

export default{
    getters,
    actions,
    mutations,
    state
}