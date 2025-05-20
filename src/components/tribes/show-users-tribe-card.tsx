'use client'
import { useQuery } from '@tanstack/react-query'
import ProfileTribeCard from '../Cards/tribes/ProfileTribeCard'
import TribeCardSkeleton from '../skelton/tribe-card-skelton'
import { fetchUsersTribes } from '@/lib/supabase/profile/user'

export default function ShowUsersTribeCard({ userId }: { userId: string }) {
  // console.log(userId)

  const { data, error, isLoading } = useQuery({
    queryFn: () => fetchUsersTribes(userId),
    queryKey: [`tribes-${userId}`],
  })

  if (error || !data) {
    console.log('Tribes fetch failed')
    return
  }

  if (isLoading) {
    return <TribeCardSkeleton />
  }
  return (
    // <Suspense fallback={<TribeCardSkeleton />}>
    <div>
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
              tribeId={id}
            />
          </div>
        )
      })}
    </div>
  )
}
