<template>
  <div class="mv">
    <h1 class="title-name"><slot name="title-name"></slot></h1>
    <div class="tabs">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane
          :label="item.name"
          :name="index"
          v-for="(item, index) in discInfoList"
          :key="item.id"
        >
            <mv-list-item  v-for="(sub, index) in newMv" :key="index" :MvItem="sub"></mv-list-item>

        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import mvListItem from "../../../components/mvListItem";
import { ref, reactive, toRefs } from "@vue/reactivity";
import { useStore } from "vuex";
export default {
  name: "MvList",
  props: {
    newMv: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components:{
    mvListItem
  },
  setup() {
    const store = useStore();
    const activeName = ref("0");
    const discInfo = reactive({
      discInfoList: [
        { name: "全部" },
        { name: "内地" },
        { name: "港台" },
        { name: "欧美" },
        { name: "日本" },
        { name: "韩国" },
      ],
    });
    const mvInfo = reactive({
      parma: {
        area: "",
        order: "",
        type: "",
        limit: 12,
        offset: 0,
      },
    });
    const handleClick = (tab) => {
      mvInfo.parma.area = tab.props.label
      store.dispatch("getNewMvList", mvInfo.parma);
    };


    return {
      handleClick,
      activeName,
      ...toRefs(discInfo),
    };
  },
};
</script>
<style lang="scss" scoped>
.mv {
  margin-top: 20px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 10px;
  border-radius: 10px;
  background: linear-gradient(145deg, #f6f6f6, #cfcfcf);
  box-shadow: 6px 6px 13px #bdbdbd, -6px -6px 13px #ffffff;
  .title-name {
    text-align: left;
    margin-right: 20px;
    width: 365px;
  }
}
.el-tab-pane {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

</style>
