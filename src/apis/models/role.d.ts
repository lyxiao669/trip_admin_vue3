// 角色组模型
interface RolesModel {
  id: number;
  roleName: string;
}

interface GetRolesModel extends RolesModel {
  menus: {id: number;menuId: number}[];
}
