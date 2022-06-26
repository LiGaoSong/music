<template>
  <div class="singer">
    <h1 class="title-name"><slot name="title-name"></slot></h1>
    <div class="tabs">
      <el-tooltip
        class="box-item"
        effect="dark"
        :content="item.name"
        placement="bottom-start"
        v-for="(item, index) in hotSinger"
        :key="index"
      >
        <el-image
          style="width: 100px; height: 100px"
          :src="item.picUrl"
          @click="goSingerDeatil(item.id)"
        />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: "HotSingerList",
  props: {
    hotSinger: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  setup() {

    const router = useRouter()
    const goSingerDeatil = (id) => {
      router.push({path:'/singer/detail', query:{id}})
    }
    return {goSingerDeatil};
  },
};
</script>
<style lang="scss" scoped>
.singer {
  max-width: 40%;
  text-align: left;
  margin-top: 20px;
  margin-left: 20px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  padding: 20px;
  border-radius: 10px;
  background: linear-gradient(145deg, #f6f6f6, #cfcfcf);
  box-shadow: 6px 6px 13px #bdbdbd, -6px -6px 13px #ffffff;
  .tabs {
    margin-top: 20px;
    width: 100%;
  }
  .carouselimg {
    display: flex;
  }
}
.el-image {
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
}
 .el-image :hover {
    transform: scale(1.2);
    transition: all 0.3s ease-in;
}
</style>
