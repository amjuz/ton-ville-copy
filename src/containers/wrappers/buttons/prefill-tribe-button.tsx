import { Button } from '@/components/ui/button'
import { TTribesValidator } from '@/lib/validators/forms'
import { faker } from '@faker-js/faker'
import { UseFormSetValue } from 'react-hook-form'

export default function PrefillTribeButton({
  setValue,
}: {
  setValue: UseFormSetValue<TTribesValidator>
}) {
  const tribes: TTribesValidator = {
    author: faker.book.author(),
    tribeCoverPhoto: faker.image.urlPicsumPhotos(),
    tribeProfilePhoto: faker.image.url(),
    tribeName: faker.music.genre(),
    description: faker.lorem.paragraphs()
  }

  return (
    <p
      className="text-sm font-medium leading-none underline peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      onClick={() => {
        setValue('author', tribes.author)
        setValue('tribeCoverPhoto', tribes.tribeCoverPhoto)
        setValue('tribeProfilePhoto', tribes.tribeProfilePhoto)
        setValue('tribeName', tribes.tribeName)
      }}
    >
      Prefill
    </p>
  )
}
