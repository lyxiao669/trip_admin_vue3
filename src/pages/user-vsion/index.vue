<template>
  <div style="height: 100%">
    <page-model 
      ref="pageModelRef"
      :config="config"
      @import="handleImport"
    />

    <import-dialog ref="importDialogRef" @success="refresh" />
  </div>
</template>

<script setup lang="ts">
import { defineConfig } from '@juzhenfe/page-model'
import { defineComponent, ref } from 'vue'
import importDialog from './components/import-dialog/index.vue'

const importDialogRef = ref<any>(null)
const pageModelRef = ref<any>(null)

let config = defineConfig<UserVsion, { extend: ' ' }>({
  url: 'UserVsions',
  delUrl: 'UserVsions/:id',
  delKey: 'id',
  addButton: {
    text: '添加学生视力'
  },
  topBar: {
    els: [
      {
        type: 'success',
        text: '导入',
        event: 'import'
      }
    ]
  },
  searchForm: {
    els: [
      {
        eType: 'el-input',
        label: '姓名',
        prop: 'fullName'
      },
      {
        eType: 'el-input',
        label: '手机号',
        prop: 'mobile'
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
        }
      ]
    },
    els: [
      {
        label: '学生姓名',
        prop: 'fullName'
      },
      {
        label: '手机号',
        prop: 'mobile'
      },
      {
        label: '左眼视力',
        prop: 'leftEyeVision'
      },
      {
        label: '右眼视力',
        prop: 'rightEyeVision'
      },
      {
        label: '左眼散光',
        prop: 'leftEyeAstigmatism'
      },
      {
        label: '右眼散光',
        prop: 'rightEyeAstigmatism'
      },
      {
        label: '左眼瞳距',
        prop: 'leftEyePupilDistance'
      },
      {
        label: '右眼瞳距',
        prop: 'rightEyePupilDistance'
      },
      {
        label: '左眼轴向',
        prop: 'leftEyeAxial'
      },
      {
        label: '右眼轴向',
        prop: 'rightEyeAxial'
      },
      {
        label: '医生建议',
        prop: 'doctorAdvice'
      },
      {
        label: '创建时间',
        prop: 'createTime'
      }
    ]
  },
  form: {
    labelWidth: '120px',
    required: ['fullName', 'mobile', 'leftEyeVision', 'rightEyeVision'],
    els: [
      {
        eType: 'el-input',
        label: '学生姓名',
        prop: 'fullName'
      },
      {
        eType: 'el-input',
        label: '手机号',
        prop: 'mobile'
      },
      {
        eType: 'el-input',
        label: '左眼视力',
        prop: 'leftEyeVision'
      },
      {
        eType: 'el-input',
        label: '右眼视力',
        prop: 'rightEyeVision'
      },
      {
        eType: 'el-input',
        label: '左眼散光',
        prop: 'leftEyeAstigmatism'
      },
      {
        eType: 'el-input',
        label: '右眼散光',
        prop: 'rightEyeAstigmatism'
      },
      {
        eType: 'el-input',
        label: '左眼瞳距',
        prop: 'leftEyePupilDistance'
      },
      {
        eType: 'el-input',
        label: '右眼瞳距',
        prop: 'rightEyePupilDistance'
      },
      {
        eType: 'el-input',
        label: '左眼轴向',
        prop: 'leftEyeAxial'
      },
      {
        eType: 'el-input',
        label: '右眼轴向',
        prop: 'rightEyeAxial'
      },
      {
        eType: 'el-input',
        label: '医生建议',
        prop: 'doctorAdvice'
      }
    ]
  }
})

const handleImport = () => {
  importDialogRef.value.show()
}

const refresh = () => {
  pageModelRef.value.refreshTableData()
}

</script>
