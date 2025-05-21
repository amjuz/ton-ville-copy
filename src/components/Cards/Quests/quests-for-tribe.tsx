import { useQuery } from '@tanstack/react-query'
import QueryCardList from './quest-card-list'
import { getTribeQuests } from '@/lib/supabase/quests/quests-table'
import { useParams } from 'next/navigation'
import TribeQuestsList from './tribe-quests-list'

export default function QuestsForTribe({
  tribeId,
}: {
  tribeId: string
}) {
  const { data } = useQuery({
    queryKey: ['tribes-quests', tribeId],
    queryFn: () => getTribeQuests({ tribeId }),
  })

  if (!data) return <div className="">Create new Events to display content</div>
  // const { inView, ref } = useInView({
  //   rootMargin: '0px 0px',
  // })

  // useEffect(() => {
  //   fetchNextPage()
  // }, [inView, fetchNextPage])
  return <TribeQuestsList questsData={data} />
}
