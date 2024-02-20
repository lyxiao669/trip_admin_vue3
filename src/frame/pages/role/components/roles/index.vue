<template>
  <el-scrollbar
    :vertical="true"
    class="scroll-menu-container"
  >
    <div
      v-for="(role, index) in roles"
      :key="role.id"
      class="fa-item"
      :class="{'selected': index === current}"
      @click="onSelect(role, index)"
    >
      <span class="role-text">{{ role.roleName }}</span>
      <el-tooltip class="item" effect="dark" content="页面权限" placement="top-start">
        <i class=" el-icon-view" @click="editPower(role, index)" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="编辑部门" placement="top-start">
        <i class="el-icon-edit" @click="onEdit(role, index)" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="删除部门" placement="top-start">
        <i class="el-icon-delete" @click="onDel(role, index)" />
      </el-tooltip>
    </div>

    <powerForm ref="powerForm" />

  </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import powerForm from './components/powerForm.vue'
export default defineComponent({
  name: 'roles',
  components: {
    powerForm
  },
  props: {
    roles: {
      type: Array,
      default: () => ([])
    },
    current: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {

    const powerForm = ref<any>(null)

    const editPower = (role: GetRolesModel) => {
      powerForm.value.setValue(role)
    }

    const onSelect = (role: GetRolesModel, index: number) => {
      emit('update:current', index)
    }

    const onEdit = (role: GetRolesModel, index: number) => {
      emit('edit', role, index)
    }

    const onDel = (role: GetRolesModel, index: number) => {
      emit('del', role, index)
    }

    return {
      powerForm,

      editPower,
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
    .role-text {
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
