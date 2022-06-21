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
          <div class="comment-item" v-for="(item, index) in getMvCommert" :key="index">
             <el-image style="width: 70px; height: 70px; border-radius: 50%;" :src="item.user?.avatarUrl"/>
             <div class="comment_info">
              <h3 class="comment-username">{{item.user?.nickname}}</h3>
              <div class="comment-content">{{item.content}}</div>
              <h3 class="comment-footer">{{item.timeStr}}</h3>
             </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mv-relevant"></div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute, useRouter } from "vue-router";
import { computed, onMounted,ref } from "@vue/runtime-core";
export default {
  name: "MVDetail",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    const textarea = ref('')

    const getMvDetail = computed(() => {
      return store.state.singer.mvDetail;
    });
    const getMvUrl = computed(() => {
      return store.state.singer.mvUrl;
    });
    const getMvCommert = computed(() => {
      return store.state.singer.mvComment;
    });

    const goSingerDetail = (artistId) => {
      console.log(artistId);
    };

    const init = (id) => {
      store.dispatch("getMVDetail", id);
      store.dispatch("getMVUrl", id);
      store.dispatch("getMVComment", id);    
    };

    onMounted(() => {
      init(route.query.mvid);
    });

    return {
      getMvDetail,
      goSingerDetail,
      getMvUrl,
      textarea,
      getMvCommert
    };
  },
};
</script>

<style lang="scss" scoped>
.mv-detail {
  display: flex;
  padding: 20px;
  .mv-main {
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
      .comment-textarea{
         width: 100%;
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        .comment-button{
          margin: 15px 0 50px;
          width: 60px;
          height: 30px;
          border-radius: 5px;
          color:#fff;
          background-color: #f77700;
          border: none;
          cursor: pointer;
        }
      }
      .comment_area{
       width: 96%;
        display: flex;
        flex-direction: column;
        .comment-item{
          margin-bottom: 20px;
          color: #909090;
          padding:20px;
          display: flex;
          width: 100%;
          align-items: center;
          text-align: left;
          .comment_info{
            margin-left: 15px;
            .comment-content{
              margin: 10px 0;
              color:#000;
              font-size: var(--text14);
              font-weight: 500;
            }
          }
        }
      }
    }
  }
  .video-main {
    width: 1078px;
    height: 607px;
  }
}
.comment-item {
  border-radius: 10px;
  background: linear-gradient(145deg, #f6f6f6, #cfcfcf);
  box-shadow: 6px 6px 13px #bdbdbd, -6px -6px 13px #ffffff;
}
</style>
