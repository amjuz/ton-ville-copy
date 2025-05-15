import SearchEventOrQuestCard, {
  SkeltonSearchEventOrQuestCard,
} from '@/components/Cards/search/search-event-card'
import { useSearch } from '@/hooks/useCustomHooks'

export default function EventsSearchCardWrapper() {
  const { data, isFetching } = useSearch('Events')
  if (isFetching) return <SkeltonSearchEventOrQuestCard />
  return (
    <div className="grid w-full grid-cols-2 gap-2">
      {data?.map((item, index) => (
        <SearchEventOrQuestCard
          key={`events-search-card-${index}`}
          type="events"
          imageSrc={item.eventImageSrc}
          shotDescription={item.shotDescription}
          title={item.eventTitle}
        />
      ))}
      {data && !data.length && <p className="text-xl font-semibold">No match Found</p>}
    </div>
  )
}
