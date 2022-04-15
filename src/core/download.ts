import { IConf } from "interface/config"

const downloadRepos = require('../utils/download-repos')

export default async (dest: string, conf: IConf, owner: string, repos: string, branch: string) => {
  return new Promise<void>((resolve, reject) => {
    downloadRepos(`${conf.reposSource}:${conf.reposSource==='direct'?conf.ssh:''}${owner}/${repos}#${branch}`, dest, { clone: true }, (err) => {
      err ? reject(err) : resolve()
    })
  })
}