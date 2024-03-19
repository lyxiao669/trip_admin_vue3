<template>
  <div class="table-wrap">
    <el-table :data="menus">
      <el-table-column prop="menuName" label="名称" />
      <el-table-column label="图标">
        <template v-slot="{row}">
          <jz-icon :icon="row.menuIcon" />
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" />
      <el-table-column label="操作">
        <template v-slot="{row, $index}">
          <el-button type="text" size="small" @click="editMenu(row, $index)">编辑</el-button>
          <el-button type="text" size="small" @click="delMenu(row, $index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    menus: {
      type: Array,
      default: () => ([])
    }
  },
  emits: ['del', 'edit'],
  setup(props, { emit }) {
    const delMenu = (menu: MenuRecordModel, index: number) => {
      emit('del', menu, index, true)
    }

    const editMenu = (menu: MenuRecordModel, index: number) => {
      emit('edit', menu, index)
    }
    
    return {
      delMenu,
      editMenu
    }
  }
})
</script>

<style lang="scss" scoped>
.table-wrap {
  padding: 20px 40px;
  .btn {
    color: #606266;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    &+.btn {
      margin-left: 10px;
    }
  }
}
</style>
