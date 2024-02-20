import { AjaxConfig, createRequest } from '@juzhenfe/request'

import { baseURL } from '@/config'
import { ElMessage } from 'element-plus'

const requestConfig: AjaxConfig = {
  baseURL: baseURL,
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
}

const request = createRequest(requestConfig, {
  process: true
})

export default request

