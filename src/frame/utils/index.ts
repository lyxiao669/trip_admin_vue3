import { consoleDev } from './console'
import { isArray, isEqual } from './is'

export const jsonClone = <T = any>(data: T): T => {
  return JSON.parse(JSON.stringify(data))
}


export type AddChildrenType<T> = T & {
  children?: T[]
}

export const tree = function <T = any>(data: T[], supKey: keyof T, subKey: keyof T) {
  data = jsonClone(data)

  // 1、将数据根据关联节点数据是否存在分成 分支和叶子
  let branches: AddChildrenType<T>[] = []
  let leaves: T[] = []

  data.forEach(item => {
    item[subKey] != null
      ? leaves.push(item)
      : branches.push(item)
  })

  // 2、对分支循环查找子元素进行挂载，直到所有分支都查找过
  function inner(branches: AddChildrenType<T>[]) {
    branches.forEach(branchItem => {
      let leftLeaves: T[] = []
      let children: T[] = []
      leaves.forEach(leaveItem => {
        if (branchItem[supKey] === leaveItem[subKey]) {
          // 匹配中，说明是该分支的子节点
          children.push(leaveItem)
        } else {
          leftLeaves.push(leaveItem)
        }
      })
      // 每次寻找完，重新设置剩余叶子
      leaves = leftLeaves
      if (children.length) {
        branchItem.children = children
        inner(branchItem.children)
      }
    })
  }

  inner(branches)

  if (leaves.length) {
    consoleDev('tree:::还剩余节点', leaves)
  } else {
    consoleDev('tree:::所有子节点挂载完毕')
  }

  return branches
}


export const flatList = <T = any>(data: T[], childrenKey: keyof T) => {
  data = jsonClone<T[]>(data)
  return data.reduce((memory: T[], item: T) => {
    if (item[childrenKey] && isArray(item[childrenKey])) {
      // 存在需要拍平的子元素列表
      memory = memory.concat(flatList((item[childrenKey]) as unknown as T[], childrenKey))
      delete item[childrenKey]
    }
    memory = memory.concat(item)
    return memory
  }, [] as T[])
}

export const getDateCompositions = (dateValue: Date = new Date()) => {
  return [
    dateValue.getFullYear(),
    dateValue.getMonth(),
    dateValue.getDate(),
    dateValue.getHours(),
    dateValue.getMinutes(),
    dateValue.getSeconds()
  ]
}

type FormatTemplate = 'yyyy-MM-dd hh:mm:ss' | 'yyyy-MM-dd'

export const dateFormat = (dateValue: string | number | Date, formatTemplate: FormatTemplate = 'yyyy-MM-dd hh:mm:ss') => {
  if (!dateValue) {
    return '----/--/--'
  }
  if (!(dateValue instanceof Date)) {
    if (typeof dateValue === 'string') {
      dateValue = dateValue.replace(/-/g, '/').replace(/T/g, ' ')
    }
    dateValue = new Date(dateValue)
  }

  const [year, month, day, hour, min, sec] = getDateCompositions(dateValue)

  const paddingZero = (n: number | string) => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }

  const replaceMaps: any = {
    y: paddingZero(year),
    M: paddingZero(month + 1),
    d: paddingZero(day),
    h: paddingZero(hour),
    m: paddingZero(min),
    s: paddingZero(sec)
  }

  return formatTemplate.replace(/./g, (val, index: number) => {
    let mapValue: string
    if (mapValue = replaceMaps[val]) {
      // 第一个match的索引
      const firstMatchIndex = formatTemplate.indexOf(val)
      return mapValue[index - firstMatchIndex]
    } else {
      return val
    }
  })

}

interface CompareResult<T = any> {
  add?: T[];
  upd?: T[];
  del?: T[];
}

interface CompareBaseOption {
  compareObject: false
}
interface CompareObjectOption {
  compareObject: true;
  compareKey: string;
}

export const compare = <T = any>(oldValueList: T[], newValueList: T[], option: CompareBaseOption | CompareObjectOption) => {

  let { compareObject } = option

  newValueList = jsonClone(newValueList)

  let addList: T[] = []
  let delList: T[] = []
  let updList: T[] = []

  for (let i = 0; i < oldValueList.length; i++) {
    const oldValueItem = oldValueList[i]
    
    let index = -1
    
    if (compareObject === true) {
      let objectOption = option as CompareObjectOption
      let compareKey = objectOption.compareKey as keyof T
      index = newValueList.findIndex(a => a[compareKey] === oldValueItem[compareKey])
    } else {
      index = newValueList.findIndex(a => a === oldValueItem)
    }
    
    if (index === -1) {
      // 在新的列表里找不到该条旧数据，说明被删除了
      delList.push(jsonClone(oldValueItem))
    } else {
      // 在新的列表里找到了该条旧数据
      let findValueItem = newValueList[index]
      if (!isEqual(oldValueItem, findValueItem)) {
        // 如果两条数据不相同，说明更新了
        updList.push(jsonClone(findValueItem))
      }
      // 从新数据中清理出去该数据
      newValueList.splice(index, 1)
    }
  }

  addList = newValueList

  return {
    add: addList,
    upd: updList,
    del: delList
  }

}