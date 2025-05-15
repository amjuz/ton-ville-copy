'use client'
import { Button } from '@/components/ui/button'
import { TSKillSchema } from '@/lib/validators/edit-profile-validator'

interface SkillListProps {
  skills: TSKillSchema[]
  watch: (name: string) => any
  remove: (index: number) => void
  onEditSkill: (index: number) => void
}

export function SkillList({ skills, watch, remove, onEditSkill }: SkillListProps) {
  return (
    <>
      {skills.map((skill, index) => (
        <div
          key={skill.id}
          className="my-2 flex items-center justify-between rounded-lg bg-muted py-2"
        >
          <div className="ml-4 flex items-center space-x-2">
            <p className="font-medium">{watch(`skill.${index}.title`) || 'Untitled'}</p>
            {watch(`skill.${index}.subSkill`) && (
              <p className="text-muted-foreground">{watch(`skill.${index}.subSkill`)}</p>
            )}
          </div>
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onEditSkill(index)}
              className="text-blue-600"
            >
              Edit
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => remove(index)}
              className="text-red-600"
            >
              Remove
            </Button>
          </div>
        </div>
      ))}
    </>
  )
}
