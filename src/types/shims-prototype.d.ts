/**
 * 原型扩展
 */

interface String {
  _toDate(): string;
  _addUnit(unit: string): string;
}

interface Number {
  _addUnit(unit: string): string;
}