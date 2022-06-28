<template>
  <div class="hot">
    <h1 class="title-name"><slot name="title-name"></slot></h1>
    <div class="tabs">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane
          :label="item.name"
          :name="index"
          v-for="(item, index) in hot"
          :key="item.id"
        >
          <hot-list-item
            v-for="(item, index) in playListHot"
            :key="index"
            :hotList="item"
          ></hot-list-item>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { ref,reactive } from "@vue/reactivity";
import { useStore } from "vuex";

import hotListItem from "../../../components/hotListItem";
export default {
  name: "HotList",
  props: {
    hot: {
      type: Object,
      default() {
        return {};
      },
    },
    playListHot: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    hotListItem,
  },
  setup() {
    const store = useStore();
    const activeName = ref("0");

    const dataInfo = reactive({
      playList: {
        order: "",
        cat: "华语",
        limit: 6,
        offset: 0,
      },
    });

    const handleClick = (tab) => {
      dataInfo.playList.cat = tab.props.label
      store.dispatch("getPlayListHot", dataInfo.playList);
    };

    return {
      handleClick,
      activeName,
    };
  },
};
</script>
<style lang="scss" scoped>
.hot {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  .title-name {
    text-align: left;
    margin-right: 20px;
    width: 365px;
  }
}
.el-tab-pane {
  display: flex;
}
</style>
