import { AjaxConfig, createRequest } from '@juzhenfe/request'
import tokenStorage from '@/frame/utils/token'
import { baseURL } from '@/config'
import { ElMessage } from 'element-plus'

const requestConfig: AjaxConfig = {
  baseURL: baseURL,
  auth: 'JWT',
  getToken() {
    return tokenStorage.value ?? ''
  },
  fail(response) {
    const message = response?.data?.ret_msg ?? '网络错误，请稍后重试'
    ElMessage({
      type: 'error',
      message
    })
  }
}
// console.log("requestConfig::",requestConfig)
const request = createRequest(requestConfig, {
  process: true
})

export default request
