import { faker } from '@faker-js/faker'
import { StaticImageData } from 'next/image'
import { TMiniCard } from '@/components/Cards/events/HotEvents/mini-card'
import MiniCardPlaceHolderImage from '@/assets/images/mock/devCon-Bangkok_mock.jpeg'
import EventOne from '@/assets/images/mock/Event_one.jpg'
import EventTwo from '@/assets/images/mock/Event_two.jpg'
import EventThree from '@/assets/images/mock/Event_three.jpg'
import EventFour from '@/assets/images/mock/Event_four.jpg'

const miniCardMockedImageArray: StaticImageData[] = [
  EventOne,
  EventTwo,
  EventThree,
  EventFour,
  MiniCardPlaceHolderImage,
]

export type TMiniCardMockData = {
  id: number
  imageUrl: StaticImageData
  imageAlt: string
  userName: string
  title: string
  date: string
  place: string
}[]

export type TGetMiniCardMockData = ReturnType<typeof getMiniCardMockData>

export const getMiniCardMockData = ({
  limit,
  pageParam,
}: {
  limit?: number
  pageParam?: number
}) => {
  const MiniCardData: TMiniCardMockData = Array.from({ length: limit ?? 15 }).map((_, i) => ({
    id: i + (pageParam ?? 0),
    date: faker.date.future().toISOString(),
    imageUrl: faker.helpers.arrayElement(miniCardMockedImageArray),
    imageAlt: faker.lorem.word({ length: { min: 5, max: 10 } }),
    place: faker.location.city(),
    title: faker.commerce.productName(),
    userName: faker.person.firstName(),
  }))
  const nextCursor = MiniCardData[MiniCardData.length - 1].id + 1
  return { MiniCardData, nextCursor }
}

export const miniCardData: TMiniCard[] = [
  {
    imageUrl: MiniCardPlaceHolderImage,
    imageAlt: 'miniCard-placeholder',
    userName: 'Ansem',
    title: 'Bitkub Summit 2024 | Gateway of the Future',
    date: 'Monday, 24 October',
    place: 'Bangkok',
  },
  {
    imageUrl: EventOne,
    imageAlt: 'miniCard-placeholder',
    userName: 'Sophia',
    title: 'Blockchain Innovation Conference',
    date: 'Tuesday, 25 October',
    place: 'Bangkok',
  },
  {
    imageUrl: EventTwo,
    imageAlt: 'miniCard-placeholder',
    userName: 'Alex',
    title: 'Crypto Future Expo 2024',
    date: 'Wednesday, 26 October',
    place: 'Bangkok',
  },
  {
    imageUrl: EventThree,
    imageAlt: 'miniCard-placeholder',
    userName: 'Emma',
    title: 'Digital Finance Summit',
    date: 'Thursday, 27 October',
    place: 'Bangkok',
  },
  {
    imageUrl: EventFour,
    imageAlt: 'miniCard-placeholder',
    userName: 'Liam',
    title: 'Tech Transformation Symposium',
    date: 'Friday, 28 October',
    place: 'Bangkok',
  },
  {
    imageUrl: MiniCardPlaceHolderImage,
    imageAlt: 'miniCard-placeholder',
    userName: 'Olivia',
    title: 'Web3 Technology Forum',
    date: 'Saturday, 29 October',
    place: 'Bangkok',
  },
  {
    imageUrl: EventOne,
    imageAlt: 'miniCard-placeholder',
    userName: 'Noah',
    title: 'Fintech Innovation Workshop',
    date: 'Sunday, 30 October',
    place: 'Bangkok',
  },
  {
    imageUrl: EventTwo,
    imageAlt: 'miniCard-placeholder',
    userName: 'Ava',
    title: 'Cryptocurrency Strategy Conference',
    date: 'Monday, 31 October',
    place: 'Bangkok',
  },
  {
    imageUrl: EventThree,
    imageAlt: 'miniCard-placeholder',
    userName: 'Ethan',
    title: 'Blockchain Leadership Summit',
    date: 'Tuesday, 1 November',
    place: 'Bangkok',
  },
  {
    imageUrl: EventFour,
    imageAlt: 'miniCard-placeholder',
    userName: 'Isabella',
    title: 'Digital Transformation Expo',
    date: 'Wednesday, 2 November',
    place: 'Bangkok',
  },
  {
    imageUrl: MiniCardPlaceHolderImage,
    imageAlt: 'miniCard-placeholder',
    userName: 'Mason',
    title: 'Crypto Innovations Conference',
    date: 'Thursday, 3 November',
    place: 'Bangkok',
  },
  {
    imageUrl: EventOne,
    imageAlt: 'miniCard-placeholder',
    userName: 'Mia',
    title: 'Future of Finance Seminar',
    date: 'Friday, 4 November',
    place: 'Bangkok',
  },
  {
    imageUrl: EventTwo,
    imageAlt: 'miniCard-placeholder',
    userName: 'Lucas',
    title: 'Blockchain Ecosystem Forum',
    date: 'Saturday, 5 November',
    place: 'Bangkok',
  },
  {
    imageUrl: EventThree,
    imageAlt: 'miniCard-placeholder',
    userName: 'Harper',
    title: 'Digital Asset Strategy Summit',
    date: 'Sunday, 6 November',
    place: 'Bangkok',
  },
  {
    imageUrl: EventFour,
    imageAlt: 'miniCard-placeholder',
    userName: 'Benjamin',
    title: 'Tech Financial Revolution Conference',
    date: 'Monday, 7 November',
    place: 'Bangkok',
  },
  {
    imageUrl: MiniCardPlaceHolderImage,
    imageAlt: 'miniCard-placeholder',
    userName: 'Charlotte',
    title: 'Web3 Global Meetup',
    date: 'Tuesday, 8 November',
    place: 'Bangkok',
  },
  {
    imageUrl: EventOne,
    imageAlt: 'miniCard-placeholder',
    userName: 'James',
    title: 'Cryptocurrency Innovation Lab',
    date: 'Wednesday, 9 November',
    place: 'Bangkok',
  },
  {
    imageUrl: EventTwo,
    imageAlt: 'miniCard-placeholder',
    userName: 'Amelia',
    title: 'Fintech Future Forum',
    date: 'Thursday, 10 November',
    place: 'Bangkok',
  },
  {
    imageUrl: EventThree,
    imageAlt: 'miniCard-placeholder',
    userName: 'Jackson',
    title: 'Blockchain Technology Symposium',
    date: 'Friday, 11 November',
    place: 'Bangkok',
  },
  {
    imageUrl: EventFour,
    imageAlt: 'miniCard-placeholder',
    userName: 'Evelyn',
    title: 'Digital Economy Conference',
    date: 'Saturday, 12 November',
    place: 'Bangkok',
  },
]
