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
            <el-image
              style="width: 50px; height: 50px; border-radius: 50%"
              :src="soar.creator.avatarUrl"
            ></el-image>
            <span class="user-name">{{ soar.creator.nickname }}</span>
            <span class="user-date">{{ createTime }}</span>
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
            <h3>歌单简介</h3>
            <span class="synopsis">{{ soar.description }}</span>
          </div>
        </div>
      </div>
      <div class="songbottom">
        <div class="song-heard">
          <h4>
            歌曲列表<em>{{ soar.tracks.length }}首歌</em>
          </h4>
          <div>
            <span class="one"
              ><i class="iconfont icon-shoucang"></i>播放全部</span
            >
            <span class="two"><i class="iconfont icon-shoucang"></i>收藏</span>
          </div>
        </div>
        <songlist :songlist="getTracks"></songlist>
      </div>
    </div>
    <div class="right">
      <el-tabs v-model="activeName" class="demo-tabs" :stretch="true">
        <el-tab-pane label="TOP榜" name="first">
          <div
            class="type-item"
            v-for="(item, index) in listTop"
            :key="index"
            @click="selectType(item.id)"
            :class="parma.id == item.id ? 'active': ''"
          >
            <div class="item-info">
              <div class="item-title">{{ item.name }}</div>
              <div class="item-time">{{ item.updateFrequency }}</div>
            </div>

            <el-image
              :src="item.coverImgUrl"
              style="width: 50px; height: 50px"
            ></el-image>
          </div>
        </el-tab-pane>
        <el-tab-pane label="特色榜" name="second">
          <div
            class="type-item"
            v-for="(item, index) in listFeature"
            :key="index"
            @click="selectType(item.id)"
            :class="parma.id == item.id ? 'active': ''"
          
          >
            <div class="item-info">
              <div class="item-title">{{ item.name }}</div>
              <div class="item-time">{{ item.updateFrequency }}</div>
            </div>

            <el-image
              :src="item.coverImgUrl"
              style="width: 50px; height: 50px"
            ></el-image>
          </div>
        </el-tab-pane>
        <el-tab-pane label="场景版" name="third">
          <div
            class="type-item"
            v-for="(item, index) in listOther"
            :key="index"
            @click="selectType(item.id)"
            :class="parma.id == item.id ? 'active': ''"
          >
            <div class="item-info">
              <div class="item-title">{{ item.name }}</div>
              <div class="item-time">{{ item.updateFrequency }}</div>
            </div>

            <el-image
              :src="item.coverImgUrl"
              style="width: 50px; height: 50px"
            ></el-image>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import songlist from "./children/songlist.vue";
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
  name: "Rank",
  components: {
    songlist,
  },
  setup() {
    const activeName = ref("first");
    const router = useRouter();
    const route = useRoute();
    const songInfo = reactive({
      parma: {
        id: "19723756",
        s: 8,
        offset: 0,
      },
      rId: 0,
      listTop: [],
      listFeature: [],
      listOther: [],
    });
    const day = dayjs;
    const store = useStore();
    const soar = computed(() => {
      return store.state.home.homeRankList;
    });
    const getTracks = computed(() => {
      return store.getters.getHotRankTracks;
    });
    const getToplist = computed(() => {
      return store.state.singer.toplist;
    });

    const listTop = computed(() => {
      return (songInfo.listTop = getToplist.value.filter((item) => {
        return item.ToplistType;
      }));
    });

    const listFeature = computed(() => {
      return (songInfo.listFeature = getToplist.value.filter((item) => {
        return !item.ToplistType && item.name.indexOf("云音乐") >= 0;
      }));
    });

    const listOther = computed(() => {
      return (songInfo.listOther = getToplist.value.filter((item) => {
        return !item.ToplistType && item.name.indexOf("云音乐") < 0;
      }));
    });

    const uptime = ref(day(soar.value.updateTime).format("YYYY-MM-DD"));
    const createTime = ref(day(soar.value.createTime).format("YYYY-MM-DD"));

    const numberChange = (num) => {
      let num1 = String(num).split("");
      if (num1.length <= 4) {
        return num;
      } else {
        return num1.slice(0, num1.length - 4).join("") + "万";
      }
    };

    const selectType = (id) => {
      console.log(id);
      router.push({ path: "/rank", query: { rId: id } });
    };

    watch(
      () => route.query,
      (newVal, oldVal) => {
        console.log(newVal);
        songInfo.parma.id = newVal.rId;
        songInfo.parma.offset = 0;
        store.dispatch("getHotRankList", songInfo.parma.id);
      }
    );

    watchEffect(() => {
      songInfo.parma.id = route.query.rId;
      songInfo.parma.offset = 0;
      store.dispatch("getHotRankList", songInfo.parma.id);
    });

    const init = () => {
      store.dispatch("getHotRankList", songInfo.parma.id);
      store.dispatch("getToplist");
    };

    onMounted(() => {
      init();
    });

    return {
      ...toRefs(songInfo),
      soar,
      getTracks,
      uptime,
      createTime,
      numberChange,
      activeName,
      listTop,
      listFeature,
      listOther,
      selectType,
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
      }
      .cover-data {
        .bofang {
          margin-left: 0;
        }
      }
      .cover-tags {
        .synopsis {
          margin: 5px 0 0 0;
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
  }
  .right {
    flex: 1;
    padding: 20px;

    .type-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: calc(50% - 60px);
      padding: 10px 20px;
      margin: 0 10px 20px;
      
      border-radius: 12px;
      opacity: 0.8;
      cursor: pointer;
      box-shadow: 0 20px 27px rgb(0 0 0 / 5%);
      .item-info {
        margin-right: 5px;
      }
    }
  }
  .left {
    flex: 2.5;
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
.right {
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
.el-tab-pane {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.active {
  opacity: 1;
  background-color: #f77700;

}
</style>
