<template>
  <div class="item"  @click="goPlayListDetail(hotList.id)">
    <div class="img-item">
      <el-image :src="hotList.coverImgUrl" />
      <span class="item-tab"
        ><i class="iconfont icon-erji"></i
        >{{ numberChange(hotList.playCount) }}/{{ hotList.trackCount }}首</span
      >
    </div>
    <div class="info">
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="hotList.name"
        placement="bottom-start"
      >
        <p class="info-name">{{ hotList.name }}</p>
      </el-tooltip>

      <div class="tabs">
        <!-- <router-link class="tab" :to="{path:'/palylist', query:{cat:sub}}"  v-for="(sub, index) in hotList.tags" :key="index">#{{ sub }}</router-link> -->
        <a
          class="tab"
          v-for="(sub, index) in hotList.tags"
          :key="index"
         @click.stop="goPlayList(sub)"
          >#{{ sub }}</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { reactive } from "vue";
import { useStore } from 'vuex';
export default {
  name: "HotListItem",
  props: {
    hotList: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup() {
    const router = useRouter();
    const route = useRoute()
    const numberChange = (num) => {
      let num1 = String(num).split("");
      if (num1.length <= 4) {
        return num;
      } else {
        return num1.slice(0, num1.length - 4).join("") + "万";
      }
    };

    const goPlayList = (sub) => {
      router.push({path:'/playlist',query:{cat:sub}})
    };

    const goPlayListDetail = (sub) => {
      router.push({path:'/playlist/detail',query:{rId:sub}})
    }

    return {
      numberChange,
      goPlayList,
      goPlayListDetail
    };
  },
};
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  width: calc(100% / 8 + 28px);
  margin: 20px;
  cursor: pointer;
  .item-tab {
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(145deg, #f6f6f607, #4b4b4b9a);
    width: 90%;
    text-align: right;
    font-size: var(--text14);
    color: #ffffff;
  }
}
.info {
  margin-top: 10px;
  font-size: var(--text14);
  text-align: left;
  .info-name {
    height: 35px;
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2; /* 这里是超出几行省略 */
    overflow: hidden;
  }
  .tabs {
    margin-top: 10px;
    .tab {
      color: #ff641e;
      margin-right: 5px;
    }
  }
}
.hotitem {
  display: flex;
}

.el-image {
  border-radius: 5px;
  transition: all 0.4s linear;
}
.item:hover {
  .el-image {
    transform: scale(1.1);
  }
}

.iconfont {
  margin-right: 5px;
}
</style>
