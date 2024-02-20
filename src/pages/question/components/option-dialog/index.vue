<template>
  <div class="achieve-dialog">
    <el-dialog
      title="问题选项"
      v-model="dialogVisible"
      width="70%">
      <page-model 
        ref="pageModelRef"
        :config="config"
        :static-data="staticData"
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
let staticData = ref({
  questionId: 0
})

let config = defineConfig<QuestionOption, { extend: ' ' }>({
  url: 'QuestionOptions',
  delUrl: 'QuestionOptions/:id',
  delKey: 'id',
  addButton: {
    text: '新增问题选项'
  },
  table: {
    operate: {
      els: [
        {
          text: '编辑',
          isEdit: true,
          type: 'text'
        },
        {
          text: '删除',
          isDel: true,
          type: 'text'
        }
      ]
    },
    els: [
      {
        label: '选项',
        prop: 'option'
      },
      {
        label: '选项答案',
        prop: 'optionsAnswer'
      },
      {
        label: '是否答案',
        prop: 'isAnswer',
        renderFn(row) {
          return (
            <el-tag type={ row.isAnswer ? 'success' : '' }>{ row.isAnswer ? '是' : '否' }</el-tag>
          )
        }
      },
      {
        label: '创建时间',
        prop: 'createTime'
      }
    ]
  },
  form: {
    labelWidth: '120px',
    required: ['option', 'optionsAnswer'],
    bindData(form) {
      form.isAnswer = !!form.isAnswer
      return form
    },
    beforeSubmit(form) {
      form.questionId = this.staticData.questionId
      return form
    },
    els: [
      {
        eType: 'el-input',
        label: '选项',
        prop: 'option'
      },
      {
        eType: 'el-input',
        label: '选项答案',
        prop: 'optionsAnswer'
      },
      {
        eType: 'el-switch',
        label: '是否答案',
        prop: 'isAnswer'
      }
    ]
  }
})

const show = (row: Question) => {
  dialogVisible.value = true
  config.otherParams = {
    questionId: row.id
  }
  staticData.value.questionId = row.id
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
