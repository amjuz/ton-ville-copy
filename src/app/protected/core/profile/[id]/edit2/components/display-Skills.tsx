'use client'
import { Trash2 } from 'lucide-react'
import { Control, FieldArrayWithId, UseFormRegister, useWatch } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { TEditProfileSchema } from '@/lib/validators/edit-profile-validator'
import EditDrawer from './edit-drawer'
import { TruncateText } from '@test/utils/utils'
interface SkillListProps {
  control: Control<TEditProfileSchema>
  remove: (number: number) => void
  fields: FieldArrayWithId<TEditProfileSchema, 'skill', 'id'>[]
  register: UseFormRegister<TEditProfileSchema>
}

export function DisplaySkills({ control, remove, fields, register }: SkillListProps) {
  const { skill: skills } = useWatch({
    control,
    exact: true,
  })

  return (
    <div className="space-y-2">
      {skills &&
        skills?.map((skill, index) => {
          if (!skill.id) {
            return null
          }
          const formattedSkill = TruncateText(skill.subSkill ?? '', 20)
          return (
            <div
              key={`${skill?.id}-display-skill`}
              className="flex items-center justify-between rounded-lg bg-muted p-3 first:mt-[17px] last:mb-[17px]"
            >
              <div className="flex items-center space-x-2">
                <p className="font-medium">{skill?.title || 'Untitled'}</p>
                <p className="text-muted-foreground">{formattedSkill}</p>
              </div>
              <div className="flex space-x-2">
                <EditDrawer register={register} fields={fields} control={control} index={index} />
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => remove(index)}
                  size="icon"
                  className=""
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            </div>
          )
        })}
    </div>
  )
}
