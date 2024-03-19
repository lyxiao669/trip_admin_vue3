/**
 * 获取菜单
 */

import request from '@/apis/utils/request'

import { curryFn, createApiUrl } from '@/apis/utils'

const urlCreator = curryFn<string>(createApiUrl, 'Identity')

// 获取全部菜单
export const getMenusListApi = async function () {
  try {
    const result = await request.get<MenuRecordListModel>(urlCreator('Menus'))
    return result.map(a => {
      a.menuPid = a.menuPid === 0 ? undefined : a.menuPid
      return a
    })
  } catch (error) {
    console.log('获取菜单失败 fail', error)
    return null
  }
}

// 新增
export const addMenuApi = async function (data: any) {
  try {
    const result = await request.post<MenuRecordListModel>(urlCreator('Menus'), {
      ...data
    })
    return result
  } catch (error) {
    console.log('新增菜单失败 fail', error)
    return null
  }
}

// 修改
export const updateMenuApi = async function (data: any) {
  try {
    const result = await request.put<MenuRecordListModel>(urlCreator('Menus'), {
      ...data
    })
    return result
  } catch (error) {
    console.log('修改菜单失败 fail', error)
    return null
  }
}

// 删除
export const deleteMenuApi = async function (id: number) {
  try {
    const result = await request.delete<MenuRecordListModel>(urlCreator('Menus', ':id'), {
      id
    })
    return result
  } catch (error) {
    console.log('删除菜单失败 fail', error)
    return null
  }
}
