import { X } from 'lucide-react'
import { Control, FieldArrayWithId, UseFormRegister, useWatch } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils/cn'
import { TEditProfileSchema } from '@/lib/validators/edit-profile-validator'
type EditCreateDrawerProps = {
  control: Control<TEditProfileSchema>
  index: number
  fields: FieldArrayWithId<TEditProfileSchema, 'skill', 'id'>[]
  register: UseFormRegister<TEditProfileSchema>
}
export const MAX_SKILL = 6
export default function EditDrawer({ control, index, fields, register }: EditCreateDrawerProps) {
  // const [skills, setSkills] = React.useState<string[]>([])

  // const handleAddSkill = (e: React.FormEvent) => {
  //   if (inputValue.trim() && skills.length < MAX_SKILL) {
  //     setSkills([...skills, inputValue.trim()])
  //     setInputValue('')
  //   }
  // }

  // const removeSkill = (skillToRemove: string) => {
  //   setSkills(skills.filter((skill) => skill !== skillToRemove))
  // }
  // const handleSkillChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
  //   setInputValue(e.target.value)
  //   let splittedValue = e.target.value.trim().split(',').filter(Boolean)
  //   setSkills(splittedValue)
  // }

  const { skill: skills } = useWatch({
    control,
    exact: true,
  })
  const skillMap = skills && skills[index]?.subSkill?.trim().split(',').filter(Boolean)

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button type="button" variant="ghost" size="sm" className="text-blue-600">
          Edit
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-[50%]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Add Skill</DrawerTitle>
        </DrawerHeader>
        <div className="h-full px-4">
          <Input
            key={`drawer-title-${fields[index]?.id}`}
            {...control.register(`skill.${index}.title`)}
            placeholder="Whats your skills ?"
          />
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h4 className="mb-2 text-lg font-semibold leading-none tracking-tight">Sub Skills</h4>
              <div>
                <p>
                  <span
                    className={cn({
                      'font-medium text-red-500': skillMap && skillMap.length > MAX_SKILL,
                    })}
                  >
                    {skillMap ? skillMap.length : 0}
                  </span>
                  {''}/{MAX_SKILL}
                </p>
              </div>
            </div>
            <div className="mb-4 flex flex-wrap gap-2">
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
                    <button onClick={() => {}} className="ml-2 hover:text-zinc-400">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
            </div>
            <div className="h-full space-y-4">
              <Textarea
                key={`drawer-title-${fields[index]?.id}-skill-add`}
                placeholder="Enter a skill"
                {...register(`skill.${index}.subSkill`)}
                className="h-full"
              />
            </div>{' '}
          </div>
        </div>
        <DrawerFooter>
          <Button type="button">Save</Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
