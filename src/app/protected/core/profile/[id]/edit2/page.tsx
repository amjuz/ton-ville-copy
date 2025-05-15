'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { nanoid } from 'nanoid'
import Image from 'next/image'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import profileImage from '@/assets/images/mock/Ape_Red_Mock.png'
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
import EditCreateDrawer from './components/create-drawer'
import { DisplaySkills } from './components/display-Skills'
import UpdateBioAction from '@/actions/UpdateBio'

export default function ProfileEditPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [currentSkillIndex, setCurrentSkillIndex] = useState<number | null>(null)

  const {
    handleSubmit,
    watch,
    formState: { errors },
    register,
    reset,
    control,
    setError,
    clearErrors,
  } = useForm<TEditProfileSchema>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      skill: [],
    },
  })

  const { fields, append, update, remove } = useFieldArray({
    control,
    name: 'skill',
  })

  const onSubmit = async (data: TEditProfileSchema) => {
    // const hasInvalidSkill = data.skill.some((skill) => !skill.title.trim())
    // if (hasInvalidSkill) {
    //   setError('skill', { message: 'All skills must have a title.' })
    //   return
    // }
    toast.success('Loading...')
    const { data: successRes, error } = await UpdateBioAction({
      data: {
        bio: data.addBio,
        name: data.displayName,
      },
    })
    if (error?.message) {
      toast.error(error.message)
      return
    }
    toast.success(successRes)
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
    <main className="px-4 pt-2">
      <h1 className="my-5 text-2xl font-bold">Edit Profile</h1>
      <div className="flex items-center justify-center pb-2">
        <div className="relative">
          <Image
            width={480}
            height={720}
            className="aspect-square max-w-40 rounded-2xl object-cover"
            alt="User profile picture"
            src={profileImage.src}
          />
          <div className="absolute left-0 right-0 top-0 flex h-full w-full items-center justify-center rounded-2xl bg-black/50">
            <p className="font-bold tracking-wide text-muted-foreground/100">Upload Photo</p>
          </div>
        </div>
      </div>
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
        <EditCreateDrawer
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
    </main>
  )
}
