<template>
  <div class="achieve-dialog">
    <el-dialog
      title="用户成绩"
      v-model="dialogVisible"
      width="70%">
      <page-model 
        ref="pageModelRef"
        :config="config"
      />
    </el-dialog>
  </div>
</template>

<script setup lang="tsx">

import { defineConfig } from '@juzhenfe/page-model'
import { defineComponent, nextTick, onMounted, reactive, ref } from 'vue'
import { dateFormat } from '@/frame/utils'
import request from '@/apis/utils/request'
import { ElMessage } from 'element-plus'

const pageModelRef = ref<any>(null)
const emit = defineEmits(['close'])
let dialogVisible = ref<boolean>(false)

let config = defineConfig<Achievement, { extend: ' ' }>({
  init: true,
  reflect: true,
  getUrl: 'Achievements',
  table: {
    els: [
      {
        label: '分数',
        prop: 'mark'
      },
      {
        label: '结果',
        prop: 'result'
      },
      {
        label: '创建时间',
        prop: 'createTime'
      }
    ]
  },
  hasForm: false
})


const show = (row: StudentUser) => {
  dialogVisible.value = true
  config.otherParams = {
    userId: row.id
  }
  pageModelRef.value.refreshTableData()
}

const hide = () => {
  dialogVisible.value = false
}

defineExpose({
  show
})

</script>

<style lang="scss">

.achieve-dialog {
  .el-dialog__body {
    height: 60vh;
  }
}

</style>
