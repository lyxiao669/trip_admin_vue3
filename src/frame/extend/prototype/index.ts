import { App } from 'vue'

import string from './string'
import number from './number'

export default {
  install(app: App) {
    app.use(string)
    app.use(number)
  }
}
