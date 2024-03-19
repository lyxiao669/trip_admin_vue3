<template>
  <div v-if="!item.hidden" class="menu-wrapper">
    <template v-if="!item.children">
      <app-link :to="item.menuUrl || ''">
        <el-menu-item :index="item.menuUrl" :class="{'submenu-title-noDropdown':!isNest}">
          <jz-icon v-if="item.menuIcon" class="svg-icon" :icon="item.menuIcon" />
          <template #title>
            <span class="menu-text">{{ item.menuName }}</span>
          </template>
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="`${item.id}`" popper-append-to-body>
      <template #title>
        <jz-icon v-if="item.menuIcon" class="svg-icon" :icon="item.menuIcon" />
        <span class="menu-text">{{ item.menuName }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.menuUrl"
        :is-nest="true"
        :item="child"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MenuItem from './menu-Item.vue'
import AppLink from './menu-link.vue'

export default defineComponent({
  name: 'sidebar-item',
  components: {
    MenuItem,
    AppLink
  },
  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    }
  }
})
</script>
