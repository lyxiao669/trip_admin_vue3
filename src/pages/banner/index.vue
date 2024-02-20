<template>
  <page-model 
    :config="config"
  />
</template>

<script setup lang="tsx">
import { defineConfig } from '@juzhenfe/page-model'
import { defineComponent } from 'vue'

let config = defineConfig<Banner, { extend: ' ' }>({
  url: 'Banners',
  delUrl: 'Banners/:id',
  addButton: {
    text: '添加轮播图'
  },
  delKey: 'id',
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
        label: '图片',
        prop: 'img',
        renderFn(row) {
          return (
            <el-image style="width: 50px; height: 50px" src={ row.img } fit="contain"></el-image>
          )
        }
      },
      {
        label: '顺序',
        prop: 'sort'
      },
      {
        label: '创建时间',
        prop: 'createTime'
      }
    ]
  },
  form: {
    labelWidth: '120px',
    required: ['img'],
    els: [
      {
        eType: 'img-upload',
        label: '图片',
        prop: 'img'
      },
      {
        eType: 'el-input-number',
        label: '顺序',
        prop: 'sort'
      }
    ]
  }
})

</script>
