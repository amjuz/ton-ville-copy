import SearchEventOrQuestCard, {
  SkeltonSearchEventOrQuestCard,
} from '@/components/Cards/search/search-event-card'
import { useSearch } from '@/hooks/useCustomHooks'

export default function QuestSearchCardWrapper() {
  const { data, isFetching } = useSearch('Quests')
  if (isFetching) return <SkeltonSearchEventOrQuestCard />
  return (
    <div className="grid w-full grid-cols-2 gap-2">
      {data?.map((item, index) => (
        <SearchEventOrQuestCard
          key={`quest-search-card-${index}`}
          type="quests"
          imageSrc={item.questImageSrc}
          shotDescription={item.shotDescription}
          title={item.questTitle}
        />
      ))}
      {data && !data.length && <p className="text-xl font-semibold">No match Found</p>}
    </div>
  )
}
