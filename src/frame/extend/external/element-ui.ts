import { App } from 'vue'

// import ElementPlus from 'element-plus'
// import locale from 'element-plus/lib/locale/lang/zh-cn'
// import 'dayjs/locale/zh-cn'
// import 'element-plus/packages/theme-chalk/src/index.scss';
import zhCn from 'element-plus/dist/locale/zh-cn'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
export default {
  install(app: App) {
    app.use(ElementPlus, {
      zhCn,
      zIndex: 999
    })
  }
}
