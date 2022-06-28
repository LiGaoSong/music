<template>
  <div class="singer">
    <h1 class="title-name"><slot name="title-name"></slot></h1>
    <div class="tabs">
      <div class="singer-name" v-for="(item, index) in hotSinger" :key="index">
      <h2 class="name">{{ item.name }}</h2>
        <el-image
          style="width: 100px; height: 100px"
          :src="item.picUrl"
          @click="goSingerDeatil(item.id)"
        >
        </el-image>
        
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
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
    const router = useRouter();
    const goSingerDeatil = (id) => {
      router.push({ path: "/singer/detail", query: { id } });
    };
    return { goSingerDeatil };
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
  .tabs {
    margin-top: 20px;
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    .singer-name {
      position: relative;
      .name {
        display: block;
        position: absolute;
        color:#909090;
        top: 10%;
        left: 13%;
      }
    }
  }
  .carouselimg {
    display: flex;
  }
}
.el-image {
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  transition: all 0.3s ease-in;
}
// .singer-name:hover {
//   .el-image{
//     opacity: 0;
//   }
//   .name {
//     transform: scale(2.1);
//     opacity: 1;
    
//   }
// }
.el-image:hover{
   opacity: 0;
}
</style>
