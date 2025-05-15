import { useSearch } from '@/hooks/useCustomHooks'
import SearchTribeCard, {
  SkeltonSearchTribeCard,
} from '@/components/Cards/search/search-tribe-card'

export default function TribeSearchCardWrapper() {
  const { data, isFetching } = useSearch('Tribes')

  if (isFetching) return <SkeltonSearchTribeCard />
  return (
    <div className="grid w-full grid-cols-2 gap-2">
      {data?.map((item, index) => (
        <SearchTribeCard
          followers={item.followers}
          tribePic={item.tribePic}
          tribeTitle={item.tribeTitle}
          userName={item.userName}
          key={`tribeSearchCardWrapper-${index}-${item.id}`}
        />
      ))}
      {data && !data.length && <p className="text-xl font-semibold">No match Found</p>}
    </div>
  )
}
