import { addConf, updateConf, deleteConf, showConf } from './action'
export default (cli) => {
  cli
    .command('conf', ' cli  config')
    .option('-a, --add', 'add conf')
    .option('-u, --update', 'update conf')
    .option('-d, --delete', 'delete conf')
    .option('-s, --show', 'show conf')
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
      if(option.show) {
        showConf()
      }
    })
}  