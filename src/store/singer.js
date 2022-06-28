import { reqSingerList, reqCatList, reqTrack, reqToplist, reqTrelatedPlayList,
     reqCommentPlayList, reqMVDetail, reqMVUrl, reqMVComment, reqMVSimi,
     reqArtistsSong,reqArtistsMV,reqArtistsDesc,reqArtistsSimi,reqArtistsAlbum,
     reqAlbumDetail
    } from "../api"

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
    mvSimi: [],
    artistsSong:[],
    artistsMV:[],
    artists:{},
    artistsDesc:[],
    artistsSimi:[],
    artistsAlbum:[],
    albumSongs:[],
    albumDetail:{}


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
    ARTISSTSSONG(state, payload) {
        state.artistsSong = payload
    },
    ARTISSTS(state, payload) {
        state.artists = payload
    },
    ARTISSTSMV(state, payload) {
        state.artistsMV = payload
    },
    ARTISSTSDESC(state, payload) {
        state.artistsDesc = payload
    },
    ARTISSTSSIMI(state, payload) {
        state.artistsSimi = payload
    },
    ARTISSTSALBUM(state, payload) {
        state.artistsAlbum = payload
    },
    ALBUMSONGS(state, payload) {
        state.albumSongs = payload
    },
    ALBUMDETAIL(state, payload) {
        state.albumDetail = payload
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
    async getArtistsSong({ commit }, id) {
        let result = await reqArtistsSong(id)
        if (result.code == 200) {
            commit("ARTISSTSSONG", result.hotSongs)
            commit("ARTISSTS", result.artist)
        }
    },
    async getArtistsMV({ commit }, id) {
        let result = await reqArtistsMV(id)
        if (result.code == 200) {
            commit("ARTISSTSMV", result.mvs)
        }
    },
    async getArtistsDesc({ commit }, id) {
        let result = await reqArtistsDesc(id)
        if (result.code == 200) {
            commit("ARTISSTSDESC", result.introduction)
        }
    },
    async getArtistsSimi({ commit }, id) {
        let result = await reqArtistsSimi(id)
        if (result.code == 200) {
            commit("ARTISSTSSIMI", result.artists)
        }
    },
    async getArtistsAlbum({ commit }, id) {
        let result = await reqArtistsAlbum(id)
        if (result.code == 200) {
            commit("ARTISSTSALBUM", result.hotAlbums)
        }
    },
    async getAlbumDetail({ commit }, id) {
        let result = await reqAlbumDetail(id)
        if (result.code == 200) {
            commit("ALBUMSONGS", result.songs)
            commit("ALBUMDETAIL", result.album)
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
