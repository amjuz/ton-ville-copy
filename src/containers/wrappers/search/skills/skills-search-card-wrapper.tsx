import SearchChiefCard from '@/components/Cards/search/search-chief-card'
import { useSearch } from '@/hooks/useCustomHooks'
import ChiefSearchCardPopularItemsSkelton from '@/components/skelton/ChiefSearchCardPopularItemsSkelton'

export default function SkillsSearchCardWrapper() {
  const { data, isFetching } = useSearch('Skills')
  if (isFetching) return <ChiefSearchCardPopularItemsSkelton count={10} />
  return (
    <div className="flex w-full flex-col">
      {data?.map((item, index) => (
        <SearchChiefCard
          type="Skill"
          key={`chiefSearchCardWrapper-${index}-${item.id}`}
          nickName={item.nickName}
          profilePic={item.profilePic?.src}
          skills={item.skills}
        />
      ))}
      {data && !data.length && <p className="text-xl font-semibold">No match Found</p>}
    </div>
  )
}
