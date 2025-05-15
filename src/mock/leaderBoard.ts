import { faker } from '@faker-js/faker'

type TLeaderBoard = {
  id: number
  userName: string
  rank: number
  gems: number
}[]

interface ILeaderBoardMockData {
  limit?: number
  pageParam?: number
}

export function leaderBoardMockData({ limit, pageParam }: ILeaderBoardMockData) {
  const mockData: TLeaderBoard = Array.from({ length: limit ?? 1 }).map((_, i) => ({
    id: i + (pageParam ?? 1),
    gems: faker.number.int({ min: 5000, max: 100000 }),
    rank: i + (pageParam ?? 1),
    userName: faker.person.firstName(),
  }))
  const nextCursor = mockData[mockData.length - 1].id + 1
  return { mockData, nextCursor }
}

type TUserProfile = {
  id: number
  userName: string
  rank: number
  gems: number
}
export function leaderBoardUserProfileData({ userId }: { userId: number }) {
  const userProfileMockData: TUserProfile = {
    id: userId,
    gems: faker.number.int({ min: 2000, max: 50000 }),
    rank: faker.number.int({ min: 40, max: 100 }),
    userName: faker.person.firstName(),
  }
  return userProfileMockData
}
