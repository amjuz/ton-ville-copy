import { InitDataUser } from '@/lib/utils/mock'

export const mockTelegramUsers: { [key: string]: InitDataUser } = {
  standard: {
    id: 66666666,
    firstName: 'Apache',
    lastName: 'Standard',
    username: 'standard',
  },
  minimal: {
    id: 33333333,
    firstName: 'Apache',
    lastName: 'Mini',
    username: 'mini',
  },
  loaded: {
    id: 99999999,
    firstName: 'Apache',
    lastName: 'Loaded',
    username: 'loaded',
    photoUrl: 'https://example/image.jpg',
  },
}
