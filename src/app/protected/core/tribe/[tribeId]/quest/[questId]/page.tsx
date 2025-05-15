import React, { Suspense } from 'react'
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
