import { createRandomCode } from "../utils/common"
import Spinner from "../utils/spinner"
import Logger from "../utils/logger"
import Sleep from "../utils/sleep"

export default async (fn: any, message: string, ...args: any[]) => {
  const key = createRandomCode()
  const spinner = new Spinner(key, message)
  await Sleep()
  try {
    await fn(spinner, ...args)
    spinner.succeed(`${message} succeed`)
  } catch (e) {
    Logger.error(e)
    spinner.fail(`${message} failed`)
    return e
  }
}