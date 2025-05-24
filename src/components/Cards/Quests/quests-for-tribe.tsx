import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import QueryCardList from './quest-card-list'
import { getTribeQuests } from '@/lib/supabase/quests/quests-table'
import TribeQuestsList from './tribe-quests-list'

export default function QuestsForTribe({
  tribeId,
  setOpenQuestDialog,
}: {
  tribeId: string
  setOpenQuestDialog: (state: boolean) => void
}) {
  const { data } = useQuery({
    queryKey: ['tribes-quests', tribeId],
    queryFn: () => getTribeQuests({ tribeId }),
  })

  if (!data)
    return (
      <div className="flex justify-between rounded-lg border bg-muted p-3 text-sm">
        <p className="text-blue-400">Create new Events to display content.</p>
        <div
          className="cursor-pointer border font-bold underline"
          onClick={() => setOpenQuestDialog(true)}
        >
          Create
        </div>
      </div>
    )
  // const { inView, ref } = useInView({
  //   rootMargin: '0px 0px',
  // })

  // useEffect(() => {
  //   fetchNextPage()
  // }, [inView, fetchNextPage])
  return <TribeQuestsList questsData={data} />
}
