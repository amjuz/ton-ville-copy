'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { nanoid } from '@reduxjs/toolkit'
import profileImage from '@/assets/images/mock/Ape_Red_Mock.png'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils/cn'
import {
  EditProfileSchema,
  TEditProfileSchema,
  MAX_DISPLAY_NAME_LENGTH,
  MAX_BIO_LENGTH,
} from '@/lib/validators/edit-profile-validator'
import { SkillDrawer } from '@/components/skill-drawer'
import { SkillList } from '@/components/skill-list'

export default function ProfileEditPage() {
  const {
    handleSubmit,
    watch,
    formState: { errors },
    register,
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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [currentSkillIndex, setCurrentSkillIndex] = useState<number | null>(null)

  const onSubmit = (data: TEditProfileSchema) => {
    // Remove any skills with empty titles before submitting
    const validSkills = data.skill?.filter((skill) => skill.title.trim() !== '')

    if (validSkills && validSkills.length === 0) {
      setError('skill', { message: 'At least one skill is required.' })
      return
    }

    console.log('Form Data:', { ...data, skill: validSkills })
  }

  const addSkill = () => {
    const newSkill = {
      id: nanoid(12),
      title: '',
      subSkill: '',
    }

    const newIndex = fields.length
    append(newSkill)
    setCurrentSkillIndex(newIndex)
    setIsDrawerOpen(true)
  }

  const editSkill = (index: number) => {
    setCurrentSkillIndex(index)
    setIsDrawerOpen(true)
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
    <main className="px-2 pt-10">
      <h1 className="text-2xl font-bold">Edit Profile</h1>

      <div className="flex items-center justify-center py-6">
        <div className="relative">
          <Image
            width={480}
            height={720}
            className="aspect-square max-w-40 rounded-2xl object-cover"
            alt="User profile picture"
            src={profileImage.src}
          />
          <div className="absolute left-0 right-0 top-0 flex h-full w-full items-center justify-center rounded-2xl bg-black/50">
            <p className="font-bold tracking-wide text-muted-foreground/90">Upload Photo</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="">
        {/* Display Name Input */}
        <div>
          <div className="ml-2 flex items-center justify-between">
            <Label className="py-3 text-base font-black">Display Name</Label>
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

        {/* Bio Input */}
        <div className="mt-2">
          <div className="ml-2 flex items-center justify-between">
            <Label className="py-3 text-base font-black">Add a bio</Label>
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
            placeholder="How do you describe your self in short?"
          />
        </div>

        {/* Skills Section */}
        <div className="mt-4">
          <Label className="pl-2 text-base font-black">Skills</Label>
          <SkillList skills={fields} watch={watch} remove={remove} onEditSkill={editSkill} />
        </div>
        <div className="mt-4">
          <Button
            variant="link"
            className="mt-4 h-auto p-0 py-0 font-black text-blue-600"
            type="button"
            onClick={addSkill}
          >
            + Add Skills
          </Button>

          {errors.skill && <p className="mt-2 text-red-600">{errors.skill.message}</p>}
        </div>

        <Button
          type="submit"
          variant={'ClaimBlue'}
          className="mb-20 mt-4 w-full rounded-lg font-bold"
        >
          Save Profile
        </Button>
      </form>

      {currentSkillIndex !== null && (
        <SkillDrawer
          isOpen={isDrawerOpen}
          onOpenChange={setIsDrawerOpen}
          onSave={saveSkill}
          register={register}
          currentSkillIndex={currentSkillIndex}
          errors={errors}
        />
      )}
    </main>
  )
}
