<template>
  <page-model 
    :config="config"
    :reflections="reflections"
  />
</template>

<script setup lang="ts">
import request from '@/apis/utils/request'
import { defineConfig } from '@juzhenfe/page-model'
import { defineComponent, onMounted, ref } from 'vue'

let config = defineConfig<QuestionBank, { extend: ' ' }>({
  url: 'QuestionBanks',
  delUrl: 'QuestionBanks/:id',
  delKey: 'id',
  reflect: true,
  addButton: {
    text: '新增问题题库'
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
        label: '标题',
        prop: 'title'
      },
      {
        label: '年级',
        prop: 'grade'
      },
      {
        label: '时限(s)',
        prop: 'timeLimit'
      },
      {
        label: '答题数',
        prop: 'amount'
      },
      {
        label: '创建时间',
        prop: 'createTime'
      }
    ]
  },
  form: {
    labelWidth: '120px',
    required: ['title', 'grade', 'timeLimit', 'amount'],
    els: [
      {
        eType: 'el-input',
        label: '标题',
        prop: 'title'
      },
      {
        eType: 'el-select',
        label: '年级',
        prop: 'grade',
        props: {
          filterable: true
        },
        optionsData: {
          _reflect: 'grades'
        }
      },
      {
        eType: 'el-input-number',
        label: '时限(s)',
        prop: 'timeLimit'
      },
      {
        eType: 'el-input-number',
        label: '单选题数量',
        prop: 'amount'
      },
      {
        eType: 'el-input-number',
        label: '多选题数量',
        prop: 'multipleChoiceAmount'
      },
      {
        eType: 'el-input-number',
        label: '判断题数量',
        prop: 'trueOrFalseAmount'
      }
    ]
  }
})

let reflections = ref({
  grades: []
})

onMounted(() => {
  getGrade()
})

const getGrade = async () => {
  const res = await request.get('StudentUsers/grade')
  reflections.value.grades = res.map((item: any) => {
    return {
      label: item,
      value: item
    }
  })
}

</script>
