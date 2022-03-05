import version from './version'
import conf from './conf'
const cli = require('cac')()

export default () => {
  version(cli)
  conf(cli)
  cli.help()
  cli.parse()
}