import { IConf } from "../interface/config"
import IRemoteGit from "../interface/remote-git"
import axios from 'axios'
export default class GitLab implements IRemoteGit {
  conf: IConf
  constructor(conf: IConf) {
    this.conf = conf
  }

  async getOrgRepos(name: string) {
    const response = await axios.get(`${this.conf.api}/api/v4/groups/${name}/projects`)
    const { data = [] } = response || {}
    return data.map(x => ({ name: x.name, value: `${x.name}|${x.id}` }))

  }

  async getUserRepos(name: string) {
    const response = await axios.get(`${this.conf.api}/api/v4/users/${name}/projects`)
    const { data = [] } = response || {}
    return data.map(x => ({ name: x.name, value: `${x.name}|${x.id}` }))
  }


  async getOrgBranches(_group: string, repos: string) {
    const [, id] = repos.split('|')
    const response = await axios.get(`${this.conf.api}/api/v4/projects/${id}/repository/branches`)
    const { data = [] } = response || {}
    return data.map(x => x.name)
  }

  async getUserBranches(_group: string, repos: string) {
    const [, id] = repos.split('|')
    const response = await axios.get(`${this.conf.api}/api/v4/projects/${id}/repository/branches`)
    const { data = [] } = response || {}
    return data.map(x => x.name)
  }
  async getOrgTags(_group: string, repos: string) {
    const [, id] = repos.split('|')
    const response = await axios.get(`${this.conf.api}/api/v4/projects/${id}/repository/tags`)
    const { data = [] } = response || {}
    return data.map(x => x.name)
  }

  async getUserTags(_group: string, repos: string) {
    const [, id] = repos.split('|')
    const response = await axios.get(`${this.conf.api}/api/v4/projects/${id}/repository/tags`)
    const { data = [] } = response || {}
    return data.map(x => x.name)
  }
}