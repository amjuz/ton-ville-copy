import { StaticImageData } from 'next/image'
import { faker } from '@faker-js/faker'
import questPlaceHolders from '@/assets/images/mock/quest-card-mock.png'
import questOne from '@/assets/images/mock/Quest_one.webp'
import questTwo from '@/assets/images/mock/Quest_two.webp'
import questThree from '@/assets/images/mock/Quest_three.webp'

export type TQuest = {
  id: number
  title: string
  description: string
  imageSrc: StaticImageData
  imageAlt: string
}[]

interface IQuestCardMockedData {
  limit?: number
  pageParam?: number
}

const imageArray: StaticImageData[] = [questPlaceHolders, questOne, questTwo, questThree]

export const questCardMockedData = ({ limit, pageParam }: IQuestCardMockedData) => {
  const mockData: TQuest = Array.from({ length: limit ?? 10 }).map((_, i) => ({
    id: i + (pageParam ?? 1),
    title: faker.book.title(),
    description: faker.lorem.lines(),
    imageSrc: faker.helpers.arrayElement(imageArray),
    imageAlt: faker.book.genre(),
  }))
  const nextCursor = mockData[mockData.length - 1].id + 1

  return {
    mockData,
    nextCursor,
  }
}
