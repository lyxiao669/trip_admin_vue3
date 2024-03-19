<template>
  <div class="side-bar" :class="{'has-logo': showLogo}">
    <logo v-if="showLogo" :collapse="!opened" />

    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="!opened"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :active-text-color="variables.menuActiveText"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in allowedMenus" :key="route.menuUrl" :item="route" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, watch, toRefs } from 'vue'
import { getScssVariables } from '@/frame/utils/get-variables'

// 导入scss变量
import variableString from '@/styles/variables.scss'

const variables = getScssVariables(variableString)

import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import { RootState } from '@/store'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { projectLogo, openTopBarMenu } from '@/config'
import { findFirstRouteMenu } from '@/store/utils'

export default defineComponent({
  components: {
    Logo,
    SidebarItem
  },
  setup() {
    const store = useStore<RootState>()
    const router = useRouter()

    const { meta, matched } = toRefs(useRoute())

    const { opened } = toRefs(store.state.app.sidebar)
    
    let activeMenu = computed<string>(function() {
      if (meta.value.activeMenu) {
        return meta.value.activeMenu as string
      }
      return matched.value[1].path
    })

    let allowedMenus = computed(() => {
      const processedPermissionMenus = store.state.user.processedPermissionMenus ?? []
      const navbarMenuIndex = store.state.user.navbarMenuIndex
      if (openTopBarMenu) {
        return processedPermissionMenus[navbarMenuIndex]?.children ?? []
      } else {
        return processedPermissionMenus
      }
    })
    
    if (openTopBarMenu) {
      // 如果菜单发生变化，去第一个菜单
      watch(allowedMenus, (menus) => {
        if (menus?.length) {
          const firstMenu = findFirstRouteMenu(menus)
          if (firstMenu.menuUrl) {
            router.push(firstMenu.menuUrl)
          }
        }
      }, {
        deep: true
      })
    }
    
    return {
      variables,
      activeMenu,
      showLogo: projectLogo.show,
      opened,
      allowedMenus
    }
  }
})
</script>

<style lang="scss" scoped>
.side-bar {
  .el-menu {
    width: 100%;
  }
}
</style>
