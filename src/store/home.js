import { reqCarousel, hot, reqPlayListHot, reqDiscList, reqHomeRankcList,reqNewMvList,reqradioList, reqHotsingerList } from "../api"

const state ={
    carousel:[],
    Hot:{},
    playListHot:[],
    discList:[],
    homeRankList:{},
    newSongList:{},
    originalList:{},
    hotSongList:{},
    newMv:[],
    radioList:[],
    hotSinger:[]

}
const mutations ={
    CAROUSEL(state, payload){
        state.carousel = payload
    },

    HOT(state, payload){
        state.Hot = payload
    },

    PLAYLISTHOT(state, payload){
        state.playListHot = payload
    },

    DISCLIST(state, payload){
        state.discList = payload
    },

    HOMERANKLIST(state, payload){
        state.homeRankList = payload
    },
    NEWSONGLIST(state, payload){
        state.newSongList = payload
    },
    ORIGINALLIST(state, payload){
        state.originalList = payload
    },
    HOTSONGLIST(state, payload){
        state.hotSongList = payload
    },

    NEWMV(state, payload){
        state.newMv = payload
    },

    RADIOLIST(state, payload){
        state.radioList = payload
    },
    HOTSINGER(state, payload){
        state.hotSinger = payload
    },


}
const actions ={
    //轮播图
    async getCarousel({commit}){
        let result = await reqCarousel()
        if(result.code == 200){
            commit("CAROUSEL", result.banners)
        }
    },
    //热门标签
    async getHot({commit}){
        let result = await hot()
        if(result.code == 200){
            commit("HOT", result.tags)
        }
    },
    //热门标签数据
    async getPlayListHot({commit}, payload = {}){
        let result = await reqPlayListHot(payload)
        if(result.code == 200){
            commit("PLAYLISTHOT", result.playlists)
        }
    },
    //新碟上架数据
    async getDiscList({commit}, payload){
        let result = await reqDiscList(payload)
        if(result.code == 200){
            commit("DISCLIST", result.monthData)
        }
    },
    //首页排行榜数据
    async getHotRankList({commit}, payload){
        let result = await reqHomeRankcList(payload)
        if(result.code == 200){
            commit("HOMERANKLIST", result.playlist)
        }
    },
    async getNewSongList({commit}, payload){
        let result = await reqHomeRankcList(payload)
        if(result.code == 200){
            commit("NEWSONGLIST", result.playlist)
        }
    },
    async getOriginalList({commit}, payload){
        let result = await reqHomeRankcList(payload)
        if(result.code == 200){
            commit("ORIGINALLIST", result.playlist)
        }
    },
    async getHotSongList({commit}, payload){
        let result = await reqHomeRankcList(payload)
        if(result.code == 200){
            commit("HOTSONGLIST", result.playlist)
        }
    },
    //首页最新MV数据
    async getNewMvList({commit}, payload = {}){
        let result = await reqNewMvList(payload)
        if(result.code == 200){
            commit("NEWMV", result.data)
        }
    },
    //首页热门电台数据
    async getRadioList({commit}){
        let result = await reqradioList()
        if(result.code == 200){
            commit("RADIOLIST", result.djRadios)
        }
    },
    //首页热门歌手数据
    async getHotSingerList({commit}){
        let result = await reqHotsingerList()
        if(result.code == 200){
            commit("HOTSINGER", result.artists)
        }
    },
}
const getters ={
    getHotRankTracks(state){
        return state.homeRankList.tracks
    },
    getNewSongTracks(state){
        return state.newSongList.tracks
    },
    getOriginalTracks(state){
        return state.originalList.tracks
    },
    getHotSongTracks(state){
        return state.hotSongList.tracks
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}
  