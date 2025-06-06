'use client'

import { useCallback, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { getBrowserClient } from '@/lib/supabase/client'
import { FunctionName } from '@/types/database'

async function getUserGems() {
  const supabase = getBrowserClient()
  const { data, error } = await supabase.from('profile').select('gems').single()
  if (error) throw error
  return data.gems
}

export default function UserPage() {
  const [gems, setGems] = useState<number | null>(null)

  useEffect(() => {
    getUserGems().then((gems) => setGems(gems))
  }, [])

  useEffect(() => {
    console.log('Gems:', gems)
  }, [gems])

  // const claimGems = useCallback(async (claimFunction: FunctionName) => {
  //   const supabase = getBrowserClient()
  //   const { error, status } = await supabase.rpc('claim_join_group')
  //   if (error) throw error
  //   console.log('Claimed Easter Egg Status:', status)
  //   getUserGems().then((gems) => setGems(gems))
  // }, [])

  return (
    <div>
      <h1>Gems: {gems}</h1>
      <Button>Claim Easter Egg</Button>
      <br />
      <Button>Claim Follow Twitter</Button>
      <br />
      <Button>Claim Join Group</Button>
    </div>
  )
}
