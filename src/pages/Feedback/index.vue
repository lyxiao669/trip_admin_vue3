<template>
  <page-model :config="config" ref="pageModelRef" @finish="handleFinish" @refresh="refreshTableData" />
</template>

<script setup lang="tsx">
import request from '@/apis/utils/request'
import { FeedbackStatus, OrdertatusTag } from '@/models/enum'
import { defineConfig } from '@juzhenfe/page-model'
import { ElMessage, ElMessageBox } from 'element-plus';
import { defineComponent, ref } from 'vue'

let config = defineConfig<Feedback, { extend: ' ' }>({
  url: 'Feedback',
  delUrl: 'Feedback/:id',
  delKey: 'id',
  isAutoAddButton: false,
  searchForm:{
    els: [
      {
        eType:'el-select',
        label:'反馈状态筛选',
        prop:'status',
        props:{
          placeholder:'请选择反馈状态',
        },
        optionsData:{
          list:[
            {
              label:'全部',
              value:-1
            },
            {
              label:'未处理',
              value:0
            },
            {
              label:'已处理',
              value:1
            }
          ]
        }
      }
    ]
  },
  table: {
    operate: {
      els: [
        {
          text: '确认处理',
          event: 'finish',
          isShow(self, data, index) {
            return data.status === 0
          }
        },
        {
          text: '删除',
          isDel: true,
        },

      ]
    },
    els: [
      {
        label: '反馈时间',
        prop:'createDate'
      },
      {
        label: '用户名',
        prop: 'userName'
      },
      {
        label: '反馈内容',
        prop: 'content'
      },
      {
        label: '联系电话',
        prop: 'phone'
      },
      {
        label: '是否解决',
        prop: 'status',
        renderFn(row) {
          let statusText = FeedbackStatus[row.status]
          let style = OrdertatusTag[row.status]
          return <div>
            <el-tag type={style}>{statusText}</el-tag>
          </div>
        }
      }
    ]
  },

})

let pageModelRef = ref<any>(null)
const refreshTableData = () => {
  pageModelRef.value.refreshTableData()
}

const handleFinish = async (row: OrderDetailResult) => {
  await ElMessageBox.confirm('是否确认完成？', {
    type: 'warning'
  })
  const res = await request.put('Feedback/UpdateStatus', {
    feedbackId: row.id,
    status: 1
  })
  console.log("UpdateStatus::", res)
  if (!res) {
    refreshTableData()
    ElMessage.success('操作成功!')
  }
}
</script>
