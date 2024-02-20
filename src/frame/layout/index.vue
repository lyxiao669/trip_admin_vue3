<template>
  <div :class="['app-wrapper', classObj]">
    <div
      v-if="device === 'mobile' && sidebar.opened"
      class="drawer-bg"
      @click="handleClickOutside"
    />
    <side-bar class="sidebar-container" />
    <div class="main-container">
      <div class="fixed-header">
        <nav-bar />
        <tags-view />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import ResizeMixin from './mixin/ResizeHandler'

import SideBar from './components/side-bar/index.vue'
import NavBar from './components/nav-bar/index.vue'
import TagsView from './components/tgas-view/index.vue'
import AppMain from './components/app-main/index.vue'
import { useStore } from 'vuex'
import { RootState } from '@/store'

export default defineComponent({
  components: {
    SideBar,
    NavBar,
    TagsView,
    AppMain,
  },
  mixins: [ResizeMixin],
  setup() {
    const store = useStore<RootState>()

    const { device, sidebar } = toRefs(store.state.app)

    const classObj = computed(() => {
      return {
        hideSidebar: !sidebar.value.opened,
        openSidebar: sidebar.value.opened,
        withoutAnimation: sidebar.value.withoutAnimation,
        mobile: device.value === 'mobile',
      }
    })

    const handleClickOutside = () => {
      store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }

    return {
      sidebar: sidebar,
      device: device,
      classObj,
      handleClickOutside
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;

  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}

.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.main-container {
  height: 100%;
  transition: margin-left 0.28s;
  margin-left: $sideBarWidth;
  position: relative;
}

.sidebar-container {
  transition: width 0.28s;
  width: $sideBarWidth !important;
  background-color: $menuBg;
  height: 100%;
  position: fixed;
  font-size: 0px;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
  padding-right: 0;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
