import { RootState } from "@/store"
import { ElForm } from "element-plus"
import { ref } from "vue"
import { RouteLocationNormalizedLoaded, Router, useRoute, useRouter } from "vue-router"
import { useStore } from "vuex"

const loginFormRef = ref<typeof ElForm>()
const loading = ref(false)

// 登录成功后的操作
function onLoginSuccess(router: Router, route: RouteLocationNormalizedLoaded) {
  let redirect = ''
  let otherQuery = {}

  let query = { ...route.query }
  // 取重定向地址
  if (query.redirect) {
    redirect = query.redirect as string
    delete query.redirect
  }
  // 保存其它参数
  otherQuery = query

  // 如果没有重新向地址或者是登录页，去首页
  if (!redirect || redirect === '/login') {
    redirect = '/'
  }

  router.push({
    path: redirect,
    query: otherQuery,
  })
}

export default function useUserLogin(loginForm: LoginRequestModel) {
  const store = useStore<RootState>()
  const route = useRoute()
  const router = useRouter()

  const handleLogin = function() {
    if (!loginFormRef.value) return
    
    // 校验表单规则
    loginFormRef.value.validate(async (valid: boolean) => {
      if (!valid) {
        console.log('error submit!!')
        return
      }
  
      loading.value = true

      const userData = await store.dispatch('user/login', loginForm)
      if (userData) {
        await store.dispatch('user/getPower')
        onLoginSuccess(router, route)
      }

      loading.value = false
    })
  }

  return {
    handleLogin,
    loading,
    loginFormRef
  }
}