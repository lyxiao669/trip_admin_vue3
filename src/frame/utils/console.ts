import { isProduction } from '@/config'

export const consoleDev = (...rest: any[]) => {
  !isProduction && console.log(...rest)
}

export const consoleError = (...rest: any[]) => {
  console.log(...rest)
}
