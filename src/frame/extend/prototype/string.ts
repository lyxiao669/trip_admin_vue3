/**
 * string
 */

import { _addUnit } from "./common"

export default function install() {

  /**
   * 日期字符串转成日期显示
   */
  String.prototype._toDate = function() {
    return this.replace('T', ' ').split(' ')[0] ?? ''
  }

  // 添加单位
  String.prototype._addUnit = _addUnit

}