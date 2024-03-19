import Storage from './storage'
import { TokenName } from '@/config'

const tokenStorage = new Storage(TokenName)

class Token {
  get value() {
    return this.get()
  }

  get() {
    return tokenStorage.get()
  }

  set(val: string) {
    return tokenStorage.set(val)
  }

  remove() {
    return tokenStorage.remove()
  }
}

export default new Token()
