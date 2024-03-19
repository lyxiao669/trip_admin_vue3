<template>
  <page-model 
    :config="config"
  />
</template>

<script setup lang="tsx">
import { defineConfig } from '@juzhenfe/page-model'
import { defineComponent } from 'vue'

let config = defineConfig<TouristUser, { extend: ' ' }>({
  url: 'Users',
  delUrl: 'Users/:id',
  addButton: {
    text: '添加用户'
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
        label: '头像',
        prop: 'avatar',
        renderFn(row) {
          return (
            <el-image style="width: 50px; height: 50px" src={ row.avatar } fit="contain"></el-image>
          )
        }
      },
      {
        label: '用户名',
        prop: 'userName'
      },
      {
        label: '密码',
        prop: 'password'
      }
    ]
  },
  form: {
    labelWidth: '120px',
    required: ['userName','password'],
    els: [
      {
        eType: 'img-upload',
        label: '头像',
        prop: 'avatar'
      },
      {
        eType: 'el-input',
        label: '账号',
        prop: 'userName'
      },
      {
        eType: 'el-input',
        label: '密码',
        prop: 'password'
      }
    ]
  }
})

</script>
