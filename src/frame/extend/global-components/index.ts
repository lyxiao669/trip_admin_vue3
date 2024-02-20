import { App } from 'vue'

import JzIcon from '@/frame/components/jz-icon/index.vue'
import TableImages from '@/frame/components/table-images/index.vue'

const compoennts = [
  JzIcon,
  TableImages
]

export default {
  install(app: App) {
    compoennts.forEach(component => {
      app.component(component.name, component)
    })
  }
}
