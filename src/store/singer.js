import { reqSingerList, reqCatList, reqTrack, reqToplist, reqTrelatedPlayList, reqCommentPlayList, reqMVDetail, reqMVUrl, reqMVComment, reqMVSimi } from "../api"

const state = {
    singer: [],
    catSub: {},
    categories: {},
    track: [],
    toplist: [],
    trelatedPlayList: [],
    commentPlayList: [],
    mvDetail: {},
    mvUrl: {},
    mvComment: [],
    mvSimi:[]

}
const mutations = {
    SINGER(state, payload) {
        state.singer = payload
    },
    CATSUB(state, payload) {
        state.catSub = payload
    },
    CATEGORIES(state, payload) {
        state.categories = payload
    },
    TRACK(state, payload) {
        state.track = payload
    },
    TOPLIST(state, payload) {
        state.toplist = payload
    },
    TRELATEPLAYLIST(state, payload) {
        state.trelatedPlayList = payload
    },
    COMMENTPLAYLIST(state, payload) {
        state.commentPlayList = payload
    },
    MVDETAIL(state, payload) {
        state.mvDetail = payload
    },
    MVURL(state, payload) {
        state.mvUrl = payload
    },
    MVCOMMENT(state, payload) {
        state.mvComment = payload
    },
    MVSIMI(state, payload) {
        state.mvSimi = payload
    },


}
const actions = {
    //轮播图
    async getSinger({ commit }, parma = {}) {
        let result = await reqSingerList(parma)
        if (result.code == 200) {
            commit("SINGER", result.artists)
        }
    },
    async getCatList({ commit }) {
        let result = await reqCatList()
        if (result.code == 200) {
            commit("CATSUB", result.sub)
            commit("CATEGORIES", result.categories)
        }
    },
    async getTrack({ commit }, parma = {}) {
        let result = await reqTrack(parma)
        if (result.code == 200) {
            commit("TRACK", result.playlists)
        }
    },
    async getToplist({ commit }) {
        let result = await reqToplist()
        if (result.code == 200) {
            commit("TOPLIST", result.list)
        }
    },
    async getTrelatedPlayList({ commit }, id) {
        let result = await reqTrelatedPlayList(id)
        if (result.code == 200) {
            commit("TRELATEPLAYLIST", result.playlists)
        }
    },
    async getCommentPlayList({ commit }, id) {
        let result = await reqCommentPlayList(id)
        if (result.code == 200) {
            commit("COMMENTPLAYLIST", result.comments)
        }
    },
    async getMVDetail({ commit }, id) {
        let result = await reqMVDetail(id)
        if (result.code == 200) {
            commit("MVDETAIL", result.data)
        }
    },
    async getMVUrl({ commit }, id) {
        let result = await reqMVUrl(id)
        if (result.code == 200) {
            commit("MVURL", result.data)
        }
    },
    async getMVComment({ commit }, parma = {}) {
        let result = await reqMVComment(parma)
        if (result.code == 200) {
            commit("MVCOMMENT", result.comments)
        }
    },
    async getMVSimi({ commit }, id) {
        let result = await reqMVSimi(id)
        if (result.code == 200) {
            commit("MVSIMI", result.mvs)
        }
    },

}
const getters = {
}

export default {
    state,
    mutations,
    actions,
    getters
}
