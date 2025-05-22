'use client'
import { useParams, useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
// import profileImage from '@/assets/images/mock/Ape_Red_Mock.png'
import { nanoid } from '@reduxjs/toolkit'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils/cn'
import {
  EditProfileSchema,
  MAX_BIO_LENGTH,
  MAX_DISPLAY_NAME_LENGTH,
  TEditProfileSchema,
} from '@/lib/validators/edit-profile-validator'
import UpdateBioAction from '@/app/actions/UpdateBio'
import { filterSkills } from './helper'
import CreateDrawer from './create-drawer'
import { DisplaySkills } from './display-Skills'
import { Tables } from '@/types/database'
import { fetchUserProfileForEdit } from '@/lib/utils/user'

export default function UpdateProfileForm({
  bio,
  name,
  skills,
}: {
  name?: string | null
  bio?: string | null
  skills?: Tables['skills']['Row'][] | null
}) {
  const router = useRouter()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [currentSkillIndex, setCurrentSkillIndex] = useState<number | null>(null)
  const params = useParams()
  const userId = params.id as string
  const query = useQueryClient()

  const {
    handleSubmit,
    watch,
    formState: { errors, isDirty },
    reset,
    register,
    control,
    setError,
    clearErrors,
    setValue,
  } = useForm<TEditProfileSchema>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: { displayName: name ?? '', addBio: bio ?? '' },
  })

  const { fields, append, update, remove } = useFieldArray({ control, name: 'skill' })
  const onSubmit = async (data: TEditProfileSchema) => {
    toast.loading('Updating user information...', { id: 'onsubmit' })
    const filteredSkills = filterSkills(data.skill)

    const { error } = await UpdateBioAction({
      data: { bio: data.addBio, name: data.displayName, skills: filteredSkills },
    })

    if (error?.message) {
      toast.error(error.message)
      return
    }
    // query invalidation
    query.invalidateQueries({ queryKey: ['profile-page', userId] })
    query.invalidateQueries({ queryKey: ['user-profile-edit', userId] })
    query.invalidateQueries({ queryKey: ['user-skills', userId] })

    toast.success('Profile Update successful')
    reset()
    toast.loading('redirecting...', { id: 'onsubmit' })
    router.back()
    toast.dismiss('onsubmit')
  }

  const handleAddNewSkills = () => {
    append({ id: nanoid(12), subSkill: '', title: '' })
    setIsDrawerOpen(true)
    return
  }

  const saveSkill = () => {
    if (currentSkillIndex === null) return

    const skill = watch(`skill.${currentSkillIndex}`)

    if (!skill?.title.trim()) {
      setError(`skill.${currentSkillIndex}.title`, { message: 'Skill title is required.' })
      return
    }

    clearErrors(`skill.${currentSkillIndex}.title`)
    setIsDrawerOpen(false)
  }
  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="flex items-center justify-between">
            <Label className="my-[17px] text-base font-bold">Display Name</Label>
            <p className="text-sm text-muted-foreground">
              <span
                className={cn({
                  'text-red-600': (watch('displayName')?.length ?? 0) > MAX_DISPLAY_NAME_LENGTH,
                })}
              >
                {watch('displayName')?.length ?? 0}
              </span>
              /{MAX_DISPLAY_NAME_LENGTH}
            </p>
          </div>
          <Input
            {...register('displayName')}
            placeholder="What name do you want to display on profile?"
            className="h-12 bg-muted placeholder:font-bold placeholder:text-muted-foreground/50"
          />
        </div>
        <div className="">
          <div className="flex items-center justify-between">
            <Label className="my-[17px] text-base font-bold">Add a Bio</Label>
            <p className="text-sm text-muted-foreground">
              <span className={cn({ 'text-red-600': watch('addBio')?.length > MAX_BIO_LENGTH })}>
                {watch('addBio')?.length ?? 0}
              </span>
              /{MAX_BIO_LENGTH}
            </p>
          </div>
          <Textarea
            className="scrollbar-w-2 scrollbar-thumb-rounded scrollbar-thumb h-12 resize-none bg-muted text-sm placeholder:font-bold placeholder:text-muted-foreground/50"
            {...register('addBio')}
            placeholder="Write something about yourself..."
          />
        </div>
        <div className="flex flex-col">
          <Label className="mt-[17px] text-base font-bold">Skills</Label>
          <DisplaySkills register={register} fields={fields} remove={remove} control={control} />
          <div className="">
            <Button
              type="submit"
              onClick={() => {
                handleAddNewSkills()
              }}
              variant={'link'}
              className="mt-4 h-auto p-0 px-0 py-0 text-base font-bold text-blue-600"
            >
              + Add Skills
            </Button>
          </div>
        </div>
        <Button
          type="submit"
          variant={'ClaimBlue'}
          className="my-4 h-12 w-full text-base font-semibold"
          disabled={!isDirty}
        >
          Save
        </Button>
      </form>
      <CreateDrawer
        update={update}
        control={control}
        append={append}
        register={register}
        fields={fields}
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
        onSave={saveSkill}
      />
    </div>
  )
}
