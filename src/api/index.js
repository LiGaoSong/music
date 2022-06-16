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
