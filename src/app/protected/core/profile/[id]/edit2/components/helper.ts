export function filterSkills(
  skills:
    | {
        id: string
        title: string
        subSkill: string
      }[]
    | undefined
) {
  const groupedMap = new Map<string, { skill: string; sub_skills: Set<string>; id: string }>()

  for (const { id, title, subSkill } of skills ?? []) {
    const key = `${id}-${title}`
    const subSkillsArray = subSkill.split(',').map((s) => s.trim())

    if (!groupedMap.has(key)) {
      groupedMap.set(key, {
        skill: title,
        sub_skills: new Set(subSkillsArray),
        id,
      })
    } else {
      const entry = groupedMap.get(key)!
      subSkillsArray.forEach((s) => entry.sub_skills.add(s))
    }
  }

  const result = Array.from(groupedMap.values()).map(({ skill, sub_skills, id }) => ({
    skill,
    sub_skills: Array.from(sub_skills),
    id,
  }))

  return result
}
