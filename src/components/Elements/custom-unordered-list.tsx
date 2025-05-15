import React from 'react'

export default function CustomUnOrderedList({ items }: { items: string[] }) {
  return (
    <ol className="m-0 list-none space-y-1 p-0">
      {items.map((item, index) => (
        <li key={index} className="flex gap-1">
          <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-muted-foreground"></span>
          <span className="">{item}</span>
        </li>
      ))}
    </ol>
  )
}
