import { X } from 'lucide-react'
import React, { Dispatch, SetStateAction } from 'react'
import {
  Control,
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayUpdate,
  UseFormRegister,
  useWatch,
} from 'react-hook-form'
import { nanoid } from '@reduxjs/toolkit'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils/cn'
import { TEditProfileSchema } from '@/lib/validators/edit-profile-validator'
import { MAX_SKILL } from './edit-drawer'
type EditCreateDrawerProps = {
  isDrawerOpen: boolean
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>
  fields: FieldArrayWithId<TEditProfileSchema, 'skill', 'id'>[]
  register: UseFormRegister<TEditProfileSchema>
  append: UseFieldArrayAppend<TEditProfileSchema>
  control: Control<TEditProfileSchema>
  update: UseFieldArrayUpdate<TEditProfileSchema>
  onSave?: () => void
}
export default function CreateDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
  fields,
  register,
  append,
  control,
  update,
  onSave,
}: EditCreateDrawerProps) {
  // const [skills, setSkills] = React.useState<string[]>([])
  const index = fields?.length - 1
  const [inputValue, setInputValue] = React.useState('')

  const { skill: skills } = useWatch({
    control,
    exact: true,
  })
  const Skill = skills && skills[fields?.length - 1]

  const skillMap = skills && skills[fields?.length - 1]?.subSkill?.trim().split(',').filter(Boolean)

  const removeSkill = (skillToRemove: number) => {
    if (!skillMap?.length || !Skill?.id) {
      console.warn('Cannot remove skill: Invalid state')
      return
    }

    try {
      const updatedSkillMap = skillMap.filter((_, index) => index !== skillToRemove)
      const updatedSubSkill = updatedSkillMap.join(', ')

      update(fields?.length - 1, {
        id: Skill.id,
        title: Skill.title ?? '',
        subSkill: updatedSubSkill,
      })
    } catch (error) {
      console.error('Error removing skill:', error)
    }
  }

  return (
    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
      <DrawerContent className="min-h-[70%]">
        <DrawerHeader className="text-left">
          <DrawerTitle className="py-2">Add Skill</DrawerTitle>
        </DrawerHeader>
        <div className="px-4">
          <Input
            key={`drawer-title-${fields[fields?.length - 1]?.id}-skill-add`}
            {...register(`skill.${fields?.length - 1}.title`)}
            placeholder="Eg: Software Developer"
            className="mb-4 h-12 bg-muted placeholder:font-bold placeholder:text-muted-foreground/50"
          />
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h4 className="py-2 text-lg font-semibold leading-none tracking-tight">Sub Skills</h4>
              <div>
                <p>
                  <span
                    className={cn({
                      'font-medium text-red-500':
                        skills &&
                        skills[fields?.length - 1]?.subSkill &&
                        skills?.length > MAX_SKILL,
                    })}
                  >
                    {skills ? skills.length : 0}
                  </span>
                  {''}/{MAX_SKILL}
                </p>
              </div>
            </div>
            <div className="mb-4 mt-2 flex flex-wrap gap-2">
              {skillMap &&
                skillMap.map((skill, index) => (
                  <span
                    key={`-skill-preview-${skill}-${index}`}
                    className={cn(
                      'inline-flex items-center rounded-full bg-zinc-800 px-3 py-1 text-sm text-white',
                      {
                        'text-red-500': index + 1 > MAX_SKILL,
                      }
                    )}
                  >
                    {skill}
                    <button
                      onClick={() => {
                        removeSkill(index)
                      }}
                      className="ml-2 hover:text-zinc-400"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
            </div>
            <div className="h-full space-y-4">
              <Textarea
                placeholder="Enter a skill"
                key={`drawer-title-${fields[fields?.length - 1]?.id}-skill-add`}
                {...register(`skill.${fields?.length - 1}.subSkill`)}
                className="h-full bg-muted placeholder:font-bold placeholder:text-muted-foreground/50"
              />
            </div>{' '}
          </div>
          <div className="mt-7 flex flex-col gap-4">
            <Button
              type="button"
              onClick={() => {
                append({ id: nanoid(12), subSkill: '', title: '' })
              }}
              className="h-[50px] bg-muted text-base font-semibold text-white"
            >
              Add Another Skill
            </Button>
            <DrawerClose asChild>
              <Button
                variant="ClaimBlue"
                onClick={onSave}
                className="h-[50px] py-4 text-base font-semibold text-white"
              >
                Save
              </Button>
            </DrawerClose>
          </div>
        </div>
        {/* <DrawerFooter>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  )
}
