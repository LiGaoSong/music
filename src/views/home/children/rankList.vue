<template>
  <div id="rank">
    <div class="rank-top">
      <h1 @click="goRank(rankList.id)">{{ rankList.name }}</h1>
      <p>最近更新：{{ uptime }}</p>
    </div>
    <div
      class="rank-bottom"
      v-for="(item, index) in tracks.slice(0, 6)"
      :key="index"
    >
      <div class="songimg">
        <el-image :src="item.al.picUrl"></el-image>
      </div>
      <div class="rankname">
        <p>{{ item.name }}</p>
        <div class="singger">
          <span v-for="(sub, index) in item.ar.slice(0, 1)" :key="index">{{
            sub.name
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { ref } from "@vue/reactivity";
import { useRouter } from 'vue-router';
export default {
  name: "RankList",
  props: {
    rankList: {
      type: Object,
      default() {
        return {};
      },
    },
    tracks: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(props) {
    const day = dayjs;
    const router = useRouter()

    const uptime = ref(day(props.rankList.updateTime).format("YYYY-MM-DD"));

    const goRank = (id) => {
      router.push({path:'/rank', query:{rId: id}})
    }

    return {
      uptime,
      goRank
    };
  },
};
</script>

<style lang="scss" scoped>
#rank {
  text-align: left;
  margin-top: 20px;
  min-width: 20%;
  max-height: 520px;
  overflow: hidden;
  padding: 20px;
  border-radius: 10px;
  h1 {
    margin-bottom: 10px;
    cursor: pointer;
  }
  .rank-bottom {
    margin-top: 20px;
    display: flex;
    font-size: var(--text14);
    .songimg {
      width: 48px;
      height: 48px;
      margin-right: 20px;
    }
    .rankname {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      cursor: pointer;
      .singger {
        display: flex;
      }
      p {
        display: block;
        margin-bottom: 5px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: all 0.3s ease-in;
      }
    }
  }
}
.rank-bottom:hover {
  p {
    color: #ffa704;
    transform: translate(15px, 0);
    transition: all 0.3s ease-in;
  }
}
.el-image {
  border-radius: 5px;
}
</style>
