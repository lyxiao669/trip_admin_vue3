<template>
  <div class="navbar">

    <hamburger
      id="hamburger-container"
      class="hamburger-container"
      :is-active="opened"
      @toggleClick="toggleSideBar"
    />

    <navbar-menu v-if="openTopBarMenu" />

    <breadcrumb v-else />

    <div class="right-menu">
      <template v-if="device !== 'mobile'">
        <screenfull id="screenfull" class="right-menu-item hover-effect" />
        <span class="user-name">{{ userName }}</span>
      </template>

      <el-dropdown
        class="right-menu-item hover-effect"
        trigger="hover"
      >
        <div class="avatar-wrapper">
          <div
            class="avatar-bg"
            :style="{ backgroundImage: `url(${userAvatar})` }"
          >
            <i class="el-icon-caret-bottom" />
          </div>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>首页</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span style="display: block" @click="logout">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRef, toRefs } from 'vue'

import NavbarMenu from './components/navbar-menu/index.vue'
import Hamburger from './components/Hamburger/index.vue'
import Breadcrumb from './components/Breadcrumb/index.vue'
import Screenfull from './components/Screenfull/index.vue'

import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { RootState } from '@/store'
import { openTopBarMenu } from '@/config'

export default defineComponent({
  components: {
    NavbarMenu,
    Breadcrumb,
    Hamburger,
    Screenfull,
  },
  setup() {
    const store = useStore<RootState>()
    const router = useRouter()
    const route = useRoute()

    let userAvatar = ref('/imgs/logo.png')
    let userName = ref('无名')

    // 用户数据
    if (store.state.user.userData) {
      const userData = store.state.user.userData
      if (userData.headImg) {
        userAvatar.value = userData.headImg ?? ''
      }
      userName.value = userData.name
    }

    // 侧边栏
    const { opened } = toRefs(store.state.app.sidebar)

    // 当前设备
    const { device } = toRefs(store.state.app)

    const toggleSideBar = () => {
      store.commit('app/toggleSideBar')
    }

    const logout = async () => {
      await store.dispatch('user/logout')
      router.push(`/login?redirect=${route.fullPath}`)
    }

    return {
      userAvatar,
      userName,
      opened,
      device,
      toggleSideBar,
      logout,
      openTopBarMenu
    }
  },
})
</script>

<style lang="scss" scoped>
.navbar {
  height: 44px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 1;
  .hamburger-container {
    line-height: 44px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .user-name {
    line-height: 44px;
    font-size: 14px;
    margin-left: 5px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 44px;
    display: flex;
    align-items: center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-wrapper {
      position: relative;
      margin-right: 30px;
      margin-left: 10px;

      .avatar-bg {
        cursor: pointer;
        background-color: #eee;
        width: 36px;
        height: 36px;
        border-radius: 6px;
        background-repeat: no-repeat;
        background-size: 100%;
        background-position: center;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 10px;
        font-size: 16px;
      }
    }
  }
}
</style>
