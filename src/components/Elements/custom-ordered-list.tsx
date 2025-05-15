import React from 'react'

export default function CustomOrderedList({ items }: { items: string[] }) {
  return (
    <ol className="m-0 list-none space-y-1 p-0">
      {items.map((item, index) => (
        <li key={index} className="flex gap-1">
          <span className=" ">{index + 1}.</span>
          <span className="">{item}</span>
        </li>
      ))}
    </ol>
  )
}
