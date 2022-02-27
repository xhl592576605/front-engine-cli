// 老看下是不是配置文件存放的目录
import Logger from './utils/logger'
Logger.info(process.env.HOME)
Logger.success('success')
Logger.error('error')
Logger.warn('warn')