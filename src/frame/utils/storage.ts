/**
 * localstorage存储
 */
class Storage {
  scope!: string;

  constructor(scope: string) {
    this.scope = scope;
  }
  get() {
    return localStorage.getItem(this.scope)
  }

  set(val: any) {
    return localStorage.setItem(this.scope, val)
  }

  remove() {
    return localStorage.removeItem(this.scope)
  }
}

export default Storage
