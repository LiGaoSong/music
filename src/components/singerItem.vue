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
          <h2>{{ item.name }} </h2>
         
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
  margin: 0 40px 20px;
  align-items: center;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  


  .item-info {
    margin-left: 10px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    text-align: left;
    h2{
      font-size: var(--text18);
    }
      .details {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  }
}

.el-image {
  border-radius: 5px;
  margin-top: 3px;
}
span {
  display: block;
  margin-right: 5px;
}

.item:hover {
  transform: translateY(-5px);
 box-shadow: 0px 4px 5px #bdbdbd;
}
</style>
