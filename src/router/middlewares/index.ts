/**
 * 添加路由守卫
 */

import { RouteLocationNormalized } from 'vue-router'
import { Next } from '@/router'
import auth from './auth'


type Middleware = {
  (to: RouteLocationNormalized, from: RouteLocationNormalized, next: Next): Promise<any>;
}

const middlewares: Middleware[] = [
  auth
]

function wrappMiddleware(middleware: Middleware) {
  return function(to: RouteLocationNormalized, from: RouteLocationNormalized, next: Next) {

    return new Promise(async resolve => {
      await middleware(to, from, next)
      resolve(true)
    })
  }
}

export default middlewares.map(middleware => {
  return wrappMiddleware(middleware)
})
