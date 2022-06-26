import requests from './request'

//首页轮播图数据
export const reqCarousel = () => {
    return requests({
        url:'/banner?typr=0'
    })
}
//热门推荐标签
export const hot = () => {
    return requests({
        url:'/playlist/hot'
    })
}

//热门标签数据
export const reqPlayListHot = (parma) => {
    return requests({
        url:`/top/playlist`,
        method:'get',
        params: parma
    })
}
//新碟上架数据
export const reqDiscList = (area) => {
    return requests({
        url:`/top/album?limit=12&offset=0&area=${area}&type=new&year=&month=`
    })
}
//首页排行版数据
export const reqHomeRankcList = (id) => {
    return requests({
        url:`/playlist/detail?id=${id}&s=8`
    })
}
//首页最新MV数据
export const reqNewMvList = (parma) => {
    return requests({
        url:`/mv/all`,
        method:'get',
        params: parma
    })
}
//首页最新电台数据
export const reqradioList = () => {
    return requests({
        url:'/dj/hot?limit=6&offset=0'
    })
}
export const reqHotsingerList = () => {
    return requests({
        url:'/top/artists?offset=0&limit=18'
    })
}

export const reqSingerList = (parma) => {
    return requests({
        url:`/artist/list`,
        method:'get',
        params: parma
    })
}
export const reqCatList = () => {
    return requests({
        url:'/playlist/catlist',
    })
}
//排行版界面获取歌单歌曲
export const reqTrack = (parma) => {
    return requests({
        url:`/playlist/track/all`,
        method:'get',
        params:parma
    })
}
//排行版界面所有榜单内容摘要
export const reqToplist = () => {
    return requests({
        url:'/toplist/detail',
        method:'get',
    })
}
//详情歌单推荐
export const reqTrelatedPlayList = (id) => {
    return requests({
        url:`/related/playlist?id=${id}`,
        method:'get',
    })
}
//详情歌单评论
export const reqCommentPlayList = (id) => {
    return requests({
        url:`/comment/playlist?id=${id}&limit=6`,
        method:'get',
    })
}
//MV详情
export const reqMVDetail = (id) => {
    return requests({
        url:`/mv/detail?mvid=${id}`,
        method:'get',
    })
}
//MV播放地址
export const reqMVUrl = (id) => {
    return requests({
        url:`/mv/url?id=${id}&r=1080`,
        method:'get',
    })
}
//MV评论
export const reqMVComment = (parma) => {
    return requests({
        url:`/comment/mv`,
        method:'get',
        params:parma
    })
}
//相似MV
export const reqMVSimi = (id) => {
    return requests({
        url:`/simi/mv?mvid=${id}&limit=8`,
        method:'get',
    })
}
//获取歌手歌曲
export const reqArtistsSong = (id) => {
    return requests({
        url:`/artists?id=${id}`,
        method:'get',
    })
}
//获取歌手MV
export const reqArtistsMV = (id) => {
    return requests({
        url:`/artist/mv?id=${id}`,
        method:'get',
    })
}
//获取歌手描述
export const reqArtistsDesc = (id) => {
    return requests({
        url:`/artist/desc?id=${id}`,
        method:'get',
    })
}
//获取相似歌手
export const reqArtistsSimi = (id) => {
    return requests({
        url:`/simi/artist?id=${id}`,
        method:'get',
    })
}
//获取歌手专辑
export const reqArtistsAlbum = (id) => {
    return requests({
        url:`/artist/album?id=${id}&limit=12`,
        method:'get',
    })
}
