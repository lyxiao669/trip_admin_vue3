import { RouteRecordRaw } from 'vue-router'

/**
 * 页面
 */
export enum PageRoutes {
  studentUser = 'student-user',
  userVsion = 'user-vsion',
  question = 'question',
  questionBack = 'question-back',
  banner = 'banner',
  users = 'users',
  sceniSpots = 'sceni-spots'
}

import studentUser from '@/pages/student-user/index.vue'
import userVsion from '@/pages/user-vsion/index.vue'
import question from '@/pages/question/index.vue'
import questionBack from '@/pages/question-bank/index.vue'
import banner from '@/pages/banner/index.vue'
import Users from '@/pages/users/index.vue'
import sceniSpots from '@/pages/scenic-spots/index.vue'
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
  },
  {
    path: '/student-user',
    component: studentUser,
    name: PageRoutes.studentUser,
    meta: {
      title: '学生用户'
    }
  },
  {
    path: '/user-vsion',
    component: userVsion,
    name: PageRoutes.userVsion,
    meta: {
      title: '学生视力'
    }
  },
  {
    path: '/question',
    component: question,
    name: PageRoutes.question,
    meta: {
      title: '问题管理'
    }
  },
  {
    path: '/question-bank',
    component: questionBack,
    name: PageRoutes.questionBack,
    meta: {
      title: '问题题库'
    }
  },
  {
    path: '/banner',
    component: banner,
    name: PageRoutes.banner,
    meta: {
      title: '轮播图管理'
    }
  }
]

export default pages
