import { IConf } from "../interface/config"
import { Octokit } from "octokit"
import IRemoteGit from '../interface/remote-git'

export default class Github implements IRemoteGit {
  octokit: Octokit
  conf: IConf
  constructor(conf: IConf) {
    this.conf = conf
    this.octokit = new Octokit({ url: this.conf.api })
  }

  async getOrgRepos(name) {
    let result = []
    const res = await this.octokit.request('GET /orgs/{org}/repos', {
      org: name
    }).catch(() => {
      return {
        data: []
      }
    })
    result = res.data.map(x => ({ name: x.name, value: `${x.name}|${x.id}` }))
    return result
  }

  async getUserRepos(name: string) {
    let result = []
    const res = await this.octokit.request('GET /users/{username}/repos', {
      username: name
    }).catch(() => {
      return {
        data: []
      }
    })
    result = res.data.map(x => ({ name: x.name, value: `${x.name}|${x.id}` }))
    return result
  }

  async getOrgBranches(group, repos) {
    let result = []
    const [repo,] = repos.split('|')
    const res = await this.octokit.request(`GET /repos/${group}/${repo}/branches`).catch(() => {
      return {
        data: []
      }
    })
    result = res.data.map(x => x.name)
    return result
  }

  async getUserBranches(group, repos) {
    let result = []
    const [repo,] = repos.split('|')
    const res = await this.octokit.request(`GET /repos/${group}/${repo}/branches`).catch(() => {
      return {
        data: []
      }
    })
    result = res.data.map(x => x.name)
    return result
  }
  async getOrgTags(group, repos) {
    let result = []
    const [repo,] = repos.split('|')
    const res = await this.octokit.request(`GET /repos/${group}/${repo}/tags`).catch(() => {
      return {
        data: []
      }
    })
    result = res.data.map(x => x.name)
    return result
  }

  async getUserTags(group, repos) {
    let result = []
    const [repo,] = repos.split('|')
    const res = await this.octokit.request(`GET /repos/${group}/${repo}/tags`).catch(() => {
      return {
        data: []
      }
    })
    result = res.data.map(x => x.name)
    return result
  }
}