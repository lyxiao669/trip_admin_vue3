import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus';
// let token = 'CW1HPTqel4taFaCSyLMaff2h+Qum8wi3PzCRshL6hTXD20S2M83FyGXa9nkKNQwRh1N1eyA2nk4ySdFD/CXn2CkvgZNnACBPUHaYkM/FlAcrMgbeDmxGwD8I7lj5J3FxK9+uf9rvicMeHgdZgMj8aqam76/hRUc5oKCujXIfFxF7GwVe7gX1yclJ+ThvVus6Hiso5V80hfUTWRmg7xmN9E4Nu1Av/r8lyLDOen/IF+fY/7PLBAi8XL/l5Ai0UuICXQBVbtflKuPpssFwiEfvXtuoAIEZob7GQRzAvOzG6qMfVQrlHwv3g8SbpNbvDjKXMfXXdgnbyW3dmodBcCPtpQ=='
let token = localStorage.getItem('token')


let request = axios.create({
  timeout: 10000,
  headers: {
    authorization: `Bearer ${token}`
  }
})

request.interceptors.response.use((response: any) => {
  if (response.data.code != 0) {
    // ElMessage.warning(`发生错误${response.msg}`)
  }
  return Promise.resolve(response.data.data)
}, err => {
  // ElMessage.error(`发生错误${err}`)
  return Promise.reject(err)
})

export default request