import createApp from './action'

export default (cli) => {
  cli
    .command('create <name>', 'create app')
    .action(async (name: any) => {
      await createApp(name)
    })
}  