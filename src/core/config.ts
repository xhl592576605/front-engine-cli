import { ITempConf, IConf } from "interface/config"

const fs = require('fs')
const fsExtra = require('fs-extra')

export default class Config {
  static fileName = '.tempConf'
  static basePath = process.env.HOME
  static path = `${this.basePath}/${this.fileName}`

  static isExistsConfigFile() {
    return fs.existsSync(this.path)
  }

  static readConfigFile() {
    return fsExtra.readJSONSync(this.path)
  }

  static writeConfigFile(conf: ITempConf) {
    return fsExtra.writeJsonSync(this.path, conf, {
      spaces: 2,
      EOL: '\n'
    })
  }

  static createConfigFile() {
    if (!this.isExistsConfigFile()) {
      fsExtra.createFileSync()
    }
  }

  static getConfigs() {
    if (!this.isExistsConfigFile()) {
      return {}
    }
    return this.readConfigFile() || {}
  }

  static addConf(name: string, conf: IConf) {
    if (this.isExistsConfigFile()) {
      this.createConfigFile()
    }
    const config = this.getConfigs()
    const oldconf = config[name]
    if (oldconf) {
      throw new Error(` ${name} conf, already exists`)
    }
    config[name] = conf
    this.writeConfigFile(config)
  }

  static updateConf(name: string, conf: IConf) {
    if (this.isExistsConfigFile()) {
      this.createConfigFile()
    }
    const config = this.getConfigs()
    const oldconf = config[name]
    if (!oldconf) {
      throw new Error(`no ${name} conf, can't update`)
    }
    config[name] = conf
    this.writeConfigFile(config)
  }

  static delete(name: string) {
    if (!this.isExistsConfigFile()) {
      this.createConfigFile()
    }
    const config = this.getConfigs()
    if (!config[name]) {
      throw new Error(`no ${name} conf, can't delete`)
    }
    delete config[name]
    this.writeConfigFile(config)
  }
}