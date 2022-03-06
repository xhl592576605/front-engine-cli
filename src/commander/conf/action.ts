import { prompt } from 'inquirer'
import Logger from '../../utils/logger'
import Config from '../../core/config'

const getAddAndUpdatePrompt = (type: 'add' | 'update'): Promise<any> => {
  return new Promise((resolve, reject) => {
    prompt([{
      type: 'input',
      name: 'name',
      message: 'name',
      validate: (name) => {
        const configs = Config.getConfigs()
        const conf = configs[name]
        if (type === 'add' && conf) {
          return `${name} conf, already exists`
        } else if (type === 'update' && !conf) {
          return `no ${name} conf, can't update`
        } else {
          return true
        }
      }
    },
    {
      type: 'rawlist',
      name: 'reposSource',
      message: 'reposSource',
      choices: [
        { name: 'github', value: 'github' },
        { name: 'gitlab', value: 'gitlab' },
        { name: 'gitee', value: 'gitee' }
      ]
    },
    {
      type: 'input',
      name: 'apiUrl',
      message: 'apiUrl',
    }, {
      type: 'input',
      name: 'token',
      message: 'token',
      default: 'token'
    }]).then(result => {
      resolve(result)
    }).catch((e) => {
      console.error('error', e)
      reject(e)
    })
  })
}

export const addConf = async () => {
  Logger.info('add conf')
  const result = await getAddAndUpdatePrompt('add')
    .catch((e) => {
      Logger.error(e.message)
      return
    })
  try {
    Config.addConf(result.name, result)
  } catch (e) {
    return Logger.error(e.message)
  }
  Logger.success('add conf success')
}

export const updateConf = async () => {
  Logger.info('update conf')
  const result = await getAddAndUpdatePrompt('update')
    .catch((e) => {
      Logger.error(e.message)
      return
    })
  try {
    Config.updateConf(result.name, result)
  } catch (e) {
    return Logger.error(e.message)
  }
  Logger.success('update conf success')
}

export const deleteConf = async () => {
  Logger.info('delete conf')
  const result = await prompt([{
    type: 'input',
    name: 'name',
    message: 'confName',
  }]).catch((e) => {
    Logger.error(e.message)
    return
  })
  const { name } = result
  try {
    Config.delete(name)
  } catch (e) {
    return Logger.error(e.message)
  }
  Logger.success('delete conf success')

}

export const showConf = async () => {
  const config = Config.getConfigs()
  Logger.info(`\n ${JSON.stringify(config, null, 2)}`)
}