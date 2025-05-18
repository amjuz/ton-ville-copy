'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { updateUsername } from '@/app/actions/update-username'

const schema = z.object({
  username: z.string().min(1, 'Required').max(10, 'Max 10 characters'),
})

type FormData = z.infer<typeof schema>

export default function SetUsername() {
  const [savedUsername, setSavedUsername] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setLoading(true)
    const res = await updateUsername(data.username)
    setSavedUsername(data.username)
    // console.log('res:', res)
    setLoading(false)
  }

  if (savedUsername) {
    return <p className="text-sm text-muted-foreground">{savedUsername}</p>
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-1 rounded-lg border-2 border-dashed px-2 py-1"
    >
      <input
        {...register('username')}
        className="peer h-6 w-24 border-none bg-transparent text-sm text-blue-600 focus:outline-none focus:ring-0"
        placeholder="add username"
        maxLength={10}
      />

      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <button
          type="submit"
          className="text-green-500 hover:text-green-700 peer-placeholder-shown:invisible peer-focus:visible"
        >
          <Check size={18} />
        </button>
      )}
      {errors.username && <p className="text-xs text-red-500">{errors.username.message}</p>}
    </form>
  )
}
