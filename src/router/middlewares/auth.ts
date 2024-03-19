/**
 * 鉴权相关
 */

import { RouteLocationNormalized } from "vue-router";

import { pathToRegexp } from 'path-to-regexp'

import store from '@/store'
import { Next } from "@/router";

// 白名单菜单列表，无需校验即可访问
export const whiteMenuPathList = [
  '/login',
  '/404'
]

const redirectToPath = '/redirect'

export default async function auth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: Next) {

  // 判断是否处于白名单
  if (!whiteMenuPathList.includes(to.path)) {
    // 不是白名单，进行校验
    const authResult = await store.dispatch('user/checkLogin')
    if (!authResult) {
      // 校验失败，去登录
      next('/login')
    } else {
      // 校验成功，获取用户权限
      let powerResult = true
      let userState = store.state.user

      if (!userState.permissionMenus) {
        powerResult = !!(await store.dispatch('user/getPower'))
      }

      if (powerResult) {

        // 如果是首页重定向的话，直接跳转
        if (to.path === '/home-redirect') {
          return next()
        }

        // 获取到用户的菜单列表，校验是否具有当前前往页面的权限
        const permissionMenus = userState.permissionMenus as MenuRecordListModel
        // 是否合法菜单
        let isValid = false

        for (const menu of permissionMenus) {
          const menuUrl = menu.menuUrl
          if (!menuUrl) {
            continue
          }
          
          if (pathToRegexp(menuUrl).test(to.path) || pathToRegexp(`${redirectToPath}${menuUrl}`).test(decodeURIComponent(to.path))) {
            isValid = true
            break
          }
        }

        if (isValid) {
          next()
        } else {
          next('/404')
        }

      } else {
        next('/login')
      }
    }

  } else {
    // 处于白名单直接通过
    next()
  }

}
