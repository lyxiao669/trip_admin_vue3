import { createStore } from 'vuex'

import appModule, { AppState } from './modules/app'
import userModule, { UserState } from './modules/user'
import tagsViewModule, { TagsViewState } from './modules/tags-view'

export type RootState = {
  app: AppState;
  user: UserState;
  tagsView: TagsViewState;
}

const store = createStore({
  modules: {
    app: appModule,
    user: userModule,
    tagsView: tagsViewModule
  },
  strict: true
})

export default store

