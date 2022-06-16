<template>
  <div class="songlist" >
    <el-scrollbar height="550px">
      <el-table :data="songlist" style="width: 100%" stripe height="550" >
        <el-table-column type="index" width="100" label="序号" />
        <el-table-column prop="name" label="歌曲" />
        <el-table-column prop="ar[0].name" label="歌手"/>
        <el-table-column prop="al.name" label="专辑"/>
      </el-table>
    </el-scrollbar>
  </div>
</template> 

<script>
export default {
  name: "Rank",
  props: {
    songlist: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.songlist {
  padding: 20px;

  .scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
  }
  ::v-deep .cell {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
