const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isDef(val: any): boolean {
  return typeof val !== 'undefined';
}

export function isUnDef(val: any): boolean {
  return !isDef(val);
}

export function isObject(val: any): boolean {
  return val !== null && is(val, 'Object');
}

export function isDate(val: any): boolean {
  return is(val, 'Date');
}

export function isNumber(val: any): boolean {
  return is(val, 'Number');
}

export function isString(val: any): boolean {
  return is(val, 'String');
}

export function isFunction(val: unknown): boolean {
  return typeof val === 'function';
}

export function isBoolean(val: unknown): boolean {
  return is(val, 'boolean');
}

export function isRegExp(val: unknown): boolean {
  return is(val, 'RegExp');
}

export function isArray(val: any): boolean {
  return val && is(val, 'Array');
}

export const isExternal = (path: string): boolean => {
  return path.startsWith('http')
}

export const isEqual = (object1: any, object2: any) => {

  if (!isObject(object1) || !isObject(object2)) {
    // 双方不都是对象,直接进行比较
    return object1 === object2
  }

  // 都是对象的情况下进行比较
  // 1、属性数量
  // 2、属性值

  if (Object.keys(object1).length !== Object.keys(object2).length) {
    return false
  }

  let result = true

  for (const key in object1) {
    if (!isEqual(object1[key], object2[key])) {
      result = false
      break
    }
  }

  return result
}