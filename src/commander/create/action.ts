import { prompt } from 'inquirer'
import Config from '../../core/config'
import Loading from '../../core/loading'
import GitInfo from '../../core/git-info'
import createApp from '../../core/create-app'
import { IConf } from '../../interface/config'
import Logger from '../../utils/logger'


const fs = require('fs')

export default async (app) => {
  const pwd = process.env.PWD
  const path = `${pwd}/${app}`
  const isExists = fs.existsSync(path)

  const result = {
    app,
    description: '',
    path,
    override: true,
    installCommand: 'npm',
    conf: {},
    type: 'user',
    branchType: 'branch',
    group: '',
    repos: '',
    branch: ''
  }

  // 文件夹存在，询问，不覆盖，直接返回
  if (isExists) {
    result.override = (await prompt({
      type: 'confirm',
      name: 'override',
      message: 'directory already exists, do you want to overwrite it'
    }) as any).override

    if (!result.override) {
      return
    }
  }
  // * 包描述
  result.description = (await prompt({
    type: 'input',
    name: 'description',
    message: 'app description',
  }) as any).description

  // * 获取配置
  const config = Config.getConfigs()
  const source = Object.keys(config).map((key) => {
    return {
      name: key,
      value: key
    }
  })

  const key = (await prompt({
    type: 'rawlist',
    name: 'conf',
    message: 'choice conf',
    choices: source as any,
  }) as any).conf
  result.conf = config[key]

  // * 获取依赖安装命令
  result.installCommand = (await prompt({
    type: 'rawlist',
    name: 'installCommand',
    message: 'install command',
    default: 'yarn',
    choices: [
      {
        name: 'npm', value: 'npm'
      },
      {
        name: 'yarn', value: 'yarn'
      },
      { name: 'pnpm', value: 'pnpm' }
    ]
  }) as any).installCommand

  // * 获取类型
  result.type = (await prompt({
    type: 'rawlist',
    name: 'type',
    message: 'organization or user',
    choices: [
      {
        name: 'org', value: 'org'
      },
      {
        name: 'user', value: 'user'
      }
    ]
  }) as any).type

  const gitInfo = new GitInfo(result.conf as IConf)
  //* 获取组织名或者用户名
  result.group = (await prompt({
    type: 'input',
    name: 'group',
    message: result.type === 'org' ? 'orgName' : 'userName',
  }) as any).group

  // * 拉取仓库信息
  let reposChoices = []
  await Loading(async (_spinner, result) => {
    reposChoices = (await gitInfo.getRepositories(result.type, result.group))
      .map(repo => ({ name: repo, value: repo }))
  }, 'search repos...', result)

  if (reposChoices.length == 0) {
    Logger.error(" no found repos")
    return
  }

  // * 仓库名
  result.repos = (await prompt({
    type: 'rawlist',
    name: 'repos',
    message: 'repos',
    choices: reposChoices
  }) as any).repos

  //* 获取分支 还是 tag
  result.branchType = (await prompt({
    type: 'rawlist',
    name: 'branchType',
    message: 'branch or tag',
    choices: [
      {
        name: 'branch', value: 'branch'
      },
      {
        name: 'tag', value: 'tag'
      }
    ]
  }) as any).branchType

  let branches = []
  if (result.branchType === 'branch') {
    // * 拉取分支
    await Loading(async (_spinner, result) => {
      branches = (await gitInfo.getBranches(result.type, result.group, result.repos))
        .map(branch => ({ name: branch, value: branch }))
    }, 'search branches...', result)

    if (branches.length == 0) {
      Logger.error(" no found branches")
      return
    }
  } else {
    // * 拉取tag
    await Loading(async (_spinner, result) => {
      branches = (await gitInfo.getTags(result.type, result.group, result.repos))
        .map(tag => ({ name: tag, value: tag }))
    }, 'search tags...', result)

    if (branches.length == 0) {
      Logger.error(" no found tags")
      return
    }
  }

  // * 分支 tags 信息
  result.branch = (await prompt({
    type: 'rawlist',
    name: 'branch',
    message: result.branchType === 'branch' ? 'branches' : 'tags',
    choices: branches
  }) as any).branch


  await Loading(async (spinner, result) => {
    await createApp(spinner, result)
  }, 'create app...', result)

  Logger.info(`\r\nSuccessfully created project ${app}`)
  Logger.success(`cd ${app}`)
  Logger.success(`execute relevant commands`)

}
