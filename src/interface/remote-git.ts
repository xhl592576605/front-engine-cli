
export interface IRepos {
  name: string;
  fullName: string;
  url: string;
}
export default interface IRemoteGit {
  getOrgRepos: (name: string) => Promise<Array<IRepos>>
  getUserRepos: (name: string) => Promise<Array<IRepos>>
  getOrgBranches: (reposUrl: string) => Promise<Array<string>>
  getUserBranches: (reposUrl: string) => Promise<Array<string>>
  getOrgTags: (reposUrl: string) => Promise<Array<string>>
  getUserTags: (reposUrl: string) => Promise<Array<string>>
}