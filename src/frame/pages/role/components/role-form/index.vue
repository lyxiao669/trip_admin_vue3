<template>
  <el-dialog v-model="isShow">
    <el-form ref="formRef" :rules="rules" :model="roleForm" label-width="80px" size="small">
      <el-form-item label="部门名称" prop="roleName">
        <el-input v-model="roleForm.roleName" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model.number="roleForm.sort" />
      </el-form-item>
      <el-form-item prop="sort">
        <el-button type="info" @click="isShow = false">取 消</el-button>
        <el-button type="primary" @click="submit">{{ roleForm.id ? '更新部门' : '新增部门' }}</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { addRoleApi, updateRoleApi } from '@/apis/role'
import { ElMessage, ElMessageBox } from 'element-plus'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  emits: ['refresh'],
  setup(props, { emit }) {
    const formRef = ref<any>(null)

    const isShow = ref(false)
    const roleForm = ref<any>({})
    const rules = {
      roleName: [
        { required: true, message: '请输入部门名称' }
      ]
    }
  
    const resetValue = () => {
      roleForm.value = {}
      isShow.value = true
    }

    const setValue = (role: RolesModel) => {
      roleForm.value = { ...role }
      isShow.value = true
    }

    const submit = () => {
      formRef.value.validate(async(valid: boolean) => {
        if (!valid) {
          return
        }

        const innerForm = { ...roleForm.value }
        let keyWord = ''
        let api = null
        if (innerForm.id) {
          keyWord = '更新'
          api = updateRoleApi
        } else {
          keyWord = '新增'
          api = addRoleApi
        }
        await ElMessageBox.confirm(`是否确定${keyWord}部门？`, '提示', {
          type: 'success'
        })
        await api(innerForm)
        ElMessage.success(`${keyWord}部门成功`)
        isShow.value = false
        emit('refresh')
      })
    }

    return {
      formRef,
      isShow,
      roleForm,
      rules,

      resetValue,
      setValue,
      submit
    }
  }
})
</script>
