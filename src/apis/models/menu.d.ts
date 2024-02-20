// 菜单模型
interface MenuRecordModel {
  // 服务端返回字段
  id: number;
  menuName: string;
  menuLevel: number;
  menuIcon?: string;
  menuUrl?: string;
  menuPid?: number;
  menuSort?: number; // 需要添加的字段
  
  // 前端添加的字段
  hidden?: boolean;
  children?: MenuRecordModel[]
}

interface MenuRecordListModel extends Array<MenuRecordModel> {}
