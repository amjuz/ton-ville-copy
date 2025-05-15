import { BASE_DOMAIN } from '@/lib/utils/constants'

export function generateEmailByTelegramId(telegram_id: number) {
  return `telegram.${telegram_id}@${BASE_DOMAIN}`
}
