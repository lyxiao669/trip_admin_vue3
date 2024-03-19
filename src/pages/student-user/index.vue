<template>
  <div style="height: 100%">
    <page-model 
      ref="pageModelRef"
      :config="config"
      :reflections="reflections"
      @import="handleImport"
      @achieve="handleAchieve"
      @export="handleExport"
      @_search="_search"
    />

    <import-dialog ref="importDialogRef" @success="refresh" />
    <achieve-dialog ref="achieveDialogRef" />
  </div>
</template>

<script setup lang="ts">
import { defineConfig } from '@juzhenfe/page-model'
import { defineComponent, ref, onMounted } from 'vue'
import request from '@/apis/utils/request'
import { ElMessage } from 'element-plus'
import importDialog from './components/import-dialog/index.vue'
import achieveDialog from './components/achieve-dialog/index.vue'
import router from '@/router'
import { dateFormat } from '@/frame/utils'

const pageModelRef = ref<any>(null)
const importDialogRef = ref<any>(null)
const achieveDialogRef = ref<any>(null)

let config = defineConfig<StudentUser, { extend: ' ' }>({
  url: 'StudentUsers',
  delUrl: 'StudentUsers/:id',
  delKey: 'id',
  reflect: true,
  addButton: {
    text: '添加学生'
  },
  topBar: {
    els: [
      {
        type: 'success',
        text: '导入',
        event: 'import'
      },
      {
        type: 'success',
        text: '导出二维码',
        event: 'export'
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
      },
      {
        eType: 'el-select',
        label: '学校',
        prop: 'school',
        props: {
          filterable: true
        },
        optionsData: {
          _reflect: 'schools'
        }
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
      }
    ]
  },
  table: {
    operate: {
      width: 200,
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
          text: '用户成绩',
          event: 'achieve',
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
        label: '学校',
        prop: 'school'
      },
      {
        label: '年级',
        prop: 'grade'
      },
      {
        label: '年龄',
        prop: 'age'
      },
      {
        label: '性别',
        prop: 'gender'
      },
      {
        label: '创建时间',
        prop: 'createTime'
      }
    ]
  },
  form: {
    labelWidth: '120px',
    required: ['fullName', 'mobile', 'school', 'grade'],
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
        label: '学校',
        prop: 'school'
      },
      {
        eType: 'el-input',
        label: '年级',
        prop: 'grade'
      },
      {
        eType: 'el-input',
        label: '年龄',
        prop: 'age'
      },
      {
        eType: 'el-input',
        label: '性别',
        prop: 'gender'
      }
    ]
  }
})

let reflections = ref({
  grades: [],
  schools: []
})

let otherParams = ref<any>()

onMounted(() => {
  getGrade()
  getSchool()
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

const getSchool = async () => {
  const res = await request.get('StudentUsers/school')
  reflections.value.schools = res.map((item: any) => {
    return {
      label: item,
      value: item
    }
  })
}

const _search = (params: any) => {
  otherParams.value = params
}

const handleImport = () => {
  importDialogRef.value.show()
}

const handleExport = async () => {
  const res = await request.get('QrCodes', otherParams.value, undefined, {
    responseType: 'blob'
  })
  // const resUrl = URL.createObjectURL(new Blob([res], { type: 'application/vnd.ms-excel' }))
  const resUrl = URL.createObjectURL(res)
  const link = document.createElement('a')
  link.href = resUrl
  link.download = '学生二维码' // 自定义文件名
  link.click() // 下载文件
  URL.revokeObjectURL(resUrl)
  document.body.removeChild(link)
  ElMessage.success('导出二维码成功!')
}

const handleAchieve = (row: StudentUser) => {
  achieveDialogRef.value.show(row)
}

const refresh = () => {
  pageModelRef.value.refreshTableData()
}


</script>
