import { Suspense } from 'react'
import { useQuery } from '@tanstack/react-query'
import ProfileTribeCard from '../Cards/tribes/ProfileTribeCard'
import TribeCardSkeleton from '../skelton/tribe-card-skelton'
import { fetchTribesTable } from '@/lib/profile/user'

export default function ShowUsersTribeCard({ userId }: { userId: string }) {
  const { data, error } = useQuery({
    queryFn: () => fetchTribesTable(userId),
    queryKey: [`tribes-${userId}`],
  })

  if (error || !data) {
    console.log('Tribes fetch failed')
    return
  }
  return (
    <Suspense fallback={<TribeCardSkeleton />}>
      {data.map((item, index) => {
        const {
          author,
          description,
          gems,
          id,
          subscribers,
          tribe_cover_photo,
          tribe_name,
          tribe_photo,
        } = item
        return (
          <div key={`tribe-${id}-${index}`}>
            <ProfileTribeCard
              tribeName={tribe_name ?? ''}
              tribePoints={5.1}
              eventCount={20}
              questCount={20}
              tgGroupCount={20}
              tribeCoverPhoto={tribe_cover_photo ?? ''}
              tribePhoto={tribe_photo ?? ''}
              subscribers={subscribers ?? 0}
              author={author ?? ''}
              description={description ?? ''}
              gems={gems ?? 0}
            />
          </div>
        )
      })}
    </Suspense>
  )
}
