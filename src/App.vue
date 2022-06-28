<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"><navbar></navbar></el-aside>
      <el-main>
        <search-input></search-input>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import { onMounted, reactive } from "@vue/runtime-core";
import { useStore } from "vuex";
import navbar from "./components/navbar";
import searchInput from "./components/searchInput";
export default {
  name: "App",
  components: {
    navbar,
    searchInput,
  },
  setup() {
    const store = useStore();

    onMounted(() => {

    });
  },
};
</script>

<style lang="scss">
#app {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family: Barlow,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Helvetica Neue,PingFang SC,Microsoft YaHei,Source Han Sans SC,Noto Sans CJK SC,WenQuanYi Micro Hei,sans-serif,microsoft uighur;
}
</style>
