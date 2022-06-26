<template>
  <div id="albumlist">
    <div class="albumInfo">
      <div class="albumInfo" v-for="(item, index) in album" :key="index"  @click="goAlbumDetail(item.id)">
        <div class="albumimg">
          <el-image :src="item.picUrl"></el-image>
        </div>
        <div class="albumname">
          <h1><i class="iconfont icon-shouyinji"></i>{{ item.name }}</h1>
          <p v-for="(sub,index) in item.artists" :key="index">{{ sub.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: "albumList",
  props: {
    album: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  setup() {
    const router = useRouter()
    const numberChange = (num) => {
      let num1 = String(num).split("");
      if (num1.length <= 4) {
        return num1;
      } else {
        return num1.slice(0, num1.length - 4).join("") + "万";
      }
    };
    const goAlbumDetail = (id) => {
        console.log(id);
        router.push({path:'/album/detail'})
    }
    return{
      numberChange,
      goAlbumDetail
    }
  },
};
</script>

<style lang="scss" scoped>
#albumlist {
  text-align: left;
  overflow: hidden;
  .albumInfo {
    display: flex;
    margin: 10px 0;
    flex-wrap: wrap;
    margin-right: 10px;

    cursor: pointer;
    justify-content: space-between;
    .albumimg {
      margin-right: 20px;
      width: 100px;
      height: 100px;
    }
    .albumname {
      width: 200px;
      display: flex;
      flex-direction: column;
      height: 100px;
      justify-content: space-around;
      border-bottom: 1px solid #d3d3d3;
    }
  }
}
.el-image {
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.iconfont {
  margin-right: 5px;
}
</style>
