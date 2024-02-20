<template>
  <el-dialog v-model="isShow" title="部门权限">
    <el-form
      :model="powerForm"
      label-width="100px"
      size="mini"
    >
      <el-form-item label="可查看页面" prop="sort">
        <el-tree
          ref="powerTree"
          :data="menus"
          :props="{
            label: 'menuName',
            children: 'children'
          }"
          check-strictly
          empty-text="加载中.."
          show-checkbox
          node-key="id"
          :expand-on-click-node="false"
          :default-expand-all="true"
        />
      </el-form-item>
      <el-form-item prop="sort">
        <el-button type="danger" @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="submit">更新权限</el-button>
        <el-button type="primary" @click="chooseAll">全选</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { getMenusListApi } from '@/apis/menu'
import { getRoleSingleApi, patchRoleMenus } from '@/apis/role'
import { tree } from '@/frame/utils'
import { ElMessage } from 'element-plus'
import { useStore } from 'vuex'
import { defineComponent, ref } from 'vue'
import { RootState } from '@/store'

export default defineComponent({
  setup() {
    const store = useStore<RootState>()
    const isShow = ref(false)
    const powerForm =  ref<any>({})
    const powerTree = ref<any>(null)
    const menus = ref<MenuRecordModel[]>([])
    let currentRole: GetRolesModel
    let totalMenuIds: number[] = []

    const setValue = (role: GetRolesModel) => {
      currentRole = role
      isShow.value = true
      getMenus()
    }

    const getMenus = async () => {
      const [totalMenu, roleInfo] = await Promise.all([
        getMenusListApi(),
        getRoleSingleApi(currentRole.id)
      ])
      if (totalMenu) {
        totalMenuIds = totalMenu.map(a => a.id)
        menus.value = tree(totalMenu, 'id', 'menuPid')
      } else {
        menus.value = []
      }
      // 设置选中项
      const menuIds = roleInfo ? roleInfo.menus.map(a => a.menuId) : []
      powerTree.value.setCheckedKeys(menuIds)
    }

    const chooseAll = () => {
      powerTree.value.setCheckedKeys(totalMenuIds)
    }

    const submit = async () => {
      const selectedMenus = powerTree.value.getCheckedKeys()
      await patchRoleMenus({
        id: currentRole.id,
        menuIds: selectedMenus
      })
      ElMessage.success('更新权限成功!')
      isShow.value = false
      store.dispatch('user/getPower')
    }

    return {
      isShow,
      powerForm,
      powerTree,
      menus,

      setValue,
      chooseAll,
      submit
    }
  }
})
</script>
