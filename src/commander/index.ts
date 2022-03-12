import version from './version'
import conf from './conf'
import create from './create'
const cli = require('cac')()

export default () => {
  version(cli)
  conf(cli)
  create(cli)
  cli.help()
  cli.parse()
}