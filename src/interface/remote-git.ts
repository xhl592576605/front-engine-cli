
export interface IRepos {
  name: string;
  fullName: string;
  url: string;
}
export default interface IRemoteGit {
  getOrgRepos: (name: string) => Promise<Array<IRepos>>
  getUserRepos: (name: string) => Promise<Array<IRepos>>
  getOrgBranches: (group: string, repos: string) => Promise<Array<string>>
  getUserBranches: (group: string, repos: string) => Promise<Array<string>>
  getOrgTags: (group: string, repos: string) => Promise<Array<string>>
  getUserTags: (group: string, repos: string) => Promise<Array<string>>
}