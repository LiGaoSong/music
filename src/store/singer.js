import {reqSingerList, reqCatList,reqTrack,reqToplist, reqTrelatedPlayList } from "../api"

const state ={
    singer:[],
    catSub:{},
    categories:{},
    track:[],
    toplist:[],
    trelatedPlayList:[]

}
const mutations ={
    SINGER(state, payload){
        state.singer = payload
    },
    CATSUB(state, payload){
        state.catSub = payload
    },
    CATEGORIES(state, payload){
        state.categories = payload
    },
    TRACK(state, payload){
        state.track = payload
    },
    TOPLIST(state, payload){
        state.toplist = payload
    },
    TRELATEPLAYLIST(state, payload){
        state.trelatedPlayList = payload
    },


}
const actions ={
    //轮播图
    async getSinger({commit}, parma = {}){
        let result = await reqSingerList(parma)
        if(result.code == 200){
            commit("SINGER", result.artists)
        }
    },
    async getCatList({commit}){
        let result = await reqCatList()
        if(result.code == 200){
            commit("CATSUB", result.sub)
            commit("CATEGORIES", result.categories)
        }
    },
    async getTrack({commit},parma={} ){
        let result = await reqTrack(parma)
        if(result.code == 200){
            commit("TRACK", result.playlists)
        }
    },
    async getToplist({commit}){
        let result = await reqToplist()
        if(result.code == 200){
            commit("TOPLIST", result.list)
        }
    },
    async getTrelatedPlayList({commit}, id){
        let result = await reqTrelatedPlayList(id)
        if(result.code == 200){
            commit("TRELATEPLAYLIST", result.playlists)
        }
    }
 
}
const getters ={
}

export default {
    state,
    mutations,
    actions,
    getters
}
  