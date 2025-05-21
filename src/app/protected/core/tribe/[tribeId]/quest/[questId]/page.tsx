'use client'
import React, { Suspense } from 'react'
import { useParams } from 'next/navigation'
import QuestPageWrapper from '@/containers/wrappers/quest-page-wrapper'

export default function TribeQuestPage() {
  return (
    <main>
      {/* Add Loaders state as fallback and call the query ->  */}
      <Suspense fallback={<></>}>
        <QuestPageWrapper />
      </Suspense>
    </main>
  )
}
