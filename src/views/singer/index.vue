<template>
  <div class="singer">
    <div class="singerInfo">
      <singer-item :singer="Singer"></singer-item>
    
        <el-button type="primary"  @click="PreviousPage" :disabled="parma.offset == 0"
          >上一页</el-button
        >
        <el-button type="primary" @click="NextPage"
          >下一页</el-button>

    </div>

    <div class="singerdetail">
      <div class="top filter-item">
        <span
          v-for="(item, index) in renderInitial"
          :key="index"
          :class="index === initialIndex ? 'active' : ''"
          @click="selectType('initial', index)"
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
import { useStore } from "vuex";
import singerItem from "../../components/singerItem.vue";
import { computed, onMounted, reactive, toRefs } from "@vue/runtime-core";
export default {
  name: "Singer",
  components: {
    singerItem,
  },
  setup() {
    const store = useStore();
    const info = reactive({
      type: [
        { label: "全部", val: -1 },
        { label: "男歌手", val: 1 },
        { label: "女歌手", val: 2 },
        { label: "乐队", val: 3 },
      ],
      area: [
        { label: "全部", val: -1 },
        { label: "华语", val: 7 },
        { label: "欧美", val: 96 },
        { label: "日本", val: 8 },
        { label: "韩国", val: 16 },
        { label: "其他", val: 0 },
      ],
      initial: [
        { label: "热门", val: -1 },
        { label: "#", val: 0 },
      ],
      parma: {
        type: "-1",
        area: "-1",
        initial: "-1",
        limit: 18,
        offset: 0,
      },
      list:[],
      typeIndex: 0,
      areaIndex: 0,
      initialIndex: 0,
    });

    const selectType = (label, index) => {
      info[label + "Index"] = index;
      info.list = []
      info.parma.offset = 0
      info.parma[label] = info[label][index].val;
      init();
    };

    const init = () => {
      store.dispatch("getSinger", info.parma);
    };

    const renderInitial = computed(() => {
      let alphabet = [];
      for (let i = 0; i < 26; i++) {
        alphabet.push({
          label: String.fromCharCode(65 + i),
          val: String.fromCharCode(97 + i),
        });
      }
      return (info.initial = [info.initial[0], ...alphabet, info.initial[1]]);
    });

    const PreviousPage = () => {
      if (info.parma.offset <= 0) {
        return;
      } else {
        info.parma.offset -= 18;
        init();
      }
    };
    const NextPage = () => {
      info.parma.offset += 18;
      init();
    };

    const Singer = computed(() => {
      return store.state.singer.singer;
    });
    onMounted(() => {
      init();
    });

    return {
      ...toRefs(info),
      renderInitial,
      Singer,
      PreviousPage,
      selectType,
      NextPage,
    };
  },
};
</script>

<style lang="scss" scoped>
.singer {
  display: flex;
  margin-top: 20px;
  .singerInfo {
    flex: 3;
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
