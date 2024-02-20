import { RootState } from "@/store"
import { useRouter } from "vue-router"
import { useStore } from "vuex"

const checkLogin = () => {
  const store = useStore<RootState>()
  const router = useRouter()

  store.dispatch('user/checkLogin').then((isLogin: boolean) => {
    isLogin && router.push('/')
  })
}

export default checkLogin
