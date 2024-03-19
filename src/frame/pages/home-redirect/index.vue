<!-- 首页，自动跳转可去页面 -->

<script lang="ts">
import { defineComponent } from 'vue'
import store from '@/store'

export default defineComponent({
  beforeRouteEnter(from, to, next) {
    // 去第一个可用页面
    let menuUrl = store.state.user.userFirstMenu?.menuUrl
    if (menuUrl) {
      next(menuUrl)
    } else {
      next()
    }
  }
})
</script>
