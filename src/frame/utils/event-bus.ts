export default class EventBus {

  events!: Map<string, Function[]>;

  constructor() {
    this.events = new Map()
  }

  on(eventName: string, func: Function) {
    let funcs = this.events.get(eventName)
    if (!funcs) {
      funcs = []
      this.events.set(eventName, funcs)
    }
    funcs.push(func)
  }

  fire(eventName: string, ...rest: any[]) {
    const funcs = this.events.get(eventName)
    if (funcs) {
      funcs.forEach(func => {
        func(...rest)
      })
    }
  }
}
