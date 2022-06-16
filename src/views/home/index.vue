<template>
  <div id="home">
    <!--轮播图-->
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item, index) in banner" :key="index">
          <img :src="item.imageUrl" class="banner" />
        </el-carousel-item>
      </el-carousel>
    </div>

    <!--热门推荐-->
    <hot-list :hot="hot" :playListHot="playListHot">
      <template v-slot:title-name>热门推荐</template>
    </hot-list>

    <!--新碟上架-->
    <!-- <disc-list :discList="discList"></disc-list> -->

    <!--排行榜-->
    <div class="rank-list">
      <rank-list :rankList="soar" :tracks="getHotRankTracks"></rank-list>
      <rank-list :rankList="original" :tracks="getOriginalTracks"></rank-list>
      <rank-list :rankList="newsong" :tracks="getNewSongTracks"></rank-list>
      <rank-list :rankList="hotSong" :tracks="getHotSongTracks"></rank-list>
    </div>

    <!--MV-->

    <mv-list :newMv="newMv">
      <template v-slot:title-name>热门MV</template>
    </mv-list>

    <div class="footer">
      <radio-list :radioList="radioList" class="radioList">
        <template v-slot:title-name>热门电台</template>
      </radio-list>
      <hot-singer-list class="hotsinger" :hotSinger="hotSinger">
        ><template v-slot:title-name
          ><router-link to="/singer">热门歌手</router-link></template
        >
      </hot-singer-list>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
import hotList from "./children/hotList";
import discList from "./children/discList";
import rankList from "./children/rankList";
import mvList from "./children/mvList";
import radioLis from "./children/radioList";
import RadioList from "./children/radioList";
import hotSingerList from "./children/hotSingerList";
export default {
  name: "Home",
  components: {
    hotList,
    discList,
    rankList,
    mvList,
    radioLis,
    RadioList,
    hotSingerList,
  },
  setup() {
    const store = useStore();

    //tab标签页

    //轮播图
    const banner = computed(() => {
      return store.state.home.carousel;
    });
    //热门标签
    const hot = computed(() => {
      return store.state.home.Hot;
    });

    //热门歌曲推荐
    const playListHot = computed(() => {
      return store.state.home.playListHot;
    });

    //热门新碟上架
    const discList = computed(() => {
      return store.state.home.discList;
    });
    //最新MV
    const newMv = computed(() => {
      return store.state.home.newMv;
    });
    //电台
    const radioList = computed(() => {
      return store.state.home.radioList;
    });

    const soar = computed(() => {
      return store.state.home.homeRankList;
    });

    const getTracks = computed(() => {
      return store.getters.getTracks;
    });
    const original = computed(() => {
      return store.state.home.originalList;
    });
    const newsong = computed(() => {
      return store.state.home.newSongList;
    });

    const getHotRankTracks = computed(() => {
      return store.getters.getHotRankTracks;
    });
    const getNewSongTracks = computed(() => {
      return store.getters.getNewSongTracks;
    });
    const getOriginalTracks = computed(() => {
      return store.getters.getOriginalTracks;
    });
    const getHotSongTracks = computed(() => {
      return store.getters.getHotSongTracks;
    });

    const hotSong = computed(() => {
      return store.state.home.hotSongList;
    });

    const hotSinger = computed(() => {
      return store.state.home.hotSinger;
    });

    const dataInfo = reactive({
      parmaMV: {
        area: "",
        order: "",
        type: "",
        limit: 12,
        offset: 0,
      },
      playList: {
        order: "",
        cat: "华语",
        limit: 6,
        offset: 0,
      },
    });

    onMounted(() => {
      store.dispatch("getPlayListHot", dataInfo.playList);
      store.dispatch("getNewMvList", dataInfo.parmaMV);
            store.dispatch("getCarousel");
      store.dispatch("getHot");
      // store.dispatch("getDiscList", "all");
      store.dispatch("getHotRankList", 19723756);
      store.dispatch("getNewSongList", 3779629);
      store.dispatch("getOriginalList", 2884035);
      store.dispatch("getHotSongList", 3778678);
     
      store.dispatch("getRadioList");
      store.dispatch("getHotSingerList");
    });
    return {
      banner,
      hot,
      playListHot,
      discList,
      soar,
      newMv,
      radioList,
      original,
      newsong,
      hotSong,
      hotSinger,
      getTracks,
      getHotRankTracks,
      getNewSongTracks,
      getOriginalTracks,
      getHotSongTracks,
    };
  },
};
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.rank-list {
  display: flex;
  justify-content: space-between;
}
.footer {
  display: flex;
  .radioList {
    flex: 2;
  }
  .hotsinger {
    flex: 1.5;
  }
}
</style>
