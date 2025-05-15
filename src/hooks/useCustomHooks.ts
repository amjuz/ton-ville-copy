import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { StaticImageData } from 'next/image'
import { faker } from '@faker-js/faker'
import {
  fetchQuestCards,
  fetchLeaderBoardData,
  TFetchLeaderBoardData,
  fetchMiniCardData,
  fetchTrendingCards,
  fetchUserCollectionAndRank,
  TFetchQuestCards,
  TFetchMiniCardData,
  fetchSearchData,
} from '@/functions'
import { TTrendingCardMockData, TUserCollectionMockData } from '@/mock/trendingCard'
import { useAppSelector } from './reduxHooks'
import { TSearchTitleState } from '@/components/utils/mini-tablet-data'
import { TTribeSearch } from '@/mock/searchBar/TribesSearchMockResults'
import { picArr, TChiefSearchMockData } from '@/mock/searchBar/ChiefSearchMockResult'
import { TSkillSearchCardMockData } from '@/mock/searchBar/SkillSearchMockResults'
import { TEventSearchMockData } from '@/mock/searchBar/EventSearchMockResults'
import { TQuestSearchMockData } from '@/mock/searchBar/QuestSearchMockResults'
import { NotificationTemplate } from '@/components/Cards/notification/notification-card'

export const useRevalidateUserCollectionAndRank = ({
  profileId,
  initialUserCollectionData: _initialUserCollectionData,
}: {
  profileId?: string
  initialUserCollectionData?: TUserCollectionMockData
}) => {
  // need to add revalidation logic here for updating gems and rank details of the user
  const { data } = useQuery({
    queryKey: ['user-collection-rank'],
    queryFn: () => fetchUserCollectionAndRank({ profileId }),
  })

  return {
    data,
  }
}

export const useFetchNewTrendingCards = ({
  initialData,
  limit,
}: {
  initialData: {
    data: TTrendingCardMockData
    nextCursor: number
  }
  limit: number
}) => {
  const data = useInfiniteQuery({
    queryKey: ['trending-card-infinite-query'],
    queryFn: ({ pageParam }) => fetchTrendingCards({ pageParam, limit }),
    initialPageParam: 3, // check if this is right,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: {
      pageParams: [0],
      pages: [initialData],
    },
  })

  return data
}

export const useQuestInfinityQuery = ({
  initialData,
  limit,
}: {
  initialData: TFetchQuestCards
  limit: number
}) => {
  const data = useInfiniteQuery({
    queryKey: ['quests-card-infinite-query'],
    queryFn: ({ pageParam }) => fetchQuestCards({ limit, pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 1,
    initialData: {
      pageParams: [0],
      pages: [initialData],
    },
  })

  return data
}

interface IUseLeaderBoardData {
  initialData: TFetchLeaderBoardData
  limit: number
}
export const useLeaderBoardData = ({ initialData, limit }: IUseLeaderBoardData) => {
  const data = useInfiniteQuery({
    queryKey: ['leader-board-infinity-query'],
    queryFn: ({ pageParam }) => fetchLeaderBoardData({ pageParam, limit }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialData: {
      pageParams: [0],
      pages: [initialData],
    },
    initialPageParam: 1,
  })
  return data
}

type TUseFetchMiniCardMockData = {
  initialData: TFetchMiniCardData
  limit: number
}
export const useFetchMiniCardMockData = ({ initialData, limit }: TUseFetchMiniCardMockData) => {
  const data = useInfiniteQuery({
    queryKey: ['mini-card-infinite-query'],
    queryFn: ({ pageParam }) => fetchMiniCardData({ limit, pageParam }),
    initialData: { pageParams: [0], pages: [initialData] },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: 15,
  })

  return data
}

export type TSearchMap = {
  Tribes: TTribeSearch
  Chiefs: TChiefSearchMockData
  Skills: TSkillSearchCardMockData
  Events: TEventSearchMockData
  Quests: TQuestSearchMockData
}

export const useSearch = <T extends TSearchTitleState>(Type: T) => {
  const { searchQuery } = useAppSelector((state) => state.search)

  type TQueryConfig = {
    readonly [K in TSearchTitleState]: {
      readonly queryKey: readonly [string, string | null, K]
      readonly queryFn: () => Promise<TSearchMap[T]>
    }
  }

  const queryConfig: TQueryConfig = {
    Tribes: {
      queryKey: ['tribes-search-query', searchQuery, 'Tribes'],
      queryFn: () => fetchSearchData<T>(searchQuery, Type),
    },
    Skills: {
      queryKey: ['skills-search-query', searchQuery, 'Skills'],
      queryFn: () => fetchSearchData<T>(searchQuery, Type),
    },
    Events: {
      queryKey: ['events-search-query', searchQuery, 'Events'],
      queryFn: () => fetchSearchData<T>(searchQuery, Type),
    },
    Quests: {
      queryKey: ['quests-search-query', searchQuery, 'Quests'],
      queryFn: () => fetchSearchData<T>(searchQuery, Type),
    },
    Chiefs: {
      queryKey: ['chief-search-query', searchQuery, 'Chiefs'],
      queryFn: () => fetchSearchData<T>(searchQuery, Type),
    },
  } as const

  return useQuery<TSearchMap[T]>(queryConfig[Type])
}

type TNotificationData = {
  user: string
  message: string
  profileImage: StaticImageData
  notificationImage: string
  date: Date
}
export const useNotification = ({ limit = 20 }: { limit?: number }) => {
  const [notificationData, setNotificationData] = useState<TNotificationData[]>([])
  const countRef = useRef(0)
  useEffect(() => {
    const timeOut = setInterval(() => {
      if (countRef.current >= limit) {
        clearInterval(timeOut)
        return
      }

      const mockNotificationData: TNotificationData = {
        user: faker.person.firstName(),
        message: faker.helpers.arrayElement(NotificationTemplate),
        profileImage: faker.helpers.arrayElement(picArr),
        notificationImage: faker.image.urlPicsumPhotos(),
        date: faker.date.recent(),
      }
      setNotificationData((prev) => [mockNotificationData, ...prev])
      countRef.current += 1
    }, 700)
    return () => clearInterval(timeOut)
  }, [limit])

  return notificationData
}
