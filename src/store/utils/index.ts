import { AddChildrenTypeMenu } from "../modules/user"

export function findFirstRouteMenu(list: AddChildrenTypeMenu[]): AddChildrenTypeMenu {
  const menuItem = list[0]
  if (!menuItem.children) {
    return menuItem
  } else {
    return findFirstRouteMenu(menuItem.children)
  }
}