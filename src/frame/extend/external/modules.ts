import { App } from 'vue'

import '@juzhenfe/modules/dist/index.min.css'
import modules from '@juzhenfe/modules'
import { qiniu, normalUpload } from '@/config'
import { ElMessage } from 'element-plus'

import { createRequest } from '@juzhenfe/request'

const uploadRequest = createRequest({
  baseURL: '/',
  resolveJudge(response) {
    return response.status === 200
  },
  fail(response) {
    const message = response?.data?.ret_msg ?? '网络错误，请稍后重试'
    ElMessage({
      type: 'error',
      message
    })
  }
}, {
  process: true
})

export default {
  install(app: App) {
    app.use(modules, {
      upload: {
        request: uploadRequest,
        normal: normalUpload,
        qiniu: qiniu
      },
      aMap: {
        key: 'b9256a35ce66c2f7b6eff1d530f5c405'
      }
    })
  }
}
