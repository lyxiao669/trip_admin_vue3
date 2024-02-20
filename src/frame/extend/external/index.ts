import { App } from 'vue'

import PageModel from './page-model'
import ElementPlus from './element-ui'
import modules from './modules'

export default {
  install(app: App) {
    app.use(ElementPlus)
    app.use(PageModel)
    app.use(modules)
  }
}
