<template>
  <el-scrollbar
    :vertical="true"
    class="scroll-menu-container"
  >
    <div
      v-for="(menu, index) in menus"
      :key="menu.id"
      class="fa-item"
      :class="{'selected': index === current}"
      @click="onSelect(menu, index)"
    >
      <span class="menu-text">{{ menu.menuName }}</span>
      <el-tooltip class="item" effect="dark" content="编辑菜单" placement="top-start">
        <i class="el-icon-edit" @click="onEdit(menu, index)" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="删除菜单" placement="top-start">
        <i class="el-icon-delete" @click="onDel(menu, index)" />
      </el-tooltip>
    </div>
  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'father',
  props: {
    menus: {
      type: Array as PropType<MenuRecordListModel>,
      default: () => ([])
    },
    current: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:current', 'edit', 'del'],
  setup(props, { emit }) {
    
    const onSelect = (menu: MenuRecordModel, index: number) => {
      emit('update:current', index)
    }
    const onEdit = (menu: MenuRecordModel, index: number) => {
      emit('edit', menu, index)
    }
    const onDel = (menu: MenuRecordModel, index: number) => {
      emit('del', menu, index)
    }

    return {
      onSelect,
      onEdit,
      onDel
    }
  }
})
</script>

<style lang='scss'>
@import '@/styles/variables.scss';
.scroll-menu-container {
  height: calc(100% - 20px);
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .fa-item {
    margin: 10px 10px 10px 20px;
    color: #666666;
    padding: 12px 18px;
    cursor: pointer;
    transition: background-color 1s, color .3s;
    font-size: 14px;
    position: relative;
    display: flex;
    .menu-text {
      flex-grow: 1;
    }
    i {
      flex-shrink: 0;
      color: #999;
      margin-left: 10px;
    }
    &::after {
      content: '';
      position: absolute;
      width: 5px;
      top: 50%;
      right: 0;
      bottom: 50%;
      background-color: $theme;
      transition: top .2s, bottom .2s;
    }
    &.selected {
      background-color: #EDFFF7;
      color: $theme;
      &::after {
        top: 0;
        bottom: 0;
      }
    }
    &:hover {
      background-color: #EDFFF7;
    }
  }
}
</style>
