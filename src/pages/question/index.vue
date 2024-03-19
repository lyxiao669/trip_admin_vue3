<template>
  <div style="height: 100%">
    <page-model 
      :config="config"
      @option="handleOption"
    />

    <optionDialog ref="optionDialogRef" />
  </div>
</template>

<script setup lang="tsx">
import { defineConfig } from '@juzhenfe/page-model'
import { defineComponent, ref } from 'vue'
import optionDialog from './components/option-dialog/index.vue'

const optionDialogRef = ref<any>(null)

let config = defineConfig<Question, { extend: ' ' }>({
  url: 'Questions',
  delUrl: 'Questions/:id',
  addButton: {
    text: '新增问题'
  },
  delKey: 'id',
  searchForm: {
    els: [
      {
        eType: 'el-input',
        label: '关键字',
        prop: 'keyWord'
      }
    ]
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
        },
        {
          text: '选项',
          event: 'option',
          type: 'text'
        }
      ]
    },
    els: [
      {
        label: '问题',
        prop: 'problem'
      },
      {
        label: '类型',
        prop: 'type',
        renderFn(row) {
          const types = ['单选', '多选', '判断']
          return (
            <el-tag>{ types[row.type] }</el-tag>
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
    required: ['problem', 'type', 'img', 'answerAnalysis'],
    els: [
      {
        eType: 'el-input',
        label: '问题内容',
        prop: 'problem'
      },
      {
        eType: 'el-select',
        label: '类型',
        prop: 'type',
        optionsData: {
          list: [
            {
              label: '单选',
              value: 0
            },
            {
              label: '多选',
              value: 1
            },
            {
              label: '判断',
              value: 2
            }
          ]
        }
      },
      {
        eType: 'img-upload',
        label: '图片',
        prop: 'img'
      },
      {
        eType: 'el-input',
        label: '问题解析',
        prop: 'answerAnalysis',
        props: {
          type: 'textarea'
        }
      }
    ]
  }
})

const handleOption = (row: Question) => {
  optionDialogRef.value.show(row)
}

</script>
