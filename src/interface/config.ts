export interface IConf {
  url: string,
  token?: string
}
export interface ITempConf {
  [key: string]: IConf
}