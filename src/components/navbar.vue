<template>
  <div id="nav-bar">
    <div class="logo">我是logo</div>
    <div class="title-list">
      <router-link class="title-item" to="/home"
        ><i class="iconfont icon-shouye"></i>首页</router-link
      >
      <router-link class="title-item" to="/rank"
        ><i class="iconfont icon-paihangbang"></i>排行榜</router-link
      >
      <router-link class="title-item" to="/playlist"
        ><i class="iconfont icon-gedan"></i>歌单</router-link
      >
      <router-link class="title-item" to="/mvlist"
        ><i class="iconfont icon-shipinbofang"></i>MV</router-link
      >
      <router-link class="title-item" to="/singer"
        ><i class="iconfont icon-changge"></i>歌手</router-link
      >
      <router-link class="title-item" to="/my"
        ><i class="iconfont icon-wode"></i>我的音乐</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped lang="scss">
#nav-bar {
  width: 200px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo {
    width: 90%;
    line-height: 70px;
    height: 70px;
    margin: 20px 0;
    border-bottom: 1px solid #d1d1d1;
    font-size: var(--text20);
  }
  .title-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: var(--text16);
    .title-item {
      padding: 14px;
      .iconfont {
        margin-right: 15px;
        font-size: var(--text18);
      }
    }
  }
}
.title-list a.router-link-exact-active {
  color: #000;
  width: 120px;
  border-radius: 52px;
  background: linear-gradient(145deg, #f6f6f6, #cfcfcf);
  box-shadow: 6px 6px 13px #bdbdbd, -6px -6px 13px #ffffff;
}
</style>
