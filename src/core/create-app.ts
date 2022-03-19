import download from './download'
import Sleep from "../utils/sleep"


const fsExtra = require('fs-extra')
const shell = require('shelljs')

export default async (spinner, option) => {
  // * 删除原来的路径
  const { app, description, installCommand, conf, path, override, group, repos, branch } = option
  if (fsExtra.existsSync(path) && override) {
    await fsExtra.remove(path)
  }

  //* 下载源代码
  spinner.update('download repos...')
  const [repo,] = repos.split('|')
  await download(path, conf.reposSource, group, repo, branch)

  // * 设置包名为项目名
  spinner.update('app setting...')

  const packageJsonPath = `${path}/package.json`
  const newPackage = fsExtra.readJSONSync(packageJsonPath) || {}
  newPackage.name = app
  newPackage.version = '1.0.0'
  newPackage.description = description
  fsExtra.writeJsonSync(packageJsonPath, newPackage, {
    spaces: 2,
    EOL: '\n'
  })

  //* 安装依赖
  spinner.update('install dependencies...')
  await Sleep()
  shell.cd(path)
  shell.exec(`${installCommand} install`)
}