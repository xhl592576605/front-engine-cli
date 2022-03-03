// 老看下是不是配置文件存放的目录
import Logger from './utils/Logger'
import Spinner from './utils/Spinner'
Logger.info(process.env.HOME)
Logger.success('success')
Logger.error('error')
Logger.warn('warn')
Logger.logLogo('temp-cli')
// Loading.start('开始')
const downloadSpinner = new Spinner('download', 'download...')

setTimeout(() => {
  downloadSpinner.update(process.env.HOME)
  setTimeout(() => {
    downloadSpinner.update('asdaasd')
    downloadSpinner.update('fail')

    // downloadSpinner.remove()
    // downloadSpinner.update('fail')


  }, 100)
}, 300)