'use client'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { nanoid } from 'nanoid'
import Image from 'next/image'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
// import profileImage from '@/assets/images/mock/Ape_Red_Mock.png'
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

  const {
    handleSubmit,
    watch,
    formState: {
      errors: {},
    },
    register,
    control,
    setError,
    clearErrors,
  } = useForm<TEditProfileSchema>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      skill: skills
        ? skills.map((item) => {
            return {
              id: item.id,
              title: item.skill,
            }
          })
        : [],
      displayName: name ?? '',
      addBio: bio ?? '',
    },
  })

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'skill',
  })
  const onSubmit = async (data: TEditProfileSchema) => {
    toast.loading('Updating user information...')
    const filteredSkills = filterSkills(data.skill)

    const { error } = await UpdateBioAction({
      data: {
        bio: data.addBio,
        name: data.displayName,
        skills: filteredSkills,
      },
    })
    if (error?.message) {
      toast.error(error.message)
      return
    }
    toast.success('Profile Update successful')
    const profileId = localStorage.getItem('profileId')
    await router.prefetch(`/protected/core/profile/${profileId}`)
    toast.loading('redirecting...')
    router.back()
    toast.dismiss()
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
      setError(`skill.${currentSkillIndex}.title`, {
        message: 'Skill title is required.',
      })
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
              <span
                className={cn({
                  'text-red-600': watch('addBio')?.length > MAX_BIO_LENGTH,
                })}
              >
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
