import { Octokit } from "octokit"
import IRemoteGit from '../interface/remote-git'

export default class Github implements IRemoteGit {
  octokit: Octokit

  constructor(option = { url: 'https://api.github.com/' }) {
    this.octokit = new Octokit(option)
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
    result = res.data.map(x => ({
      name: x.name,
      fullName: x.full_name,
      url: x.url
    }))
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
    result = res.data.map(x => ({
      name: x.name,
      fullName: x.full_name,
      url: x.url
    }))
    return result
  }

  async getOrgBranches(reposUrl) {
    let result = []
    const res = await this.octokit.request(`GET ${reposUrl}/branches`).catch(() => {
      return {
        data: []
      }
    })
    result = res.data.map(x => x.name)
    return result
  }

  async getUserBranches(reposUrl) {
    let result = []
    const res = await this.octokit.request(`GET ${reposUrl}/branches`).catch(() => {
      return {
        data: []
      }
    })
    result = res.data.map(x => x.name)
    return result
  }
  async getOrgTags(reposUrl) {
    let result = []
    const res = await this.octokit.request(`GET ${reposUrl}/tags`).catch(() => {
      return {
        data: []
      }
    })
    result = res.data.map(x => x.name)
    return result
  }

  async getUserTags(reposUrl) {
    let result = []
    const res = await this.octokit.request(`GET ${reposUrl}/tags`).catch(() => {
      return {
        data: []
      }
    })
    result = res.data.map(x => x.name)
    return result
  }
}