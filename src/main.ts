import { createApp } from 'vue'
import store from '@/store/index'
import router from '@/router'
import extend from '@/frame/extend'

import App from '@/App.vue'

createApp(App)
  .use(router)
  .use(store)
  .use(extend)
  .mount('#app')
