import { App } from 'vue'

// 原型方法扩展
import prototype from './prototype'

// 第三方库引用
import external from './external'

// 全局组件
import globalComponents from './global-components'

// 指令
import directives from './directives'

// error-handler
import errorHandler from './error-handler'

// 需要import的样式文件
import './styles'

export default {
  install(app: App) {
    app.use(prototype)
    app.use(external)
    app.use(globalComponents)
    app.use(errorHandler)
    app.use(directives)
  }
}
