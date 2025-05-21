import { faker } from '@faker-js/faker'
import { UseFormSetValue } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { TEventsFormSchema, TTribesValidator } from '@/lib/validators/forms'

export default function PrefillEventButton({
  setValue,
}: {
  setValue: UseFormSetValue<TEventsFormSchema>
}) {
  const events: TEventsFormSchema = {
    date: faker.date.future().toISOString(),
    eventPhoto: faker.image.urlPicsumPhotos(),
    genre: faker.music.genre(),
    location: `${faker.location.city()}, ${faker.location.country()}`,
    summary: faker.lorem.sentences(2),
    title: faker.company.catchPhrase(),
  }

  return (
    <p
      className="text-sm font-medium leading-none underline peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      onClick={() => {
        ;(Object.keys(events) as Array<keyof TEventsFormSchema>).map((item) => {
          setValue(item, events[item])
        })
      }}
    >
      Prefill
    </p>
  )
}
