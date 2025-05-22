import { StaticImageData } from 'next/image'
import { faker } from '@faker-js/faker'
import ApeProfile from '@/assets/images/mock/Ape_profile_pic_MOCK.jpeg'
import ApeRed from '@/assets/images/mock/Ape_Red_Mock.png'
import ApeSuit from '@/assets/images/mock/Ape_With_Suit.jpg'
import ApeHeadPhone from '@/assets/images/mock/Ape_With_headphone.jpg'

export type TUserCollectionMockData = {
  gems: number
  rank: number
}
export const userCollectionMockData: TUserCollectionMockData = {
  gems: Math.floor(Math.random() * 1500000),
  rank: Math.floor(Math.random() * 10) + 1,
}
export type TTrendingCardMockData = {
  id: number
  tribeImage: StaticImageData
  tribeName: string
  Subscribers: number
  rank: number
  author: string
  profilePic: StaticImageData
}[]

const arr = [ApeProfile, ApeHeadPhone, ApeRed, ApeSuit]

export function trendingCardMockData({
  limit = 3,
  pageParam,
}: {
  limit?: number
  pageParam?: number
}) {
  const mockData: TTrendingCardMockData = Array.from({ length: limit }).map((_, i) => ({
    id: i + (pageParam ?? 1),
    tribeImage: faker.helpers.arrayElement(arr),
    tribeName: faker.music.genre(),
    Subscribers: faker.number.int(10020),
    rank: faker.number.int({ min: 1, max: 200 }),
    author: faker.book.author(),
    profilePic: faker.helpers.arrayElement(arr),
  }))
  const nextCursor = mockData[mockData.length - 1].id + 1
  return { mockData, nextCursor }
}
