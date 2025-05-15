import React from 'react'
import DailyGemClaimCard from '@/components/Cards/claim/DailyGemClaimCard'
import { Button } from '@/components/ui/button'

export default function ClaimPage() {
  const config = {
    isTodayClaimed: true,
  }
  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-1 py-12">
        <h1 className="text-3xl font-bold">Reward Streak 🔥</h1>
        <p className="max-w-[250px] text-center leading-5 text-muted-foreground">
          Collect everyday to claim maximum reward!
        </p>
      </div>
      <div className="grid grid-flow-dense gap-2 p-4">
        <div className="flex items-center justify-center gap-2 border-green-400">
          <DailyGemClaimCard index={1} GemCount={30} {...config} isClaimed={true} />
          <DailyGemClaimCard index={2} GemCount={50} {...config} isClaimed={true} isMultiple />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 border-orange-400">
          <DailyGemClaimCard index={3} GemCount={250} isToday {...config} isMultiple />
          <DailyGemClaimCard index={4} GemCount={350} isMultiple isForwarded />
          <DailyGemClaimCard index={5} GemCount={450} isMultiple isForwarded />
        </div>
        <div className="flex items-center justify-center gap-2 border-purple-500">
          <DailyGemClaimCard index={6} GemCount={500} isMultiple isForwarded />
          <DailyGemClaimCard index={7} GemCount={1000} isMultiple isForwarded />
        </div>
      </div>
      <div className="flex items-center justify-center">
        {/* Change the formatting using a useEffect or something in a child component  */}
        <Button
          disabled={config.isTodayClaimed}
          variant={'ClaimBlue'}
          className="w-full max-w-[236px] font-semibold"
        >
          {config.isTodayClaimed ? `Next in ${new Date(Date.now()).toLocaleTimeString()}` : 'Claim'}
        </Button>
      </div>
    </div>
  )
}
