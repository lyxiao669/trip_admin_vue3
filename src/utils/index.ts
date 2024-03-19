/**
 * 业务工具
 */

export const groupTreeData = (data: any[], key: string, convert: { label: string, value: string }, childrenProcessFn?: Function): TaskTreeItem[] => {
  let result: {[key: string]: { label: string; value: any; children: any[] }} = {}

  for (let index = 0; index < data.length; index++) {
    const item = data[index];

    let keyValue = item[key]
    let itemValueList = result[keyValue]
    if (!itemValueList) {
      itemValueList = result[keyValue] = {
        label: item[convert.label],
        value: item[convert.value],
        children: []
      }
    }
    itemValueList.children.push(item)
  }
  return Object.values(result).map(item => {
    if (childrenProcessFn) {
      item = childrenProcessFn(item)
    }
    return item
  })
}
