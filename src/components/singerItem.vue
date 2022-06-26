<template>
  <div class="maix-box">
    <div class="item" v-for="(item, index) in singer" :key="index" @click="goSingerDetail(item.id)">
      <div class="item-img">
        <el-image
          style="width: 100px; height: 100px"
          :src="item.picUrl"
        ></el-image>
      </div>
      <div class="item-info">
        <div class="name">
          <span>{{ item.name }} <i class="iconfont icon-shoucang"></i></span>
        </div>
        <div class="details">
          <span
            ><p>专辑</p>
            {{ item.albumSize }}</span
          >
          <span
            ><p>单曲</p>
            {{ item.musicSize }}</span
          >
          <span><p>粉丝</p>—</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: "SingerItem",
  props: {
    singer: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  setup(){
    const router = useRouter()

    const goSingerDetail = (id) => {
      router.push({path:'/singer/detail', query:{id}})
    }
    return{
      goSingerDetail
    }
  }
};
</script>

<style lang="scss" scoped>
.maix-box {
  display: flex;
  flex-wrap: wrap;
}
.item {
  display: flex;
  height: 100px;
  width: calc(100% / 3 - 80px);
  border-radius: 10px;
  background: linear-gradient(145deg, #f6f6f6, #cfcfcf);
  box-shadow: 6px 6px 13px #bdbdbd, -6px -6px 13px #ffffff;
  margin: 0 40px 20px;
  align-items: center;
  transition: all 0.4s ease-in-out;
  cursor: pointer;
  .item-img {
    margin-left: -20px;
    transition: all 0.4s ease-in-out;
  }
  .details {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    width: 100%;
  }
  .item-info {
    width: 100%;
    padding: 0 20px;
    text-align: left;
  }
}

.el-image {
  border-radius: 5px;
  transition: all 0.4s ease-in-out;
}
span {
  display: block;
  margin-right: 5px;
}

.item:hover {
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  background: linear-gradient(145deg, #fffefc8f, #ff89028e);
  .el-image {
    border-radius: 50%;
    transition: all 0.4s ease-in-out;
  }
  .item-img {
    margin-left: 10px;
  }
}
</style>
