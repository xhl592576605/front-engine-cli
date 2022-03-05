const Spinnies = require('spinnies')
const spinner = { interval: 80, frames: ['🍇', '🍈', '🍉', '🍋'] }

interface ISpinner {
  key: string
  spinnies: any
  remove: () => void;
  update: (text: string) => void;
  succeed: (text: string) => void
  fail: (text: string) => void;
}

export default class Spinner implements ISpinner {
  key: string;
  spinnies: any

  constructor(key: string, text: string) {
    this.spinnies = new Spinnies({ spinner })
    this.key = key
    this.spinnies.add(this.key, { text })
  }

  remove() {
    this.spinnies.remove(this.key)
  }
  
  update(text: string) {
    this.spinnies.update(this.key, { text })
  }

  succeed(text: string) {
    this.spinnies.succeed(this.key, { text })
  }

  fail(text: string) {
    this.spinnies.fail(this.key, { text })
  }
}