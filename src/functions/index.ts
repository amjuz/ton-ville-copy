import { sleep } from '@test/utils/utils'
import { ChiefSearchMockData } from '@/mock/searchBar/ChiefSearchMockResult'
import { getMiniCardMockData, TGetMiniCardMockData } from '@/mock/hotEvents'
import { leaderBoardMockData, leaderBoardUserProfileData } from '@/mock/leaderBoard'
import { questCardMockedData } from '@/mock/quests'
import { trendingCardMockData, userCollectionMockData } from '@/mock/trendingCard'
import { tribeSearchMockData } from '@/mock/searchBar/TribesSearchMockResults'
import { EventSearchMockData } from '@/mock/searchBar/EventSearchMockResults'
import { QuestSearchMockData } from '@/mock/searchBar/QuestSearchMockResults'
import { SkillSearchMockData } from '@/mock/searchBar/SkillSearchMockResults'
import { TSearchTitleState } from '@/components/utils/mini-tablet-data'
import { TSearchMap } from '@/hooks/useCustomHooks'

export async function fetchUserCollectionAndRank({}: { profileId?: string }) {
  // const _id = profileId
  await sleep(2000)
  return userCollectionMockData
}

export type TFetchTrendingCards = Awaited<ReturnType<typeof fetchTrendingCards>>

interface IFetchTrendingCards {
  limit?: number
  pageParam?: number
}
export const fetchTrendingCards = async ({ pageParam, limit }: IFetchTrendingCards) => {
  const { mockData: data, nextCursor } = trendingCardMockData({ pageParam, limit })
  await sleep(300)
  return { data, nextCursor }
}

export type TFetchQuestCards = Awaited<ReturnType<typeof fetchQuestCards>>

interface IFetchQuestCards {
  limit?: number
  pageParam?: number
}

export function fetchQuestCards({ limit, pageParam }: IFetchQuestCards) {
  const data = questCardMockedData({ limit, pageParam })
  return data
}

export type TFetchMiniCardData = Awaited<ReturnType<typeof fetchMiniCardData>>

interface IFetchMiniCardData {
  limit: number
  pageParam?: number
}

export const fetchMiniCardData = async ({ limit, pageParam }: IFetchMiniCardData) => {
  // @TODO @Aslam Replace this mocked data with db call

  const data: TGetMiniCardMockData = getMiniCardMockData({ limit, pageParam })
  await sleep(300)
  return data
}

interface IFetchLeaderBoardData {
  limit?: number
  pageParam?: number
}
export type TFetchLeaderBoardData = Awaited<ReturnType<typeof fetchLeaderBoardData>>

export const fetchLeaderBoardData = async ({ limit, pageParam }: IFetchLeaderBoardData) => {
  const { mockData, nextCursor } = await leaderBoardMockData({ limit, pageParam })
  await sleep(300)
  return { mockData, nextCursor }
}

export type TFetchLeaderBoardUserData = Awaited<ReturnType<typeof fetchLeaderBoardUserData>>

export const fetchLeaderBoardUserData = async ({ userId }: { userId: number }) => {
  const data = leaderBoardUserProfileData({ userId })
  await sleep(300)
  return data
}

export const fetchSearchData = async <T extends TSearchTitleState>(
  value: string | null,
  type: T
): Promise<TSearchMap[T]> => {
  const mockDataObjectMatcher = () => {
    switch (type) {
      case 'Chiefs':
        if (!value) return ChiefSearchMockData.splice(1, 10)
        return ChiefSearchMockData.filter((fv) =>
          fv.userName?.includes(String(value).toLowerCase().trim())
        )
      case 'Events':
        if (!value) return EventSearchMockData.splice(1, 10)
        return EventSearchMockData.filter((fv) =>
          fv.eventTitle?.includes(String(value).toLowerCase().trim())
        )
      case 'Quests':
        if (!value) return QuestSearchMockData.splice(1, 10)
        return QuestSearchMockData.filter((fv) =>
          fv.questTitle?.includes(String(value).toLowerCase().trim())
        )
      case 'Skills':
        if (!value) return SkillSearchMockData.splice(1, 10)
        return SkillSearchMockData.filter((fv) =>
          fv.nickName?.includes(String(value).toLowerCase().trim())
        )
      case 'Tribes':
        if (!value) return tribeSearchMockData.splice(1, 10)
        return tribeSearchMockData.filter((fv) =>
          fv.tribeTitle?.includes(String(value).toLowerCase().trim())
        )
    }
  }
  const filteredData = mockDataObjectMatcher()
  if (!filteredData) return [] as TSearchMap[T]

  await sleep(300)
  return filteredData as TSearchMap[T]
}
