import React from 'react'
import { cn } from '@/lib/utils/cn'

// so here i have given skills as string array, actually what type should i be giving here
// because when we connect Database we would get the response in a json object and we might
// need to make that objects into an array to display it here
interface ISkillCards {
  skills?: string[]
}

export default function SkillCards({ skills = ['UI Design', 'Machine learning'] }: ISkillCards) {
  return (
    <div
      className={cn(
        'scrollbar-w-2 scrollbar-thumb-rounded scrollbar-track-primary scrollbar-thumb mt-1 flex gap-2 overflow-x-scroll'
      )}
    >
      {skills.map((item, index) => (
        <div key={`SkillCards-search-${index}`} className="flex rounded-full bg-[#D9D9D91A]">
          <div className="px-2 py-1.5 text-sm">
            <p className="flex-shrink-0 text-nowrap leading-none">{item}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
