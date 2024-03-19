/**
 * App用户
 */

import { AppUserRoleEnum } from "./enum";

declare global {
  interface AppUserResultModel {
    id: number;
    account: string;
    password: string;
    userName: string;
    mobile: string;
    userRole: AppUserRoleEnum;
    createTime: string;
  }
}
