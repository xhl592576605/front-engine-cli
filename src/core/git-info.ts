import { IConf } from "../interface/config"
import IRemoteGit from "../interface/remote-git"
import Github from '../utils/github'


export default class GitInfo {
  gitHelper: IRemoteGit
  conf: IConf

  constructor(conf: IConf) {
    this.conf = conf
    switch (this.conf.reposSource) {
      case 'github':
        this.gitHelper = new Github(this.conf)
        break
      default:
        break
    }
  }

  async getRepositories(type: string, group: string) {
    if (type === 'org') {
      return await this.gitHelper.getOrgRepos(group)
    } else {
      return await this.gitHelper.getUserRepos(group)
    }
  }

  async getBranches(type: string, group: string, repos: string) {
    if (type === 'org') {
      return await this.gitHelper.getOrgBranches(group, repos)
    } else {
      return await this.gitHelper.getUserBranches(group, repos)
    }
  }

  async getTags(type: string, group: string, repos: string) {
    if (type === 'org') {
      return await this.gitHelper.getOrgTags(group, repos)
    } else {
      return await this.gitHelper.getUserTags(group, repos)
    }
  }
}