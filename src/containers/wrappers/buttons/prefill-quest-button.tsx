import { Button } from '@/components/ui/button'
import { TQuestFormSchema, TTribesValidator } from '@/lib/validators/forms'
import { faker } from '@faker-js/faker'
import { UseFormSetValue } from 'react-hook-form'

export default function PrefillQuestButton({
  setValue,
}: {
  setValue: UseFormSetValue<TQuestFormSchema>
}) {
  const tribes: TQuestFormSchema = {
    title: faker.word.adjective() + ' ' + faker.word.noun() + ' Tribe',
    description: faker.lorem.paragraph(3),
    guidelines: faker.lorem.paragraphs(2),
    questImage: faker.image.urlPicsumPhotos(),
    subTitle: faker.lorem.sentence(5),
  }
  return (
    <p
      className="text-sm font-medium leading-none underline peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      onClick={() => {
        (Object.keys(tribes) as Array<keyof TQuestFormSchema>).map((item) => {
          setValue(item, tribes[item])
        })
      }}
    >
      Prefill
    </p>
  )
}
