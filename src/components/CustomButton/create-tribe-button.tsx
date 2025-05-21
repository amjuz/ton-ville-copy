'use client'

import { useEffect, useState } from 'react'
import TribesFormDialog from '../tribes/TribesFormDialog'
import { useQueryClient } from '@tanstack/react-query'
import { useAppSelector } from '@/hooks/reduxHooks'

export default function CreateTribeButton({ label }: { label: string }) {
  const [open, setOpen] = useState(false)
  const { userId } = useAppSelector((state) => state.profile)

  const query = useQueryClient()
  useEffect(() => {
    async function mounted() {
      await query.refetchQueries({ queryKey: [`profile-page-tribes-query-${userId}`] })
    }
    mounted()

  }, [open,query])

  return <TribesFormDialog label={label} open={open} setOpen={setOpen} />
}
