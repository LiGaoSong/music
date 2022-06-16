<template>
  <div class="mv">
    <div class="singerInfo">
      <mv-list-item
        v-for="(item, index) in allMV"
        :key="index"
        :MvItem="item"
      ></mv-list-item>

      <el-button
        type="primary"
        @click="PreviousPage"
        :disabled="parma.offset == 0"
        >上一页</el-button
      >
      <el-button type="primary" @click="NextPage"
        >下一页</el-button>
    </div>

    <div class="singerdetail">
      <div class="top filter-item">
        <span
          v-for="(item, index) in order"
          :key="index"
          :class="index === orderIndex ? 'active' : ''"
          @click="selectType('order', index)"
          >{{ item.label }}</span
        >
      </div>
      <div class="center filter-item">
        <span
          v-for="(item, index) in area"
          :key="index"
          :class="index === areaIndex ? 'active' : ''"
          @click="selectType('area', index)"
          >{{ item.label }}</span
        >
      </div>
      <div class="bottom filter-item">
        <span
          v-for="(item, index) in type"
          :key="index"
          :class="index === typeIndex ? 'active' : ''"
          @click="selectType('type', index)"
          >{{ item.label }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";
import mvListItem from "../../components/mvListItem";
import MvListItem from "../../components/mvListItem.vue";
export default {
  name: "Rank",
  components: {
    mvListItem,
    MvListItem,
  },
  setup() {
    const store = useStore();
    const info = reactive({
      area: [
        { label: "全部", val: "all" },
        { label: "内地", val: "ch" },
        { label: "港台", val: "hk" },
        { label: "欧美", val: "us" },
        { label: "日本", val: "jp" },
        { label: "韩国", val: "kb" },
      ],
      order: [
        { label: "上升最快", val: "top" },
        { label: "最热", val: "hot" },
        { label: "最新", val: "new" },
      ],
      type: [
        { label: "全部", val: "all" },
        { label: "官方版", val: "official " },
        { label: "原生", val: "primordial" },
        { label: "现场版", val: "scene" },
        { label: "网易出品", val: "netease" },
      ],
      parma: {
        area: "",
        order: "",
        type: "",
        limit: 24,
        offset: 0,
      },
      list: [],
      areaIndex: 0,
      orderIndex: 0,
      typeIndex: 0,
    });
    const selectType = (label, index) => {
      info[label + "Index"] = index;
      info.list = [];
      info.parma.offset = 0;
      info.parma[label] = info[label][index].label;
      init();
    };

    const init = () => {
      store.dispatch("getNewMvList", info.parma);
    };

    const allMV = computed(() => {
      return store.state.home.newMv;
    });

    const PreviousPage = () => {
      if (info.parma.offset <= 0) {
        return;
      } else {
        info.parma.offset -= 24;
        init();
      }
    };
    const NextPage = () => {
      info.parma.offset += 24;
      init();
    };

    onMounted(() => {
      init();
    });
    return {
      ...toRefs(info),
      selectType,
      allMV,
      PreviousPage,
      NextPage
    };
  },
};
</script>

<style lang="scss" scoped>
.mv {
  display: flex;
  margin-top: 20px;
  .singerInfo {
    flex: 3;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .singerdetail {
    text-align: left;
    height: 200px;
    font-size: var(--text14);
    flex: 1;
    padding: 20px;
    border-radius: 10px;
    background: linear-gradient(145deg, #f6f6f6, #cfcfcf);
    box-shadow: 6px 6px 13px #bdbdbd, -6px -6px 13px #ffffff;
    .filter-item {
      margin-bottom: 20px;
      cursor: pointer;
    }
    span {
      display: inline-block;
      padding: 0 12px;
      margin-bottom: 5px;
      border-radius: 5px;
    }
  }
}
.active {
  background: linear-gradient(145deg, #e69200, #ffad00);
}
.el-button--primary{
  border:none;
  color: #555555;
   background: linear-gradient(145deg, #f6f6f6, #cfcfcf);
}
</style>
