import { cn } from '@/lib/utils/cn'
import QuestCard from './quest-card'
import { TQuestTableExtendsAuthor } from '@/lib/supabase/quests/quests-table'
import { useParams } from 'next/navigation'

type TribesQuestList = { questsData: TQuestTableExtendsAuthor[] }

export default function TribeQuestsList({ questsData }: TribesQuestList) {
  const params = useParams()
  const tribeId = params.tribeId as string
  return (
    <div
      className={cn(
        'scrollbar-w-2 scrollbar-thumb-rounded scrollbar-track-primary scrollbar-thumb mb-6 mt-4 flex w-full gap-5 overflow-x-scroll'
      )}
    >
      {questsData.map((item, i) => (
        <QuestCard
          tribeId={tribeId}
          description={item.description ?? ''}
          imageAlt={''}
          imageSrc={item.questImage ?? ''}
          title={item.title ?? ''}
          author={item.author ?? ''}
          questId={item.id}
          key={`quest-card-${i}-${item.title}`}
        />
      ))}
      {/* {hasNextPage ? <QuestCardInfiniteQuerySkelton ref={ref} /> : null} */}
    </div>
  )
}
