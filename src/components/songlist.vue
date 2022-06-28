<template>
  <div class="songlist">
    <el-scrollbar height="550px">
      <div
        class="song"
        v-for="(item, index) in songlist"
        :key="index"
        @click="goSong(item.id)"
      >
        <div class="songinfo">
          <el-image
            style="width: 50px; height: 50px; border-radius: 10px"
            :src="item.al.picUrl"
            lazy 
          />
          <div class="song-name">
            <span class="song-name1">{{ item.name }}</span>
            <span class="song-name2">{{ item.ar[0]?.name }}</span>
          </div>
        </div>
        <div class="sone-album">
          <span>{{ item.al?.name }}</span>
        </div>
        <div class="sone-duration">
          <span>{{ formatDuring(item.dt) }}</span>
        </div>
      </div>
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
  setup(props) {
    function addzero(num) {
      if (parseInt(num) < 10) {
        return (num = "0" + num);
      } else {
        return num;
      }
    }
    const formatDuring = (millisecond) => {
      let minutes = addzero(
        parseInt((millisecond % (1000 * 60 * 60)) / (1000 * 60))
      );
      let seconds = addzero(parseInt((millisecond % (1000 * 60)) / 1000));
      return minutes + ":" + seconds;
    };

    console.log(formatDuring(256000));

    const goSong = (id) => {
      alert(id + "点什么点");
    };
    return {
      formatDuring,
      goSong,
    };
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
  .song {
    margin-bottom: 10px;
    padding: 5px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    font-size: var(--text14);
    cursor: pointer;
    .songinfo {
      display: flex;
      flex: 1;
      .song-name {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-left: 10px;
        align-items: flex-start;
        .song-name1 {
          font-size: var(--text16);
          font-weight: 600;
        }
        .song-name2 {
          font-size: 12px;
        }
        span {
          display: inline-block;
        }
      }
    }
    .sone-album {
      flex: 1;
      font-size: 12px;

    }
  }
  .song:hover {
    background-color: #f1f1f1;
    border-radius: 10px;
  }
}
</style>
