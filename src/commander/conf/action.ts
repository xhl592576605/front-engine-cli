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
        if (name === '') {
          return 'name must required'
        }
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
      message: 'repos source (official or custom)',
      choices: [
        { name: 'github', value: 'github' },
        { name: 'gitlab', value: 'gitlab' },
        { name: 'gitee', value: 'gitee' },
        { name: 'direct', value: 'direct' }
      ]
    },
    {
      type: 'input',
      name: 'ssh',
      message: 'sshUrl',
      validate: (ssh, { reposSource }) => {
        if (reposSource === 'direct' && ssh === '') {
          return 'reposSource is direct ,ssh must required '
        }
        return true
      }
    },
    {
      type: 'input',
      name: 'api',
      message: 'api',
      validate: (api) => {
        if (api === '') {
          return 'api must required'
        }
        return true
      }
    },
    {
      type: 'input',
      name: 'token',
      message: 'token',
      default: ''
    },
    {
      type: 'input',
      name: 'tokenKey',
      message: 'tokenKey',
      default: ''
    },
    {
      type: 'editor',
      name: 'options',
      default:'{}',
      message: 'options ,set org,usr branches tag api',
      validate: (options, { reposSource }) => {
        if (reposSource === 'direct' && options === '') {
          return 'reposSource is direct ,options must required '
        }
        return true
      }
    },]).then(result => {
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

export const initConfig = async () => {
  const isExit = Config.isExistsConfigFile()
  if (!isExit) {
    Config.writeConfigFile({
      github: {
        name: 'github',
        reposSource: 'github',
        api: 'https://api.github.com/'
      },
      gitlab: {
        name: 'gitlab',
        reposSource: 'gitlab',
        ssh: '',
        api: 'https://gitlab.com/',
      },
      gitee: {
        name: 'gitee',
        reposSource: 'gitee',
        ssh: '',
        api: 'https://gitee.com/',
      }
    })
  }
}