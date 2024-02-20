import { App } from 'vue'

import '@juzhenfe/page-model/dist/index.min.css'
import PageModel from '@juzhenfe/page-model'
import request from '@/utils/request'

export default {
  install(app: App) {
    PageModel.install(app, {
      request: request,
      config: {
        plugins: ['tableHeaderWidthAdjust'],
        urlMode: 'params',
        searchForm: {
          autoSearch: true,
          searchToolPlacement: 'bottom'
        },
        table: {
          els: []
        }
      }
    })
    PageModel
  }
}
