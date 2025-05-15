import SearchChiefCard from '@/components/Cards/search/search-chief-card'
import { useSearch } from '@/hooks/useCustomHooks'
import ChiefSearchCardPopularItemsSkelton from '@/components/skelton/ChiefSearchCardPopularItemsSkelton'

export default function ChiefSearchCardWrapper() {
  const { data, isFetching } = useSearch('Chiefs')

  if (isFetching) return <ChiefSearchCardPopularItemsSkelton count={8} />

  return (
    <div className="flex w-full flex-col">
      {data &&
        data.map((item, index) => (
          <SearchChiefCard
            type="Profile"
            key={`chiefSearchCardWrapper-${item.id}-${index}`}
            nickName={item.nickName}
            userName={item.userName}
            followers={item.followers}
            following={item.following}
            id={item.id}
            profilePic={item.profilePic?.src}
          />
        ))}
      {data && !data?.length ? <p className="text-xl font-semibold">No match Found</p> : null}
    </div>
  )
}
