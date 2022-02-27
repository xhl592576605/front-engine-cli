import { blue, green, red, yellow,magenta } from 'chalk'
const { name } = require('../../package.json')
const appName = `[${blue(name)}]`

const currentTime=()=>{
  const date=new Date()
  return magenta(`${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`)
}

export default class Logger {
  static clog = console.log

  static info(message: string): void {
    this.clog(`${appName} ${currentTime()} ${message}`)
  }

  static success(message: string): void {
    this.clog(`${appName} ${currentTime()} ${green(message)}`)
  }

  static error(message: string): void {
    this.clog(`${appName} ${currentTime()} ${red(message)}`)
  }

  static warn(message: string): void {
    this.clog(`${appName} ${currentTime()} ${yellow(message)}`)
  }
  
  static log(message: string): void {
    this.clog(message)
  }
}
