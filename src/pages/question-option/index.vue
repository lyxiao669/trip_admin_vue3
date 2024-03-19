<template>
  <page-model 
    :config="config"
    :reflections="reflections"
  />
</template>

<script setup lang="tsx">
import { defineConfig } from '@juzhenfe/page-model'
import { defineComponent, ref, onMounted } from 'vue'
import request from '@/apis/utils/request'
import { ElMessage } from 'element-plus'

let config = defineConfig<QuestionOption, { extend: ' ' }>({
  url: 'QuestionOptions',
  delUrl: 'QuestionOptions/:id',
  delKey: 'id',
  reflect: true,
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
    required: ['option', 'optionsAnswer', 'isAnswer'],
    els: [
      {
        eType: 'el-select',
        label: '问题',
        prop: 'option'
      },
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

let reflections = ref({
  questions: []
})

onMounted(() => {
  getQuestion()
})

const getQuestion = async () => {
  const res = await request.get('Questions')
  reflections.value.questions = res.data
}

</script>
