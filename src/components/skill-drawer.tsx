'use client'
import { FieldErrors, UseFormRegister } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { MAX_SKILL_TITLE_LENGTH, TEditProfileSchema } from '@/lib/validators/edit-profile-validator'
import { Textarea } from './ui/textarea'

interface SkillDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onSave: () => void
  //   onCancel: UseFieldArrayRemove
  register: UseFormRegister<TEditProfileSchema>
  currentSkillIndex: number
  errors?: FieldErrors<TEditProfileSchema>
}

export function SkillDrawer({
  isOpen,
  onOpenChange,
  onSave,
  register,
  currentSkillIndex,
  errors,
  //   onCancel,
}: SkillDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent className="min-h-[70%]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Skill</DrawerTitle>
        </DrawerHeader>
        <div className="px-4 pb-4">
          <Input
            {...register(`skill.${currentSkillIndex}.title`)}
            className="mb-4 h-12 bg-muted placeholder:font-bold placeholder:text-muted-foreground/50"
            maxLength={MAX_SKILL_TITLE_LENGTH}
            placeholder="Eg: Software Developer"
          />
          {errors?.skill?.[currentSkillIndex]?.title && (
            <p className="mb-2 text-sm text-red-600">
              {errors.skill[currentSkillIndex]?.title?.message}
            </p>
          )}
          <DrawerTitle className="mb-5">Add Sub Skills</DrawerTitle>
          <Textarea
            {...register(`skill.${currentSkillIndex}.subSkill`)}
            placeholder="Sub Skill (optional)"
            className="bg-muted placeholder:font-bold placeholder:text-muted-foreground/50"
          />
          {errors?.skill?.[currentSkillIndex]?.subSkill && (
            <p className="mb-2 text-sm text-red-600">
              {errors.skill[currentSkillIndex]?.subSkill?.message}
            </p>
          )}
          <div className="mt-5 flex flex-col justify-between gap-4">
            <Button
              onClick={() => {
                //   onCancel(currentSkillIndex)
                onOpenChange(false)
              }}
              variant="outline"
              className="py-4 font-semibold hover:bg-gray-950"
            >
              Add Another Skill
            </Button>
            <Button
              type="button"
              className="bg-blue-500 py-4 font-semibold text-white hover:bg-blue-700"
              onClick={onSave}
            >
              Save Skill
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
