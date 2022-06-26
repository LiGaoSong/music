<template>
  <div class="mv-detail">
    <div class="mv-main">
      <div class="mv-title">
        <span class="mv-title-mv">MV</span>
        <h1 class="mv-title-song">{{ getMvDetail.name }}</h1>
        <h3
          class="mv-title-singer"
          @click="goSingerDetail(getMvDetail.artistId)"
        >
          {{ getMvDetail.artistName }}
        </h3>
      </div>
      <div class="mv-video">
        <video class="video-main" :src="getMvUrl.url" controls></video>
      </div>
      <div class="mv-comment">
        <div class="comment-hd">
          <h1>评论</h1>
          <h3>共{{ getMvDetail.commentCount }}条评论</h3>
        </div>
        <div class="comment-textarea">
          <el-input
            v-model="textarea"
            :rows="5"
            type="textarea"
            maxlength="150"
            show-word-limit
            placeholder="期待你的神评论... ..."
          />
          <button class="comment-button">评论</button>
        </div>
        <div class="comment_area">
          <div
            class="comment-item"
            v-for="(item, index) in getMvCommert"
            :key="index"
          >
            <el-image
              style="width: 70px; height: 70px; border-radius: 50%"
              :src="item.user?.avatarUrl"
            />
            <div class="comment_info">
              <h3 class="comment-username">{{ item.user?.nickname }}</h3>
              <div class="comment-content">{{ item.content }}</div>
              <h3 class="comment-footer">{{ item.timeStr }}</h3>
            </div>
          </div>
          <el-pagination
            layout="prev, pager, next"
            background
            :total="getMvDetail.commentCount"
            :page-size="parma.limit"
            @current-change="changePage"
            :default-current-page = '1'
          />
        </div>
      </div>
    </div>
    <div class="mv-relevant">
      <div class="mv-Introduction">
        <div class="recommend-title">MV简介</div>
        <span class="mv-release-time"
          >发布时间：{{ getMvDetail.publishTime }}</span
        >
        <span class="mv-playcount"
          >播放量：{{ numberChange(getMvDetail.playCount) }}</span
        >
        
        <div class="mv-introduce">{{ getMvDetail.desc ?  getMvDetail.desc : '暂无简介'}}</div>
       
        
      </div>
      <div class="mv-resemble">
        <div class="recommend-title resemble">相似MV</div>
        <mv-list-item
          class="mv-list-item"
          v-for="(item, index) in getMvSimi"
          :key="index"
          :MvItem="item"
        ></mv-list-item>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import {
  computed,
  onMounted,
  reactive,
  ref,
  toRefs,
  watch,
} from "@vue/runtime-core";
import mvListItem from "../../components/mvListItem";
export default {
  name: "MVDetail",
  components: {
    mvListItem,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const textarea = ref("");
    const mvInfo = reactive({
      parma: {
        id: "",
        limit: 8,
        offset: 0,
      },
    });

    const getMvDetail = computed(() => {
      return store.state.singer.mvDetail;
    });
    const getMvUrl = computed(() => {
      return store.state.singer.mvUrl;
    });
    const getMvCommert = computed(() => {
      return store.state.singer.mvComment;
    });
    const getMvSimi = computed(() => {
      return store.state.singer.mvSimi;
    });

    console.log(route);

    const goSingerDetail = (artistId) => {
      console.log(artistId);
    };

    const numberChange = (num) => {
      let num1 = String(num).split("");
      if (num1.length <= 4) {
        return num;
      } else {
        return num1.slice(0, num1.length - 4).join("") + "万";
      }
    };
    const changePage = (page) => {
      console.log(page);
      mvInfo.parma.offset = (page - 1) * mvInfo.parma.limit;
      store.dispatch("getMVComment", mvInfo.parma);
    };

    const init = (id) => {
      mvInfo.parma.id = id;
      store.dispatch("getMVDetail", id);
      store.dispatch("getMVUrl", id);
      store.dispatch("getMVComment", mvInfo.parma);
      store.dispatch("getMVSimi", id);
    };

    watch(
      () => route.query.mvid,
      (newVal, oldVal) => {
        init(newVal);
      }
    );

    onMounted(() => {
      init(route.query.mvid);
    });

    return {
      ...toRefs(mvInfo),
      getMvDetail,
      goSingerDetail,
      getMvUrl,
      textarea,
      getMvCommert,
      numberChange,
      getMvSimi,
      changePage,
    };
  },
};
</script>

<style lang="scss" scoped>
.mv-detail {
  display: flex;
  padding: 20px;
  .mv-main {
    flex: 3;
    .mv-title {
      display: flex;
      margin-bottom: 10px;
      .mv-title-mv {
        display: inline-block;
        background-color: #f77700;
        width: 40px;
        height: 20px;
        line-height: 20px;
        color: #fff;
        border-radius: 5px;
        font-size: var(--text16);
      }
      .mv-title-song {
        margin: 0 10px;
      }
      .mv-title-singer {
        color: #909090;
        line-height: 20px;
        cursor: pointer;
      }
    }
    .mv-comment {
      width: 100%;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      .comment-hd {
        display: flex;
        h3 {
          margin-left: 10px;
          line-height: 20px;
          color: #909090;
        }
      }
      .comment-textarea {
        width: 100%;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        .comment-button {
          margin: 15px 0 50px;
          width: 60px;
          height: 30px;
          border-radius: 5px;
          color: #fff;
          background-color: #f77700;
          border: none;
          cursor: pointer;
        }
      }
      .comment_area {
        width: 96%;
        display: flex;
        flex-direction: column;
        .comment-item {
          margin-bottom: 20px;
          color: #909090;
          padding: 20px;
          display: flex;
          width: 100%;
          align-items: center;
          text-align: left;
          .comment_info {
            margin-left: 15px;
            .comment-content {
              margin: 10px 0;
              color: #000;
              font-size: var(--text14);
              font-weight: 500;
            }
          }
        }
      }
    }
  }
  .mv-relevant {
    margin: 0 20px;
    display: flex;
    flex-direction: column;
    flex: 1;
    .mv-Introduction {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
      padding: 20px;
      margin-bottom: 20px;
      span {
        color: #909090;
      }
      .mv-introduce {
        margin-top: 10px;
        text-align: left;
        font-size: var(--text14);
      }
    }
    .mv-resemble {
      display: flex;
      flex-direction: column;
      .resemble {
        width: 100%;
        padding: 20px;
        text-align: left;
      }
    }
  }
  .video-main {
    width: auto;
    height: 600px;
  }
}
.comment-item,
.mv-Introduction,
.resemble {
  border-radius: 10px;
  background: linear-gradient(145deg, #f6f6f6, #cfcfcf);
  box-shadow: 6px 6px 13px #bdbdbd, -6px -6px 13px #ffffff;
}
.recommend-title::before {
  content: "";
  width: 7px;
  height: 20px;
  margin-right: 5px;
  background-color: #f77700;
  display: inline-block;
}
.recommend-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 10px;
}
::v-deep .item {
  width: 100%;
  margin: 0 0 20px 0;
  padding: 20px;
  border-radius: 10px;
  background: linear-gradient(145deg, #f6f6f6, #cfcfcf);
  box-shadow: 6px 6px 13px #bdbdbd, -6px -6px 13px #ffffff;
}
</style>
