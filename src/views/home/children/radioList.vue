<template>
  <div id="radiolist">
    <h1><slot name="title-name"></slot></h1>
    <div class="radilInfo">
      <div class="radilInfo" v-for="(item, index) in radioList" :key="index">
        <div class="radioimg">
          <el-image :src="item.picUrl"></el-image>
        </div>
        <div class="radioname">
          <h1><i class="iconfont icon-shouyinji"></i>{{ item.name }}</h1>
          <p>{{ item.rcmdtext }}</p>
          <div class="radioname-item">
            <p>共{{ item.programCount }}期</p>
            <p>订阅{{ numberChange(item.subCount) }}次</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RadioList",
  props: {
    radioList: {
      type: Array,
      default() {
        return [];
      },
    },
  },

  setup() {
    const numberChange = (num) => {
      let num1 = String(num).split("");
      if (num1.length <= 4) {
        return num1;
      } else {
        return num1.slice(0, num1.length - 4).join("") + "万";
      }
    };
    return{
      numberChange
    }
  },
};
</script>

<style lang="scss" scoped>
#radiolist {
  text-align: left;
  margin-top: 20px;
  overflow: hidden;
  padding: 20px;
  border-radius: 10px;
  background: linear-gradient(145deg, #f6f6f6, #cfcfcf);
  box-shadow: 6px 6px 13px #bdbdbd, -6px -6px 13px #ffffff;
  .radilInfo {
    display: flex;
    margin: 10px 0;
    flex-wrap: wrap;
    margin-right: 10px;

    cursor: pointer;
    justify-content: space-between;
    .radioimg {
      margin-right: 20px;
      width: 100px;
      height: 100px;
    }
    .radioname {
      width: 200px;
      display: flex;
      flex-direction: column;
      height: 100px;
      justify-content: space-around;
      border-bottom: 1px solid #d3d3d3;
      .radioname-item {
        display: flex;
        justify-content: space-between;
      }
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
