'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useServerAction } from 'zsa-react'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { updateTwitterId } from '@/lib/supabase/tribes/tribe-table'

const schema = z.object({
  twitterId: z.string().min(1, 'Required').max(10, 'Max 10 characters'),
})

type FormData = z.infer<typeof schema>

// type asyncEventState =
export default function SetTwitterName({ tribeId }: { tribeId: string }) {
  const [twitter, setTwitter] = useState('')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const { mutate, error, isPending, isSuccess, isError } = useMutation({
    mutationFn: (twitterId: string) => updateTwitterId(twitterId, tribeId),
    mutationKey: [`update-tribe-${tribeId}-twitter-id`],
  })
  useEffect(() => {
    if (isSuccess) {
      setTwitter(getValues('twitterId'))
    }
    if (isError) {
      setTwitter('')
    }
  }, [isSuccess, setTwitter, getValues, isError])

  if (isPending) {
    toast.loading('Updating Twitter...', { id: 'twitterMutationId' })
  }

  if (isError) {
    toast.error(`Failed to update Twitter, ${error}`, { id: 'twitterMutationId' })
  }

  if (isSuccess) {
    toast.success('Twitter Update successful', { id: 'twitterMutationId' })
  }

  async function onSubmit(data: FormData) {
    await mutate(data.twitterId)
    router.refresh()
  }
  if (twitter.length)
    return (
      <Link href={`https://x.com/${`${twitter}`}`} target="_blank" className="text-sm">
        {twitter}
      </Link>
    )
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-1 rounded-lg border-2 border-dashed px-2 py-1"
    >
      <input
        {...register('twitterId')}
        className="peer h-6 w-24 border-none bg-transparent text-sm text-blue-600 focus:outline-none focus:ring-0"
        placeholder="add username"
        maxLength={10}
      />

      <button
        type="submit"
        className="text-green-500 hover:text-green-700 peer-placeholder-shown:invisible peer-focus:visible"
      >
        <Check size={18} />
      </button>
      {errors.twitterId && <p className="text-xs text-red-500">{errors.twitterId.message}</p>}
    </form>
  )
}
