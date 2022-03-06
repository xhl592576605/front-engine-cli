import { addConf, updateConf, deleteConf } from './action'
export default (cli) => {
  cli
    .command('conf', ' cli  config')
    .option('--add', 'add conf')
    .option('--update', 'update conf')
    .option('--delete', 'delete conf')
    .action(async (option: any) => {
      if (option.add) {
        await addConf()
      }
      if (option.update) {
        await updateConf()
      }
      if (option.delete) {
        await deleteConf()
      }
    })
}  