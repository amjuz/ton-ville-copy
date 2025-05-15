import { cn } from '@/lib/utils/cn'
import { setSearchTitleQuery } from '@/store/features/search'
import { SearchMiniTabletData } from '../utils/mini-tablet-data'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks'

export default function SearchMiniTablet() {
  const dispatch = useAppDispatch()
  const { searchType } = useAppSelector((state) => state.search)
  return SearchMiniTabletData.map((item, index) => (
    <button
      key={`SearchMiniTabletDataCard-${item.title}-${index}`}
      onClick={() => {
        dispatch(setSearchTitleQuery({ state: item.title }))
        // SetSearchState(item.title)
      }}
      className={cn('flex items-center justify-center gap-1 rounded-full bg-[#262626] px-3 py-2', {
        'bg-white text-black': item.title === searchType,
      })}
    >
      <div className=" ">{item.icon(item.title === searchType ? true : false)}</div>
      <p className="text-sm">{item.title}</p>
    </button>
  ))
}
