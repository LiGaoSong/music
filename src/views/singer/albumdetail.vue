<template>
  <div class="radion-detail">
    <div class="left">
      <div class="album-info">
        <el-image
          style="width: 280px; height: 280px; border-radius: 10px;box-shadow: 6px 6px 13px #bdbdbd;"
          :src="getAlbumDetail.blurPicUrl"
        />
        <div class="album-detail">
          <h1 class="album-name">{{ getAlbumDetail.name }}</h1>
          <div class="album-singer">
            <div>
              <span
                class="album-singername"
                v-for="(sub, index) in getAlbumDetail.artists"
                :key="index"
                >{{ sub.name + "&nbsp;" }}</span
              >
            </div>
            <span class="album-singerinfo">{{ getAlbumSongs.length}}</span>
          </div>
          <div class="tabs">
            <div class="album-introduce"  @click="isShowDesc = !isShowDesc">
              {{ getAlbumDetail.description }}
            </div>
            <div class="cover-desc-all" @click="isShowDesc = !isShowDesc" v-if="isShowDesc">
              <h1>专辑介绍</h1>
              {{ getAlbumDetail.description }}
            </div>
          </div>
        </div>
      </div>
      <songlist :songlist="getAlbumSongs"></songlist>
      <div class="song-footer">
        <div class="publishTime">发布于{{formattime(getAlbumDetail.publishTime)}}</div>
        <div class="company">© {{getAlbumDetail.company}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import songlist from "../../components/songlist";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed, onMounted, ref } from "@vue/runtime-core";
export default {
  name: "RadioDetail",
  components:{
    songlist
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const day = dayjs;
    const isShowDesc = ref(false);
    const getAlbumSongs = computed(() => {
      return store.state.singer.albumSongs;
    });
    const getAlbumDetail = computed(() => {
      return store.state.singer.albumDetail;
    });

    const formattime = (timeee) => {
      return day(timeee).format("YYYY-MM-DD")
    }
    const init = (id) => {
      store.dispatch("getAlbumDetail", id);
    };
   
    onMounted(() => {
      init(route.query.id);
    });

    return {
      getAlbumSongs,
      getAlbumDetail,
      formattime,
      isShowDesc,
    };
  },
};
</script>

<style lang="scss" scoped>
.radion-detail {
  .left {
    .album-info {
      display: flex;
      flex-direction: row;
      .album-detail {
        flex: 1;
        padding: 20px;
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        .album-name {
          font-size: 50px;
          font-weight: 700;
        }
        .album-singer {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .album-singername {
            margin-bottom: 5px;
            font-size: var(--text18);
            font-weight: 600;
          }
          span {
            display: inline-block;
            color: #909090;
          }
        }
        .tabs {
          .album-introduce {
            position: relative;
            font-size: var(--text14);
            word-break: break-all;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3; /* 这里是超出几行省略 */
            overflow: hidden;
            color: #909090;
            cursor: pointer;
            text-align: left;
          }
          .cover-desc-all {
            text-align: left;
            font-size: var(--text14);
            padding: 20px;
            background-color: #f3f3f3;
             color: #909090;
            position: absolute;
            top:280px;
            z-index: 99;
            border-radius: 10px;

            cursor: pointer;
            h1{
              color:#000000;
              margin-bottom: 10px;
            }
          }
        }
      }
    }
    .song-footer{
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      opacity: .48;
    }
  }
}
</style>
