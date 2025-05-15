import { faker } from '@faker-js/faker'
import { sleep } from '@test/utils/utils'
import { fetchLeaderBoardData, fetchLeaderBoardUserData } from '@/functions'
import LeaderBoardPageList from './leader-board-page-list'

export default async function LeaderBoardPageWrapper() {
  const initialData = await fetchLeaderBoardData({ limit: 10, pageParam: 1 })
  const userData = await fetchLeaderBoardUserData({
    userId: faker.number.int({ min: 80, max: 500 }),
  })
  await sleep(2000)
  return <LeaderBoardPageList userProfileData={userData} initialData={initialData} />
}
