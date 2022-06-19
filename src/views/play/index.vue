<template>
  <div class="playlist">
    <div class="playlist-top">
      <div class="filter" v-for="(item, index) in categoriesChild" :key="index">
        <div class="filter-name">
          <h1>{{ item.name }}</h1>
        </div>
        <div class="filter-box">
          <span
            :class="['item', parma.cat === sub.name ? 'active' : '']"
            v-for="(sub, index) in item.children.slice(0, 8)"
            :key="index"
            ><em @click="selectType(sub)">{{ sub.name }}</em></span
          >
          <span class="item" v-if="item.children.length > 8">
            <el-col :span="8">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link" > 更多^ </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item
                      v-for="(sub, index) in item.children.slice(
                        8,
                        item.children.length
                      )"
                      :key="index"
                      @click="selectType(sub)"
                      ><span
                        :class="[
                          'item',
                          parma.cat === sub.name ? 'active' : '',
                        ]"
                        >{{ sub.name }}</span
                      ></el-dropdown-item
                    >
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-col>
          </span>
        </div>
      </div>
    </div>
    <div class="playdateil">
      <div class="top">
        <h1>{{catNanme}}</h1>
        <div class="top-info">
          <span
            class="top-info-item"
            :class="parma.order === 'hot' ? 'active' : ''"
            @click="selectOrder('hot')"
            >热门</span
          >
          <span
            class="top-info-item"
            :class="parma.order === 'new' ? 'active' : ''"
            @click="selectOrder('new')"
            >最新</span
          >
        </div>
      </div>
      <div class="bottom">
        <hot-list-item
          v-for="(item, index) in allPlayList"
          :key="index"
          :hotList="item"
        ></hot-list-item>
        <h1 v-if="allPlayList.length == 0" class="dataNo">暂无数据</h1>
      </div>
      <div class="page">
        <el-button
          type="primary"
          @click="PreviousPage"
          :disabled="parma.offset == 0"
          >上一页</el-button
        >
        <el-button type="primary" @click="NextPage">下一页</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  computed,
  onMounted,
  reactive,
  toRefs,
  watch,
  watchEffect,
} from "@vue/runtime-core";
import { useStore } from "vuex";
import hotListItem from "../../components/hotListItem.vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "PlayList",
  components: {
    hotListItem,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const listInfo = reactive({
      parma: {
        order: "hot",
        cat: "",
        limit: 18,
        offset: 0,
      },
    });
    const Palyinit = () => {
      store.dispatch("getPlayListHot", listInfo.parma);
    };
    const CatListinit = () => {
      store.dispatch("getCatList");
    };

    const selectOrder = (type) => {
      listInfo.parma.order = type;
      Palyinit();
    };

    const catNanme = computed(() => {
      return !route.query.cat  ? '全部歌单' : route.query.cat
    })

    const allPlayList = computed(() => {
      return store.state.home.playListHot;
    });

    const catSub = computed(() => {
      return store.state.singer.catSub;
    });
    const categories = computed(() => {
      return store.state.singer.categories;
    });

    const categoriesChild = computed(() => {
      let listlist = []
      for (const i in categories.value) {
        const params = { name: categories.value[i] };
        params.children = catSub.value.filter((subItem) => {
          return subItem.category === Number(i);
        });
       listlist.push(params);
      }
      return listlist;
    });

    const selectType = (sub) => {
      router.push({ path: "/playlist", query: { cat: sub.name } });
    };

    const PreviousPage = () => {
      if (listInfo.parma.offset <= 0) {
        return;
      } else {
        listInfo.parma.offset -= 18;
        Palyinit();
      }
    };
    const NextPage = () => {
      listInfo.parma.offset += 18;
      Palyinit();
    };
    watch(
      () => route.query,
      (newVal, oldVal) => {
        listInfo.parma.cat = newVal.cat;
        listInfo.parma.offset = 0;
        Palyinit();
      }
    );

    watchEffect(() => {
      listInfo.parma.cat = route.query.cat;
      listInfo.parma.offset = 0;
    });
    onMounted(() => {
      Palyinit();
      CatListinit()
    })

    return {
      allPlayList,
      ...toRefs(listInfo),
      selectOrder,
      catSub,
      categories,
      categoriesChild,
      selectType,
      PreviousPage,
      NextPage,
      catNanme
    };
  },
};
</script>

<style lang="scss" scoped>
.playlist {
  margin-top: 20px;
  .playlist-top {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    border-radius: 10px;
    background: linear-gradient(145deg, #f6f6f6, #cfcfcf);
    box-shadow: 6px 6px 13px #bdbdbd, -6px -6px 13px #ffffff;
    margin-bottom: 30px;
    text-align: left;
    .filter {
      width: calc(100% / 5 - 30px);
      border-right: 1px solid #b1b1b1;
      .filter-box {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 10px;
        margin-left: -16px;
        span {
          display: inline-block;
          width: 65px;
          height: 20px;
          margin: 0 5px 5px 0;
          cursor: pointer;
          text-align: center;
          font-size: var(--text14);
        }
      }
    }
    .filter:last-child {
      border-right: none;
    }
  }
  .top {
    display: flex;
    text-align: left;
    align-items: center;
    h1 {
      font-size: 25px;
      margin-right: 50px;
    }
    .top-info-item {
      display: inline-block;
      padding: 0 12px;
      font-size: 14px;
      margin-bottom: 5px;
      border-radius: 5px;
    }
  }
  .bottom {
    display: flex;
    flex-wrap: wrap;
    .dataNo {
      margin: 0 auto;
    }
  }
}
.page {
  margin: 0 auto;
}
.active {
  border-radius: 5px;
  background: linear-gradient(145deg, #e69200, #ffad00);
}
.el-button--primary {
  border: none;
  color: #555555;
  background: linear-gradient(145deg, #f6f6f6, #cfcfcf);
}
.more {
  display: inline-block;
  margin-top: 10px;
}
</style>
