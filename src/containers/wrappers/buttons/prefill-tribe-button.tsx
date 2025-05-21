import { Button } from '@/components/ui/button'
import { TTribesValidator } from '@/lib/validators/forms'
import { faker } from '@faker-js/faker'
import { UseFormSetValue } from 'react-hook-form'

// tribeImage: faker.helpers.arrayElement(arr),
// tribeName: faker.music.genre(),
// Subscribers: faker.number.int(10020),
// rank: faker.number.int({ min: 1, max: 200 }),
// author: faker.book.author(),
// profilePic: faker.helpers.arrayElement(arr),
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
