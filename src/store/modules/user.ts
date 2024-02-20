import { Module } from 'vuex'
import { pathToRegexp } from 'path-to-regexp'
import { RootState } from '@/store'
import tokenStorage from '@/frame/utils/token'
import { checkLoginApi, getUserMenusApi, loginApi } from '@/apis/user'
import { tree, flatList, jsonClone, AddChildrenType } from '@/frame/utils'
import childrenRoutes from '@/router/modules'
import { findFirstRouteMenu } from '../utils'

// 拿到路由的一维数据
const flatedRoutes = flatList(childrenRoutes, 'children')

export type AddChildrenTypeMenu = AddChildrenType<MenuRecordModel>

export type UserState = {
  userData?: LoginUserResultModel | null;
  permissionMenus?: MenuRecordListModel | null;
  processedPermissionMenus?: MenuRecordModel[] | null;
  navbarMenuIndex: number;
  userFirstMenu?: AddChildrenTypeMenu | null;
}

export type UserModule = Module<UserState, RootState>

const state: UserModule['state'] = {
  userData: null, // 用户模型
  permissionMenus: null, // 用户所在组可使用的权限菜单列表
  processedPermissionMenus: null, // 清洗后的(hidden)的菜单列表
  navbarMenuIndex: 0, // navbar菜单栏的索引
  userFirstMenu: null // 首个可进入的菜单
}

const mutations: UserModule['mutations'] = {
  updateUserData(state, userData: LoginUserResultModel) {
    state.userData = userData
  },
  updateNavbarMenuIndex(state, index: number) {
    state.navbarMenuIndex = index
  },
  updatePermissionMenus(state, menuList: MenuRecordListModel) {
    state.permissionMenus = menuList
  },
  updateProcessPermissionMenus(state, permissionMenus: MenuRecordListModel) {
    // json拷贝一次数据，防止影响源数据
    let resultMenus = jsonClone(permissionMenus)

    // 如果路由中定义了meta: hidden, 为菜单添加上hidden字段
    resultMenus.forEach(menuItem => {
      if (!menuItem.menuUrl) return
      // 匹配自己的路由
      const route = flatedRoutes.find(route => pathToRegexp(route.path).test(<string>menuItem.menuUrl))
      route?.meta?.hidden && (menuItem.hidden = true)
    })

    // 过滤空的父菜单
    let treeMenus = tree(resultMenus, 'id', 'menuPid')

    function innerFilterEmpty(list: AddChildrenType<MenuRecordModel>[]): AddChildrenType<MenuRecordModel>[] {
      return list.filter(menuItem => {
        if (menuItem.menuUrl) {
          return true
        } else {
          if (menuItem.children) {
            menuItem.children = innerFilterEmpty(menuItem.children)
          }
          return !!(menuItem.children?.length)
        }
      })
    }

    state.processedPermissionMenus = innerFilterEmpty(treeMenus)
  },
  updateUserFirstMenu(state) {
    if (!state.processedPermissionMenus) return null

    const processedPermissionMenus: AddChildrenTypeMenu[] = state.processedPermissionMenus

    if (!processedPermissionMenus.length) {
      return null
    }

    state.userFirstMenu = findFirstRouteMenu(processedPermissionMenus)
  }
}

const getters: UserModule['getters'] = {
}

const actions: UserModule['actions'] = {
  // 检查登录
  async checkLogin({ commit }) {
    if (tokenStorage.value) {
      const checkLoginData = await checkLoginApi()
      // 存在token和用户数据
      if (checkLoginData) {
        commit('updateUserData', checkLoginData)
        return true
      } else {
        tokenStorage.remove()
        return false
      }
    } else {
      return false
    }
  },
  // 登录
  async login(store, loginForm: LoginRequestModel) {
    const loginData = await loginApi(loginForm)
    if (loginData) {
      // 登录成功，保存token
      tokenStorage.set(loginData.access_token)
      return !!loginData
    } else {
      tokenStorage.remove()
      return false
    }
  },
  // 获取用户权限
  async getPower({ state, commit }) {
    if (!state.userData)  return null
    
    // 获取用户所在组的权限和菜单列表
    const menuList = await getUserMenusApi()

    if (!menuList) {
      tokenStorage.remove()
      // 获取数据失败
      return null
    }

    // 清洗出用户组权限菜单数据
    const permissionMenus = menuList
      .sort((a, b) => (b.menuSort ?? 0) - (a.menuSort ?? 0))
    commit('updatePermissionMenus', permissionMenus)

    // 再次清洗，添加hidden
    commit('updateProcessPermissionMenus', permissionMenus)

    // 设置首个可进的菜单
    commit('updateUserFirstMenu')
    
    return permissionMenus
  },
  // 退出登录
  async logout({ commit }) {
    // 清除token和userData
    tokenStorage.remove()

    commit('updateUserData', null)
    commit('updatePermissionMenus', null)
  }
}

const userModule: UserModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}

export default userModule
