import { fetchUserCollectionAndRank } from '@/functions'
import UserCollectionAndRanksRevalidator from './user-collection-and-ranks-revalidator'

export default async function UserCollectionAndRanksWrapper() {
  // fetch initial data on the server
  const initialData = await fetchUserCollectionAndRank({})
  return (
    //   do i need to add key here for this component @muad
    <UserCollectionAndRanksRevalidator initialUserCollectionData={initialData} />
  )
}
