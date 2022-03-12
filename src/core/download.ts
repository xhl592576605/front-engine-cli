const downloadRepos = require('../utils/download-repos')

export default async (dest: string, source: string, owner: string, repos: string, branch: string) => {
  return new Promise<void>((resolve, reject) => {
    downloadRepos(`${source}:${owner}/${repos}#${branch}`, dest, { clone: true }, (err) => {
      err ? reject(err) : resolve()
    })
  })
}