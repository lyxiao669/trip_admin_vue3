<template>
  <page-model :config="config" ref="pageModelRef" @finish="handleFinish" @refresh="refreshTableData" @cancel="handleCancel" />
</template>

<script setup lang="tsx">
import { Ordertatus, OrdertatusTag } from '@/models/enum';
import { defineConfig } from '@juzhenfe/page-model'
import { defineComponent, ref } from 'vue'
import request from '@/apis/utils/request'
import { ElMessage, ElMessageBox } from 'element-plus';
let config = defineConfig<OrderDetailResult, { extend: ' ' }>({
  url: 'Orders',
  delUrl: 'Orders/:id',
  isAutoAddButton:false,
  delKey: 'id',
  table: {
    operate: {
      els: [
        {
          text: '完成订单',
          event: 'finish',
          isShow(self, data, index) {
              return data.status === 0
          }
        },
        {
          text: '取消订单',
          event: 'cancel',
          isShow(self, data, index) {
              return data.status === 0
          }
        },
        {
          text: '删除',
          isDel: true,
        }
      ]
    },
    els: [
      {
        width:80,
        label: '订单号',
        prop: 'id'
      },
      {
        label:'下单时间',
        prop:'orderDate'
      },
      {
        label: '图片',
        prop: 'images',
        renderFn(row) {
          let imageList = row.images.split(',');
          let img = imageList[0];
          return (
            <el-image style="width: 50px; height: 50px" src={img} preview-src-list={imageList} preview-teleported={true} fit="contain"></el-image>
          )
        }
      },

      {
        label: '下单用户',
        prop: 'userName'
      },
      {
        label: '景区',
        prop: 'spotName'
      },
      {
        label: '省份',
        prop: 'provinceName'
      },
      {
        label: '城市',
        prop: 'cityName'
      },
      {
        label: '订单状态',
        prop: 'status',
        renderFn(row) {
          let statusText = Ordertatus[row.status]
          let style = OrdertatusTag[row.status]
          return <div>
            <el-tag type={style}>{statusText}</el-tag>
          </div>
        }
      }
    ]
  },
})

let reflections = ref({
  questions: []
})
let pageModelRef = ref<any>(null)
const refreshTableData = () => {
  pageModelRef.value.refreshTableData()
}

const handleFinish = async (row: OrderDetailResult) => {
  await ElMessageBox.confirm('是否确认完成？', {
    type: 'warning'
  })
  const res = await request.put('Orders/UpdateStatus', {
    orderId: row.id,
    status: 1
  })
  if (!res) {
    refreshTableData()
    ElMessage.success('操作成功!')
  }
}


const handleCancel = async (row: OrderDetailResult) => {
  await ElMessageBox.confirm('是否确认取消？', {
    type: 'warning'
  })
  const res = await request.put('Orders/UpdateStatus', {
    orderId: row.id,
    status: 2
  })
  if (!res) {
    refreshTableData()
    ElMessage.success('操作成功!')
  }
}



</script>
