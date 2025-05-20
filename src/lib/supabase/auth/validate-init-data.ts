import { isValid } from '@telegram-apps/init-data-node'
import { getEnvVariable, isDevelopment } from '@/lib/utils/env'

export function validateInitData(initDataRaw: string): boolean {
  const botToken = getEnvVariable('BOT_TOKEN')
  return isDevelopment() ? true : isValid(initDataRaw, botToken)
}
