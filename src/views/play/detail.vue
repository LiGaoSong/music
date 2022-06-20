<template>
  <div class="rank">
    <div class="left">
      <div class="songtop">
        <el-image
          style="width: 250px; height: 250px"
          :src="soar.coverImgUrl"
        ></el-image>
        <div class="cover-info">
          <div class="cover-title">
            <h1 class="name">{{ soar.name }}</h1>
            <span class="update-time">({{ uptime }}更新)</span>
          </div>
          <div class="cover-user">
            <div class="cover-user-item">
              <el-image
                style="width: 50px; height: 50px; border-radius: 50%"
                :src="soar.creator?.avatarUrl"
              ></el-image>
              <span class="user-name">{{ soar.creator?.nickname }}</span>
              <span class="user-date">{{ createTime }}</span>
            </div>
            <div class="tabs">
              <a
                class="tab"
                v-for="(sub, index) in soar.tags"
                :key="index"
                @click="goPlayList(sub)"
                >#{{ sub }}</a
              >
            </div>
          </div>
          <div class="cover-data">
            <span class="bofang"
              ><i class="iconfont icon-erji"></i
              >{{ numberChange(soar.playCount) }}</span
            >
            <span class="shoucang"
              ><i class="iconfont icon-shoucang"></i
              >{{ numberChange(soar.subscribedCount) }}</span
            >
            <span class="pinglu"
              ><i class="iconfont icon-24gl-bubbleDots2"></i
              >{{ numberChange(soar.commentCount) }}</span
            >
          </div>
          <div class="cover-tags">
            <h3>
              歌单简介
              <em
                class="desc-close"
                v-if="isShowDesc"
                @click="isShowDesc = !isShowDesc"
                >X</em
              >
            </h3>
            <span class="synopsis" @click="isShowDesc = true">{{
              soar.description
            }}</span>
            <div
              class="cover-desc-all"
              v-if="isShowDesc"
              @click="isShowDesc = !isShowDesc"
            >
              {{ soar.description }}
            </div>
          </div>
        </div>
      </div>
      <div class="songbottom">
        <div class="song-heard">
          <h4>
            歌曲列表<em>{{ soar.tracks?.length }}首歌</em>
          </h4>
          <div>
            <span class="one"
              ><i class="iconfont icon-shoucang"></i>播放全部</span
            >
            <span class="two"><i class="iconfont icon-shoucang"></i>收藏</span>
          </div>
        </div>
        <songlist :songlist="getTracks"></songlist>
        <div class="more">更多请登录后查看</div>
      </div>
    </div>
    <div class="right">
      <div class="recommend">
        <div class="recommend-title">相关歌单推荐</div>
        <div
          class="recommend-item"
          v-for="(item, index) in getTrelatedPlay"
          :key="index"
          @click="goPlayListDetail(item.id)"
        >
          <el-image style="width: 70px; height: 70px" :src="item.coverImgUrl" />
          <div class="recommend-name">
            <span>{{ item.name }}</span>
            <span>By.{{ item.creator?.nickname }}</span>
          </div>
        </div>
      </div>
      <div class="comments">
        <div class="recommend-title">歌单评论</div>
        <div class="comments-item"  v-for="(item, index) in getCommentPlayList" :key="index">
          <div class="user-img">
                      <el-image
            style="width: 50px; height: 50px; border-radius: 50%"
            :src="item.user?.avatarUrl"
          />
          </div>
          <div class="comments-name">
            <span class="comments-nickname">{{item.user?.nickname}} <em class="comments-time">{{item.timeStr}}</em></span>
            <span class="user-comments">{{item.content}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import songlist from "../rank/children/songlist.vue";
import dayjs from "dayjs";
import { useStore } from "vuex";
import {
  computed,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect,
} from "@vue/runtime-core";
import { useRoute, useRouter } from "vue-router";
export default {
  name: "playDetail",
  components: {
    songlist,
  },
  setup() {
    const loading = ref(false);
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const day = dayjs;

    const isShowDesc = ref(false);

    const soar = computed(() => {
      return store.state.home.homeRankList;
    });

    const getTracks = computed(() => {
      return store.getters.getHotRankTracks;
    });
    const getTrelatedPlay = computed(() => {
      return store.state.singer.trelatedPlayList;
    });
    const getCommentPlayList = computed(() => {
      return store.state.singer.commentPlayList;
    });

    const goPlayList = (sub) => {
      router.push({ path: "/playlist", query: { cat: sub } });
    };

    const goPlayListDetail = (sub) => {
      router.push({ path: "/playlist/detail", query: { rId: sub } });
    };

    watch(
      () => route.query,
      (newVal, oldVal) => {
        console.log(newVal.rId);
        init(newVal.rId);
      }
    );

    const init = (id) => {
      let rId = id;
      store.dispatch("getHotRankList", rId);
      store.dispatch("getTrelatedPlayList", rId);
      store.dispatch("getCommentPlayList", rId);
    };

    onMounted(() => {
      loading.value = "true";
      init(route.query.rId);
    });

    const uptime = ref(day(soar.updateTime).format("YYYY-MM-DD"));
    const createTime = ref(day(soar.createTime).format("YYYY-MM-DD"));

    const numberChange = (num) => {
      let num1 = String(num).split("");
      if (num1.length <= 4) {
        return num;
      } else {
        return num1.slice(0, num1.length - 4).join("") + "万";
      }
    };

    return {
      uptime,
      createTime,
      numberChange,
      soar,
      getTracks,
      goPlayList,
      loading,
      getTrelatedPlay,
      goPlayListDetail,
      isShowDesc,
      getCommentPlayList
    };
  },
};
</script>

<style lang="scss" scoped>
.rank {
  display: flex;
  .songtop {
    display: flex;
    .cover-info {
      flex: 1;
      display: flex;
      padding: 20px;
      text-align: left;
      margin-left: 20px;
      justify-content: space-between;
      flex-direction: column;
      .cover-title {
        display: flex;
        .update-time {
          line-height: 22px;
        }
      }
      .cover-user {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .cover-user-item {
          display: flex;
          align-items: center;
        }
        .tabs {
          margin-top: 10px;
          .tab {
            color: #ff641e;
            margin-right: 5px;
            cursor: pointer;
          }
        }
      }
      .cover-data {
        .bofang {
          margin-left: 0;
        }
      }
      .cover-tags {
        position: relative;
        .synopsis {
          margin: 5px 0 0 0;
          word-break: break-all;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2; /* 这里是超出几行省略 */
          overflow: hidden;
          cursor: pointer;
        }
        .desc-close {
          position: absolute;
          right: 0;
          cursor: pointer;
        }
        .cover-desc-all {
          position: absolute;
          top: 36px;
          left: 10px;
          z-index: 99;
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
  }

  .songbottom {
    text-align: left;
    padding: 20px;
    margin-top: 20px;
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
    .more {
      text-align: center;
      background-color: #f77700;
      height: 30px;
      margin: 0 auto;
      line-height: 30px;
      color: #fff;
      border-radius: 20px;
      cursor: pointer;
    }
  }
  .right {
    flex: 1;
    .comments{
      margin-top: 20px;
      .user-img{
        width: 50px;
        height: 50px;
      }
      .comments-nickname{
        color:#000;
        .comments-time{
          color:#909090,
        }
      }
      .user-comments{
        background-color: #d4d4d4e6;
        text-align: left;
        line-height: 20px;
        padding: 10px;
        border-radius: 10px;
        width: 300px;
      }
    }
  }
  .left {
    flex: 3;
    margin-right: 20px;
  }
}
span {
  display: inline-block;
  font-size: var(--text14);
  color: #909090;
  margin-left: 10px;
}
.cover-info,
.songbottom,
.recommend,
.cover-desc-all,
.comments {
  border-radius: 10px;
  background: linear-gradient(145deg, #f6f6f6, #cfcfcf);
  box-shadow: 6px 6px 13px #bdbdbd, -6px -6px 13px #ffffff;
}
.el-image {
  border-radius: 10px;
}
.iconfont {
  margin-right: 5px;
}
.recommend-title::before {
  content: "";
  width: 7px;
  height: 20px;
  margin-right: 5px;
  background-color: #f77700;
  display: inline-block;
}
.recommend-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
}

.recommend,.comments {
  display: flex;
  flex-direction: column;
  padding: 10px;
  align-items: flex-start;
  .recommend-item, .comments-item {
    display: flex;
    margin-bottom: 20px;
  }
  .recommend-item:last-child,.comments-item:last-child {
    margin-bottom: 0;
  }
  .recommend-name, .comments-name {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    cursor: pointer;
  }
}


</style>
