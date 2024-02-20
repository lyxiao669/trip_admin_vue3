/**
 * 枚举文件
 */

export enum TaskOptionItemStatus {
  绿色,
  橙色,
  灰色
}

export enum EventStatusEnum {
  正常,
  异常
}

export enum TaskTypeEnum {
  日常任务 = 1,
  临时任务 = 2
}

export enum TasksStatus {
  未派发 = 0,
  已派发 = 1,
  已完成 = 2,
}

export enum AbnormalEventStatusEnum {
  未处理 = 0,
  置为正常=1,
  自处理=2,
  转为任务=3
}

export enum AppUserRoleEnum {
  巡查
}

export enum ExecuteTypeEnum {
  每日任务 = 0,
  每周任务 = 1,
  每月任务 = 2
}
