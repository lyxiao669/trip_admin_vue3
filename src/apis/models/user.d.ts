/**
 * 用户模型
 */

// 用户表模型
interface IdentityUserModel {
  id: number;
  account: string;
  password: string;
  name: string;
  headImg: string;
  mobile: string;
}

// 获取的用户列表的模型
interface GetIdentityUserModel extends IdentityUserModel {
  role?: GetRolesModel;
}

interface UpdateIdentityUserModel extends IdentityUserModel {
  roleId: number;
}

// 登录模型
interface LoginRequestModel {
  account: string; // 账号
  password: string; // 密码
}

interface LoginResultModel {
  access_token: string;
}

// 用户数据
interface LoginUserResultModel {
  name: string;
  headImg?: string;
  mobile?: string;
  account?: string;
  token: string; // 令牌
  role?: GetRolesModel; // 所在部门信息
}

// Token
type TokenModel = string
