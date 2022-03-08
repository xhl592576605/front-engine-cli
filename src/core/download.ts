const downloadRepos = require('./utils/download-repos')

export default async (dest: string, source: string, owner: string, repos: string, branche: string) => {
  return new Promise<void>((resolve, reject) => {
    downloadRepos(`${source}:${owner}/${repos}#${branche}`, dest, { clone: true }, (err) => {
      err ? reject(err) : resolve()
    })
  })
}