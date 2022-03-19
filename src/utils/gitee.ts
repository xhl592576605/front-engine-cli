import { IConf } from "../interface/config"
import IRemoteGit from "../interface/remote-git"
import axios from 'axios'
export default class Gitee implements IRemoteGit {
  conf: IConf
  constructor(conf: IConf) {
    this.conf = conf
  }

  async getOrgRepos(name: string) {
    const response = await axios.get(`${this.conf.api}/api/v5/orgs/${name}/repos`)
    const { data = [] } = response || {}
    return data.map(x => ({ name: x.name, value: `${x.name}|${x.id}` }))

  }

  async getUserRepos(name: string) {
    const response = await axios.get(`${this.conf.api}/api/v5/users/${name}/repos`)
    const { data = [] } = response || {}
    return data.map(x => ({ name: x.name, value: `${x.name}|${x.id}` }))
  }


  async getOrgBranches(group: string, repos: string) {
    const [repo,] = repos.split('|')
    const response = await axios.get(`${this.conf.api}/api/v5/repos/${group}/${repo}/branches`)
    const { data = [] } = response || {}
    return data.map(x => x.name)
  }

  async getUserBranches(group: string, repos: string) {
    const [repo,] = repos.split('|')
    const response = await axios.get(`${this.conf.api}/api/v5/repos/${group}/${repo}/branches`)
    const { data = [] } = response || {}
    return data.map(x => x.name)
  }
  async getOrgTags(group: string, repos: string) {
    const [repo,] = repos.split('|')
    const response = await axios.get(`${this.conf.api}/api/v5/repos/${group}/${repo}/tags`)
    const { data = [] } = response || {}
    return data.map(x => x.name)
  }

  async getUserTags(group: string, repos: string) {
    const [repo,] = repos.split('|')
    const response = await axios.get(`${this.conf.api}/api/v5/repos/${group}/${repo}/tags`)
    const { data = [] } = response || {}
    return data.map(x => x.name)
  }
}