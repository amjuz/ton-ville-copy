'use client'

import { mockTelegramEnv, retrieveLaunchParams } from '@telegram-apps/sdk-react'
import { useClientOnce } from '@/hooks/useClientOnce'
import { isDevelopment } from '@/lib/utils/env'

/**
 * Mocks Telegram environment in development mode.
 */
export function useTelegramMock(): void {
  useClientOnce(() => {
    // Only execute mock logic in development
    if (!isDevelopment()) {
      return
    }

    // It is important, to mock the environment only for development purposes. When building the
    // application, import.meta.env.DEV will become false, and the code inside will be tree-shaken,
    // so you will not see it in your final bundle.

    let shouldMock: boolean

    // Try to extract launch parameters to check if the current environment is Telegram-based.
    try {
      // If we are able to extract launch parameters, it means that we are already in the
      // Telegram environment. So, there is no need to mock it.
      retrieveLaunchParams()

      // We could previously mock the environment. In case we did, we should do it again. The reason
      // is the page could be reloaded, and we should apply mock again, because mocking also
      // enables modifying the window object.
      shouldMock = !!sessionStorage.getItem('____mocked')
    } catch (error) {
      console.warn(error, 'ERROR')
      shouldMock = true
    }

    if (shouldMock) {
      const data = {
        id: 5419650627,
        first_name: 'Andrew',
        last_name: 'Rogue',
        username: 'rogue',
        language_code: 'en',
        is_premium: true,
        allows_write_to_pm: true,
      }

      // const initDataRaw = new URLSearchParams([
      //   ['User', JSON.stringify(data)],
      //   ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
      //   ['auth_date', '1716922846000'],
      //   ['start_param', 'debug'],
      //   ['chat_type', 'sender'],
      //   ['signature', 'abc1234'],
      //   ['chat_instance', '8428209589180549439'],
      // ]).toString()

      mockTelegramEnv({
        themeParams: {
          accentTextColor: '#6ab2f2',
          bgColor: '#17212b',
          buttonColor: '#5288c1',
          buttonTextColor: '#ffffff',
          destructiveTextColor: '#ec3942',
          headerBgColor: '#17212b',
          hintColor: '#708499',
          linkColor: '#6ab3f3',
          secondaryBgColor: '#232e3c',
          sectionBgColor: '#17212b',
          sectionHeaderTextColor: '#6ab3f3',
          subtitleTextColor: '#708499',
          textColor: '#f5f5f5',
        },
        initData: {
          user: {
            id: 99281932,
            firstName: 'Andrew',
            lastName: 'Rogue',
            username: 'rogue',
            languageCode: 'en',
            isPremium: true,
            allowsWriteToPm: true,
          },
          hash: '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31',
          authDate: new Date(1716922846000),
          signature: 'abc',
          startParam: 'debug',
          chatType: 'sender',
          chatInstance: '8428209589180549439',
        },
        initDataRaw: new URLSearchParams([
          [
            'user',
            JSON.stringify({
              id: 9928193255,
              first_name: 'Andrew',
              last_name: 'Rogue',
              username: 'rogue',
              language_code: 'en',
              is_premium: true,
              allows_write_to_pm: true,
            }),
          ],
          ['hash', '89d6079ad6762351f38c6dbbc41bb53048019256a9443988af7a48bcad16ba31'],
          ['auth_date', '1716922846'],
          ['start_param', 'debug'],
          ['signature', 'abc'],
          ['chat_type', 'sender'],
          ['chat_instance', '8428209589180549439'],
        ]).toString(),
        version: '7.2',
        platform: '',
      })
      sessionStorage.setItem('____mocked', '2')

      console.info(
        'As long as the current environment was not considered as the Telegram-based one, it was mocked. Take a note, that you should not do it in production and current behavior is only specific to the development process. Environment mocking is also applied only in development mode. So, after building the application, you will not see this behavior and related warning, leading to crashing the application outside Telegram.'
      )
    }
  })
}
