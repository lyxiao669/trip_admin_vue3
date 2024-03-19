<template>
  <div class="navbar-menu">
    <div 
      v-for="(menu, index) in treeMenus"
      :key="menu.id"
      :class="['navbar-menu_item', { active: currentNavbarMenuIndex === index }]"
      @click="handleNavbarClick(menu, index)"
    >
      <span>{{ menu.menuName }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { openTopBarMenu } from '@/config'
import { useStore } from 'vuex'
import { RootState } from '@/store'

export default defineComponent({
  setup() {
    const store = useStore<RootState>()

    const treeMenus = computed(() => {
      return openTopBarMenu ? (store.state.user.processedPermissionMenus ?? []) : []
    })

    const currentNavbarMenuIndex = computed(() => {
      return store.state.user.navbarMenuIndex
    })

    const handleNavbarClick = (menu: MenuRecordModel, index: number) => {
      store.commit('user/updateNavbarMenuIndex', index)
    }

    return {
      treeMenus,
      currentNavbarMenuIndex,

      handleNavbarClick
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.navbar-menu {
  display: inline-block;
  vertical-align: top;
  font-size: 0;
  height: 100%;
}

.navbar-menu_item {
  height: 100%;
  line-height: 44px;
  display: inline-block;
  vertical-align: top;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  padding: 0 15px;
  background-color: #f5f5f5;
  &.active {
    background-color: $theme;
    color: #fff;
  }
}

</style>