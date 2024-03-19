<!-- 重刷页面 -->
<template>
  <div v-loading="true" element-loading-text="页面重定向..." style="height: 100%;"></div>
</template>

<script lang="tsx">

import { defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()

    let { params, query } = route

    const path = decodeURIComponent(params.path as string)
    const queryString = path.split('?')[1] ?? ''
    queryString.split('&').map(valueItem => {
      const [key, value] = valueItem.split('=')
      query[key] = value
    })

    router.replace({ path: '/' + path, query })
  }
})
</script>
