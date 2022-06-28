<template>
  <div class="disc">
    <h1 class="title-name">新碟上架</h1>
    <div class="tabs">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane
          :label="item.name"
          :name="item.area"
          v-for="(item, index) in discInfoList"
          :key="index"
        >
          <div class="item" v-for="(item, index) in discList.slice(0,12)" :key="index">
            <div class="img-item">
              <el-image
                :src="item.blurPicUrl"
              />
            </div>
            <div class="info">
              <p class="info-name">{{item.name}}</p>
              <p class="info-name">{{item.artist.name}}</p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from "@vue/reactivity";
import { useStore } from 'vuex';

export default {
  name: "DiscList",
  props:{
      discList:{
          type:Array,
          default(){
              return []
          }
      }
  },
  setup() {
    const activeName =ref('ALL')
    const store = useStore()
    const discInfo = reactive({
      discInfoList: [
        { area: 'ALL', name: "全部" },
        { area: 'ZH', name: "华语" },
        { area: 'EA', name: "欧美" },
        { area: 'KR', name: "韩国" },
        { area: 'JP', name: "日本" },
      ],
    });

    const handleClick = (tab) => {
        store.dispatch("getDiscList", tab.props.name)
        console.log(tab);
    }
    return {
        activeName,
        ...toRefs(discInfo),
        handleClick
    };
  },
};
</script>

<style lang="scss" scoped>
.disc {
  margin-top: 40px;
  display: flex;
  align-items: flex-start;
  padding: 10px;
  border-radius: 10px;
  .title-name {
    text-align: center;
    margin-right: 20px;
    width: 1800px;
  }
  .item {
    position: relative;
    max-width: calc(20% - 20px);
    margin: 20px 10px 0;
    display: flex;
    flex: 25%;
    background-color: #f0f0f0;
    border-radius: 10px;
    .img-item {
      width: 30%;
      height: 30%;
      margin-right: 30px;
    }
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
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    .info-name {
      margin-bottom: 10px;
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
.el-tab-pane {
  display: flex;
  flex-wrap: wrap;
}
.el-image {
  border-radius: 5px;
}
</style>
