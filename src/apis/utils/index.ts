/**
 * apis 工具
 */

export const createApiUrl = (...rest: string[]) => {
  return rest.filter(a => a).join('/')
}

export const curryFn = <T>(fn: (...rest: any[]) => T , ...rest: string[]) => {
  return function(...rest2: string[]): T {
    return fn.apply(null, rest.concat(rest2))
  }
}
