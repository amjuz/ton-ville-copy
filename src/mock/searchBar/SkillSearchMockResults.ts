import { StaticImageData } from 'next/image'
import { faker } from '@faker-js/faker'
import { picArr } from './ChiefSearchMockResult'

export type TSkillSearchCardMockData = {
  id: number
  nickName: string
  skills: string[]
  profilePic?: StaticImageData
}[]

export const SkillSearchMockData: TSkillSearchCardMockData = [
  {
    id: 1,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Johnny',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 2,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'SJ',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 3,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Brownie',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 4,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Em',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 5,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Alex',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 6,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Tommy',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 7,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Liv',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 8,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Danny',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 9,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Sophie',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 10,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Ethan',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 11,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Ava',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 12,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Noah',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 13,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Bella',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 14,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Luke',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 15,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Amy',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 16,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Ry',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 17,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Han',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 18,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Jake',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 19,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Zoe',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 20,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Nate',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 21,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Ella',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 22,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Gabe',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 23,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Maddie',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 24,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Cam',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 25,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Riley',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 26,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'JMart',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 27,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Sel',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 28,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Con',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 29,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Ari',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 30,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Ty',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 31,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Em',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 32,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Hunt',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 33,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Becky',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 34,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Drew',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 35,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Nikki',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 36,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Kev',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 37,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Jen',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 38,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Bry',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 39,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Care',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 40,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Dave',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 41,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Jess',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 42,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Ry',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 43,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Sarah',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 44,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Mark',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 45,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Lo',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 46,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Chris',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 47,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Em',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 48,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Mike',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 49,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Rach',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 50,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Jake',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 51,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Rosa',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 52,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Tom',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 53,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Amy',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 54,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Alex',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 55,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Vic',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 56,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Jay',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 57,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Zo',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 58,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Kev',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 59,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Sophie',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 60,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Luke',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 61,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Liv',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 62,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Dan',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 63,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Em',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 64,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Ry',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 65,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Han',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 66,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Jake',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 67,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Bella',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 68,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Noah',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 69,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Am',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 70,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Eth',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 71,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Ava',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 72,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Li',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 73,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Zo',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 74,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Maddie',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 75,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Gabe',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 76,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Soph',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 77,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Cam',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 78,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Nate',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 79,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Ella',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 80,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Con',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 81,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Ri',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 82,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'JC',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 83,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Madi',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 84,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Ty',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 85,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Han',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 86,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Drew',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },

  {
    id: 87,
    profilePic: faker.helpers.arrayElement(picArr),
    nickName: 'Nikki',
    skills: Array.from({ length: 3 }).map(() => faker.book.genre()),
  },
]
