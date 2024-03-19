/**
 * 获取scss的样式对象
 */

type scssVariables = {
  [k: string]: string;
}

export const getScssVariables = (exportString: string): scssVariables => {
  return exportString
    .replaceAll(/\s/g, '')
    .match(/:export{(.+?)}/)
    ?.[1]
    ?.split(';')
    .reduce((memo, str) => {
      const [key, color] = str.split(':')
      key && color && (memo[key] = color)
      return memo
    }, <scssVariables>{})
    ?? {}
}