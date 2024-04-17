import { RouteRecordRaw } from 'vue-router'

/**
 * 页面
 */
export enum PageRoutes {
  users = 'users',
  sceniSpots = 'sceni-spots',
  orders = 'orders',
  feedback = 'feedback'
}

// import studentUser from '@/pages/student-user/index.vue'
// import userVsion from '@/pages/user-vsion/index.vue'
// import question from '@/pages/question/index.vue'
// import questionBack from '@/pages/question-bank/index.vue'
// import banner from '@/pages/banner/index.vue'
import Users from '@/pages/Users/index.vue'
import sceniSpots from '@/pages/scenic-spots/index.vue'
import Orders from '@/pages/Orders/index.vue'
import Feedback from '@/pages/Feedback/index.vue'
const pages: RouteRecordRaw[] = [
  {
    path: '/users',
    component: Users,
    name: PageRoutes.users,
    meta: {
      title: '游客管理'
    }
  },
  {
    path: '/sceni-spots',
    component: sceniSpots,
    name: PageRoutes.sceniSpots,
    meta: {
      title: '景区管理'
    }
  }, {
    path: '/orders',
    component: Orders,
    name: PageRoutes.orders,
    meta: {
      title: '订单管理'
    }
  },
  {
    path: '/feedback',
    component: Feedback,
    name: PageRoutes.feedback,
    meta: {
      title: '反馈管理'
    }
  }
]

export default pages
