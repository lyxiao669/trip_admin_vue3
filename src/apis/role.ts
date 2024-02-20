/**
 * 获取菜单
 */

 import request from '@/apis/utils/request'

 import { curryFn, createApiUrl } from '@/apis/utils'
 
 const urlCreator = curryFn<string>(createApiUrl, 'Identity')
 
 // 获取全部角色
 export const getRoleListApi = async function () {
   try {
     const result = await request.get<GetRolesModel[]>(urlCreator('Roles'))
     return result
   } catch (error) {
     console.log('获取角色失败 fail', error)
     return null
   }
 }

 // 获取角色
 export const getRoleSingleApi = async function (roleId: number) {
  try {
    const result = await request.get<GetRolesModel>(urlCreator('Roles/:id'), {
      id: roleId
    })
    return result
  } catch (error) {
    console.log('获取角色失败 fail', error)
    return null
  }
}
 
 // 新增
 export const addRoleApi = async function (data: any) {
   try {
     const result = await request.post<any>(urlCreator('Roles'), {
       ...data
     })
     return result
   } catch (error) {
     console.log('新增角色失败 fail', error)
     return null
   }
 }
 
 // 修改
 export const updateRoleApi = async function (data: any) {
   try {
     const result = await request.put<any>(urlCreator('Roles'), {
       ...data
     })
     return result
   } catch (error) {
     console.log('修改角色失败 fail', error)
     return null
   }
 }
 
 // 删除
 export const deleteRoleApi = async function (id: number) {
   try {
     const result = await request.delete<any>(urlCreator('Roles', ':id'), {
       id
     })
     return result
   } catch (error) {
     console.log('删除菜单失败 fail', error)
     return null
   }
 }
 
// 角色赋权
 // 删除
 export const patchRoleMenus = async function (data: { id: number, menuIds: number[] }) {
  try {
    const result = await request.put<any>(urlCreator('Roles/Menus'), data)
    return result
  } catch (error) {
    console.log('赋权菜单失败 fail', error)
    return null
  }
}