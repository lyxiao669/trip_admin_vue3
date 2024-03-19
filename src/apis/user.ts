/**
 * 用户模块
 */

import request from '@/apis/utils/request'

import tokenStorage from '@/frame/utils/token'

import { curryFn, createApiUrl } from '@/apis/utils'

const urlCreator = curryFn<string>(createApiUrl, 'IdentityUser')

// 获取账号列表
export const getUserListApi = async function (roleId: number) {
  try {
    const result = await request.get<GetIdentityUserModel[]>(urlCreator(''), {
    roleId: roleId
    })
    return result
  } catch (error) {
    console.log('获取用户列表失败 fail', error)
    return null
  }
}

// 新增账号
export const addUserApi = async function (data: UpdateIdentityUserModel) {
  try {
    const result = await request.post<any>(urlCreator(''), {
      ...data
    })
    return result
  } catch (error) {
    console.log('新增用户失败 fail', error)
    return null
  }
}

// 删除账号
export const delUserApi = async function (id: number) {
  try {
    const result = await request.delete<any>(urlCreator(':id'), {
      id: id
    })
    return result
  } catch (error) {
    console.log('删除用户失败 fail', error)
    return null
  }
}

// 更新账号
export const updUserApi = async function (data: UpdateIdentityUserModel) {
  try {
    const result = await request.put<any>(urlCreator('Roles'), {
      ...data
    })
    return result
  } catch (error) {
    console.log('更新用户角色失败 fail', error)
    return null
  }
}

// 更新账号密码
export const updUserPasswordApi = async function (data: { id: number; password: string }) {
  try {
    const result = await request.put<any>(urlCreator('PassWord'), {
      ...data
    })
    return result
  } catch (error) {
    console.log('更新用户密码失败 fail', error)
    return null
  }
}

// 检查登录
export const checkLoginApi = async function () {
  try {
    return await request.get<LoginUserResultModel>(urlCreator('UserInfo'))
  } catch (error) {
    console.log('login fail', error)
    return null
  }
}

// 登录
export const loginApi = async function (model: LoginRequestModel) {
  try {
    return await request.post<LoginResultModel>(urlCreator('Login'), model)

  } catch (error) {
    console.log('login fail', error)
    return null
  }
}

// 获取用户组菜单
export const getUserMenusApi = async function () {
  try {
    const result = await request.get<MenuRecordListModel>(urlCreator('Grant/Menus'))
    return result.map(a => {
      a.menuPid = a.menuPid === 0 ? undefined : a.menuPid
      return a
    })
  } catch (error) {
    console.log('获取用户组权限失败 fail', error)
    return null
  }
}
