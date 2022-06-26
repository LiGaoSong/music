<template>
  <div class="item" @click="goMvDetail(MvItem.id)">
    <div class="img-item" >
      <el-image :src="MvItem.cover ? MvItem.cover : MvItem.imgurl" />
      <i class="iconfont icon-bofang"></i>
    </div>
    <div class="info">
      <p class="info-name">{{ MvItem.name }}</p>
      <p class="info-name info-huise">{{ MvItem.artistName }}</p>
      <p class="info-name info-huise">
        <i class="iconfont icon-shipinbofang"></i
        >{{ numberChange(MvItem.playCount) }}
      </p>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  name: "MvListItem",
  props: {
    MvItem: {
      type: Object,
      default(){
          return {}
      }
    },
  },
  setup() {

    const router = useRouter()
    const numberChange = (num) => {
      let num1 = String(num).split("");
      if (num1.length <= 4) {
        return num;
      } else {
        return num1.slice(0, num1.length - 4).join("") + "万";
      }
    };
    
    const goMvDetail = (mvid) => {
      router.push({path:'/mvlist/detail', query:{mvid}})
    }

    return {
      numberChange,
      goMvDetail
    };
  },
};
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  width: calc(100% / 6 - 40px);
  margin: 20px;
  cursor: pointer;
  .item-tab {
    position: absolute;
    top: 0;
    right: 0;
    background: linear-gradient(145deg, #f6f6f607, #b6b6b6);
    width: 90%;
    text-align: right;
    font-size: var(--text14);
  }
}
.info {
  margin-top: 10px;
  font-size: var(--text14);
  text-align: left;
  .info-name {
    height: 20px;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  .info-huise {
    color: #999999;
  }
  .tabs {
    margin-top: 10px;
    .tab {
      color: #ff641e;
      margin-right: 5px;
    }
  }
}
.el-image {
  border-radius: 5px;
  transition: all 0.4s linear;
}
.item:hover {
  .el-image {
    transform: scale(1.1);
  }
  .icon-bofang{
    transform: scale(2.1);
    opacity: 1;
}
}
.iconfont {
  margin-right: 5px;
}
.icon-bofang{
  position: absolute;
  top:25%;
  left: 45%;
  color:#ffffff;
  transition: all 0.4s linear;
  opacity: 0;
}
</style>
