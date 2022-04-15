export interface IConf {
  name:string;
  reposSource:string;
  api: string,
  ssh?:string
  token?: string
  tokenKey?: string
  options?:string
}
export interface ITempConf {
  [key: string]: IConf
}