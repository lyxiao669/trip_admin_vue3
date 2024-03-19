import { createRouter, createWebHashHistory, NavigationGuardNext, RouteRecordRaw } from 'vue-router'
import middlewares from './middlewares'

import Layout from '@/frame/layout/index.vue'
import Login from '@/frame/pages/login/index.vue'
import HomeRedirect from '@/frame/pages/home-redirect/index.vue'
import RedirectTo from '@/frame/pages/redirect-to/index.vue'
import Error404 from '@/frame/pages/404/index.vue'
import Menu from '@/frame/pages/menu/index.vue'
import Role from '@/frame/pages/role/index.vue'

import childrenRoutes from './modules'

export {
  childrenRoutes
}

export interface Next extends NavigationGuardNext {}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/home-redirect',
    children: [
      {
        path: '/home-redirect',
        component: HomeRedirect,
        meta: {
          title: '首页重定向',
          noView: true
        }
      },
      {
        path: '/redirect/:path',
        component: RedirectTo,
        meta: {
          title: '页面重定向',
          noView: true
        }
      },
      {
        path: '/menu',
        component: Menu,
        name: 'menu',
        meta: {
          title: '菜单管理'
        }
      },
      {
        path: '/role',
        component: Role,
        name: 'role',
        meta: {
          title: '部门管理'
        }
      },
      ...childrenRoutes
    ]
  },
  {
    path: '/login',
    component: Login,
    meta: {
      title: '登录',
      noView: true
    }
  },
  {
    path: '/404',
    component: Error404,
    meta: {
      title: 'PageNotFound',
      noView: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

router.beforeEach(async (to, from, next) => {

  // 内部维护状态，是否已经next，已经next
  let isNexted = false

  const _next: Next = (params?: any) => {
    if (!isNexted) {
      isNexted = true
      next(params)
    }
  }

  for (let i = 0; i < middlewares.length; i++) {
    await middlewares[i](to, from, _next)
  }

  // 防止最后没有中间件next，主动next一次
  _next(() => {})

})

export default router