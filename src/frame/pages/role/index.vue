<template>
  <div class="role-container">
    <div class="left-bar">
      <div class="add-father">
        <jz-icon icon="component" />
        <span class="btn-add-fa" @click="addRole">新增部门</span>
      </div>
      <roles
        :roles="roles"
        v-model:current="current"
        @del="delRole"
        @edit="editRole"
      />
    </div>
    <div class="right-bar">
      <div class="add-child">
        <span class="title">账号列表</span>
        <div class="btn-add-child" @click="addAccount">新增账号</div>
      </div>

      <accounts
        ref="accountsRef"
        :roleId="currentRole.id"
      />
    </div>

    <roleForm ref="roleFormRef" @refresh="getRoles" />

  </div>
</template>

<script lang='ts'>
import { computed, defineComponent, ref } from 'vue'
import { deleteRoleApi, getRoleListApi } from '@/apis/role'
import { ElMessage, ElMessageBox } from 'element-plus'

import roles from './components/roles/index.vue'
import accounts from './components/accounts/index.vue'
import RoleForm from './components/role-form/index.vue'

export default defineComponent({
  name: 'Role',
  components: {
    roles, accounts, RoleForm
  },
  setup() {
    const roles = ref<GetRolesModel[]>([])
    const current = ref(0)
    const currentRole = computed(() => {
      return roles.value[current.value] ?? {} as GetRolesModel
    })

    const getRoles = async () => {
      const result = await getRoleListApi()
      if (result) {
        roles.value = result
      } else {
        roles.value = []
      }
    }

    const roleFormRef = ref<any>(null)

    const addRole = () => {
      roleFormRef.value.resetValue()
    }
    const editRole = (role: GetRolesModel, index: number) => {
      roleFormRef.value.setValue(role)
    }

    const delRole = async(role: GetRolesModel, index: number) => {
      await ElMessageBox.confirm('确定删除该部门，该操作不可恢复？', '提示', {
        type: 'warning'
      })
      await deleteRoleApi(role.id)
      ElMessage.success('删除部门成功!')
      getRoles()

      if (index === current.value) {
        current.value = index === 0
          ? 0
          : index - 1
      }
    }

    // 账号列表
    const accountsRef = ref<any>(null)

    const addAccount = () => {
      accountsRef.value.addAccount()
    }

    getRoles()

    return {
      roles,
      current,
      currentRole,

      roleFormRef,
      accountsRef,

      addAccount,
      addRole,
      delRole,
      editRole,
      getRoles,
    }
  }
})
</script>

<style lang='scss' scoped>
@import '@/styles/variables.scss';
.role-container {
  height: calc(100vh - 84px);
  position: relative;
  .left-bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 300px;
    box-sizing: border-box;
    border-right: 1px solid #EBEEF5;
    padding: 20px;
  }
  .right-bar {
    margin-left: 300px;
  }
}
.add-father {
  color: $theme;
  line-height: 20px;
  height: 20px;
  .btn-add-fa {
    margin-left: 10px;
    cursor: pointer;
  }
}
.add-child {
  display: flex;
  align-items: center;
  height: 66px;
  padding: 0 30px;
  border-bottom: 1px solid #EBEEF5;
  box-sizing: border-box;
  .title {
    flex-grow: 1;
    color: #666666;
    font-size: 18px;
    font-weight: 600;
  }
  .btn-add-child {
    background-color: $theme;
    border-radius: 4px;
    width: 94px;
    text-align: center;
    line-height: 40px;
    color: #fff;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
