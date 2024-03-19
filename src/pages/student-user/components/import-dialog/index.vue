<template>
  <div class="import-dialog">
    <el-dialog
      title="导出"
      v-model="dialogVisible"
      width="70%">
      <file-upload @upload-success="onImport"></file-upload>
    </el-dialog>
  </div>
</template>

<script setup lang="tsx">

import { defineConfig } from '@juzhenfe/page-model'
import { defineComponent, nextTick, onMounted, reactive, ref } from 'vue'
import { dateFormat } from '@/frame/utils'
import request from '@/apis/utils/request'
import { ElMessage } from 'element-plus'

let dialogVisible = ref<boolean>(false)
const emit = defineEmits(['success'])

const show = () => {
  dialogVisible.value = true
}

const hide = () => {
  dialogVisible.value = false
}

const onImport = async (path: any) => {
  await request.post('StudentUsers/Excel', {
    filePath: path[0].data
  })
  ElMessage.success('导入成功!')
  emit('success')
  hide()
}

defineExpose({
  show
})

</script>

<style lang="scss">

.import-dialog {
  .el-dialog__body {
    height: 20vh;
  }
}

</style>
