'use client'

import UserCollectionAndRanks from './user-collection-and-ranks'

interface IUserCollectionAndRanksRevalidator {
  initialUserCollectionData: {
    gems: number
    rank: number
  }
}
export default function UserCollectionAndRanksRevalidator({
  initialUserCollectionData,
}: IUserCollectionAndRanksRevalidator) {
  // const {refetch,userCollectionData,isLoading } = useRevalidateUserCollectionAndRank({initialUserCollectionData})
  return (
    <div>
      <UserCollectionAndRanks userCollectionData={initialUserCollectionData} />
    </div>
  )
}
