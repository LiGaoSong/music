<template>
  <div class="singer-detail" >
    <div class="singer-info">
      <el-image
        style="width: 200px; height: 200px; border-radius: 10px"
        :src="getArtists.picUrl"
      />
      <div class="singer-info-item">
        <h1 class="singer-name">
          {{ getArtists.name }}
        </h1>
        <div class="singer-briefDesc">
          <h2>
            歌手简介
            <em
              class="desc-close"
              v-if="isShowDesc"
              @click="isShowDesc = !isShowDesc"
              >X</em
            >
          </h2>
          <div class="synopsis" @click="isShowDesc = !isShowDesc">
            {{ getArtists.briefDesc }}
          </div>
          <div
            class="cover-desc-all"
            v-if="isShowDesc"
            @click="isShowDesc = !isShowDesc"
          >
            {{ getArtists.briefDesc }}
          </div>
        </div>
      </div>
    </div>
    <div class="singer-detail-tabs">
      <el-tabs v-model="activeName" class="demo-tabs" stretch>
        <el-tab-pane label="单曲" name="first">
          <div class="song-heard">
            <h4>
              歌曲列表<em>{{ getArtistsSong.length }}首歌</em>
            </h4>
            <div>
              <span class="one"
                ><i class="iconfont icon-shoucang"></i>播放全部</span
              >
              <span class="two"
                ><i class="iconfont icon-shoucang"></i>收藏</span
              >
            </div>
          </div>
          <songlist :songlist="getArtistsSong"></songlist>
        </el-tab-pane>
        <el-tab-pane label="MV" name="second">
          <div class="mvlist">
            <mv-list-item
            v-for="(item, index) in getArtistsmv"
            :key="index"
            :MvItem="item"
          ></mv-list-item>
          </div>
        </el-tab-pane>
        <el-tab-pane label="专辑" name="third">
          <album :album="getArtistsAlbum"></album>
        </el-tab-pane>
        <el-tab-pane label="歌手描述" name="fourth">
          <div class="singer-details" v-for="(item, index) in getArtistsDesc" :key="index">
          <h2>{{item.ti}}</h2>
          <div class="synopsis">
            {{ item.txt }}
          </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="相似歌手" name="fiveth">
          <hot-singer-list :hotSinger="getArtistsSimi"></hot-singer-list>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import songlist from "../../components/songlist.vue";
import mvListItem from "../../components/mvListItem";
import hotSingerList from "../home/children/hotSingerList.vue";
import album from "../../components/album";
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed, onMounted, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import HotSingerList from "../home/children/hotSingerList.vue";

export default {
  name: "SingerDetail",
  components: {
    songlist,
    mvListItem,
    hotSingerList,
    HotSingerList,
    album
},
  setup() {
    const activeName = ref("first");
    const isShowDesc = ref(false);
    const store = useStore();
    const route = useRoute();
    const getArtistsSong = computed(() => {
      return store.state.singer.artistsSong;
    });
    const getArtists = computed(() => {
      return store.state.singer.artists;
    });
    const getArtistsmv = computed(() => {
      return store.state.singer.artistsMV;
    });
    const getArtistsSimi = computed(() => {
      return store.state.singer.artistsSimi;
    });
    const getArtistsAlbum = computed(() => {
      return store.state.singer.artistsAlbum;
    });
    const getArtistsDesc = computed(() => {
      return store.state.singer.artistsDesc;
    });
    const init = (id) => {
      store.dispatch("getArtistsSong", id);
      store.dispatch("getArtistsMV", id);
      store.dispatch("getArtistsDesc", id);
      store.dispatch("getArtistsSimi", id);
      store.dispatch("getArtistsAlbum", id);
    };

    watch(() => route.query, (newVal) => {
      
      init(newVal.id);
      activeName.value = 'first'
    })

    onMounted(() => {
      init(route.query.id);
    });
    return {
      activeName,
      getArtistsSong,
      getArtistsmv,
      getArtists,
      isShowDesc,
      getArtistsDesc,
      getArtistsSimi,
      getArtistsAlbum
    };
  },
};
</script>

<style lang="scss" scoped>
.singer-detail {
  display: flex;
  flex-direction: column;
  .singer-info {
    display: flex;
    .singer-info-item {
      position: relative;
      flex: 2;
      text-align: left;
      margin-left: 20px;
      padding: 20px;
      .singer-briefDesc {
        margin-top: 10px;
        .synopsis {
          font-size: var(--text14);
          line-height: 20px;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 5; /* 这里是超出几行省略 */
          overflow: hidden;
        }
      }
      .desc-close {
        position: absolute;
        right: 10px;
        cursor: pointer;
      }
      .cover-desc-all {
        position: absolute;
        top: 86px;
        left: 10px;
        z-index: 999;
        width: calc(100% - 20px);
        padding: 10px;
        margin: -10px;
        max-height: 250px;
        line-height: 22px;
        font-size: 14px;
        white-space: pre-line;
        overflow-y: scroll;
        color: #909090;
      }
    }
  }
  .singer-detail-tabs {
    margin-top: 20px;
    padding: 20px;
    .mvlist{
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .singer-details{
      text-align: left;
      .synopsis{
        margin: 10px 0;
        font-size: var(--text14);
      }
    }
  }
}
.singer-info-item,
.singer-detail-tabs,
.cover-desc-all {
  border-radius: 10px;
  background: linear-gradient(145deg, #f6f6f6, #cfcfcf);
  box-shadow: 6px 6px 13px #bdbdbd, -6px -6px 13px #ffffff;
}
.song-heard {
  display: flex;
  justify-content: space-between;
  align-items: center;
  h4 {
    font-size: 20px;
    em {
      margin-left: 10px;
      font-size: 12px;
    }
  }
  span {
    padding: 10px;
    color: #000;
    border-radius: 50px;
    cursor: pointer;
  }
  .one {
    background-color: #f77700;
  }
  .two {
    background-color: #b9b9b9;
  }
}
::v-deep .singer{
  max-width: 100%;
  box-shadow:none;
  margin: 0;
  background: #ffffff00;

}
</style>
