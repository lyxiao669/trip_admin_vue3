import { Module } from 'vuex'
import { RootState } from '../index'

import Storage from '@/frame/utils/storage'
const sidebarStorage = new Storage('sidebarStatus')

export type Device = 'desktop' | 'mobile'

export type AppState = {
  sidebar: {
    opened: boolean,
    withoutAnimation: boolean
  },
  device: Device
}

export type AppModule = Module<AppState, RootState>

const state: AppModule['state'] = {
  sidebar: {
    opened: !!Number(sidebarStorage.get()),
    withoutAnimation: true
  },
  device: 'desktop'
}

const mutations: AppModule['mutations'] = {
  toggleSideBar: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      sidebarStorage.set(1)
    } else {
      sidebarStorage.set(0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation: boolean) => {
    sidebarStorage.set(0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device: Device) => {
    state.device = device
  }
}

const actions: AppModule['actions'] = {
  closeSideBar({ commit }, { withoutAnimation }: { withoutAnimation: boolean }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device: Device) {
    commit('TOGGLE_DEVICE', device)
  }
}

const appModule: AppModule = {
  namespaced: true,
  state,
  mutations,
  actions
}

export default appModule
