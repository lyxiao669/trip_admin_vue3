<template>
  <el-dialog v-model="isShow">
    <el-form ref="formRef" size="small" :rules="rules" :model="userForm" label-width="80px">
      <el-form-item label="账号" prop="account">
        <el-input v-model="userForm.account" :disabled="!!userForm.id" />
      </el-form-item>
      <el-form-item label="部门" prop="roleId">
        <el-select v-model="userForm.roleId">
          <el-option 
            v-for="(role) in roles"
            :key="role.id"
            :label="role.roleName"
            :value="role.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="!userForm.id" label="账号密码" prop="password">
        <el-input v-model="userForm.password" type="password" />
      </el-form-item>
      <el-form-item label="用户名称" prop="name">
        <el-input v-model="userForm.name" />
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="userForm.mobile" />
      </el-form-item>
      <el-form-item label="头像" prop="headImg">
        <img-upload v-model="userForm.headImg" />
      </el-form-item>
      <el-form-item prop="sort">
        <el-button type="info" @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="submit">{{ userForm.id ? '更新账号' : '新增账号' }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { getRoleListApi } from '@/apis/role'
import { addUserApi, updUserApi } from '@/apis/user'
import { ElMessage, ElMessageBox } from 'element-plus'
import { defineComponent, PropType, ref, toRefs } from 'vue'

export default defineComponent({
  props: {
    roleId: {
      type: Number as PropType<number>,
      default: 0
    }
  },
  emits: ['success'],
  setup(props, { emit }) {
    const isShow = ref(false)

    const {
      roleId
    } = toRefs(props)

    const userForm = ref<any>({})
    const formRef = ref<any>(null)
    const roles = ref<RolesModel[]>([])

    const rules = {
      'auName': [
        { required: true, message: '请输入账号名称' }
      ],
      'account': [
        { required: true, message: '请输入账号' }
      ]
    }

    const getRoles = async () => {
      const result = await getRoleListApi()
      roles.value = result ?? []
    }
    
    const submit = () => {
      formRef.value.validate(async(valid: boolean) => {
        if (!valid) return

        const userFormInner: UpdateIdentityUserModel = { ...userForm.value }

        if (!userFormInner.id && !userFormInner.password) {
          ElMessage.warning('请设置账号密码')
          return false
        }

        let keyword = ''
        let api = null
        if (userFormInner.id) {
          keyword = '更新'
          api = updUserApi
        } else {
          keyword = '新增'
          api = addUserApi
        }
        await ElMessageBox.confirm(`是否确定${keyword}账号？`, '提示', {
          type: 'success'
        })
        userFormInner.roleId = roleId.value
        await api(userFormInner)
        ElMessage.success(`${keyword}账号成功`)
        isShow.value = false
        emit('success')
      })
    }

    const resetValue = () => {
      userForm.value = {}
      isShow.value = true
      getRoles()
    }

    const setValue = (user: GetIdentityUserModel) => {
      userForm.value = { ...user, roleId: user.role?.id }
      isShow.value = true
      getRoles()
    }

    return {
      isShow,
      userForm,
      rules,
      formRef,
      roles,

      submit,
      resetValue,
      setValue
    }
  }
})
</script>
