'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import profileImage from '@/assets/images/mock/Ape_Red_Mock.png'
import { Button, buttonVariants } from '@/components/ui/button'
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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils/cn'
import {
  EditProfileSchema,
  MAX_BIO_LENGTH,
  MAX_DISPLAY_NAME_LENGTH,
  TEditProfileSchema,
} from '@/lib/validators/edit-profile-validator'

export default function ProfileEditPage() {
  const {
    handleSubmit,
    watch,
    formState: { errors, isLoading },
    register,
    reset,
  } = useForm<TEditProfileSchema>({
    resolver: zodResolver(EditProfileSchema),
  })
  function onSubmit(profileData: TEditProfileSchema) {}
  return (
    <main className="px-2 pt-10">
      <h1 className="text-2xl font-semibold">Edit Profile</h1>
      <div className="flex items-center justify-center">
        <Image
          width={480}
          height={720}
          className="aspect-square max-w-40 rounded-2xl object-cover"
          alt="User profile picture"
          src={profileImage.src}
        />
      </div>
      <div className="mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="ml-2 flex items-center justify-between">
              <Label className="text-base">Display Name</Label>
              <p className="text-sm text-muted-foreground">
                <span
                  className={cn({
                    'text-red-600': (watch('displayName')?.length ?? 0) > MAX_DISPLAY_NAME_LENGTH,
                  })}
                >
                  {watch('displayName')?.length ?? 0}
                </span>
                /{MAX_DISPLAY_NAME_LENGTH}
              </p>
            </div>
            <Input
              className="h-12"
              {...register('displayName')}
              placeholder="What name do you want to display on profile ?"
            />
          </div>
          <div className="mt-4">
            <div className="ml-2 flex items-center justify-between">
              <Label className="text-base">Add a bio</Label>
              <p className="text-sm text-muted-foreground">
                <span
                  className={cn({
                    'text-red-600': watch('addBio')?.length > MAX_BIO_LENGTH,
                  })}
                >
                  {watch('addBio')?.length ?? 0}
                </span>
                /{MAX_BIO_LENGTH}
              </p>
            </div>

            <Textarea
              className="scrollbar-w-2 scrollbar-thumb-rounded scrollbar-thumb h-12 resize-none text-sm"
              {...register('addBio')}
              placeholder="What name do you want to display on profile ?"
            />
          </div>{' '}
          <div className="mt-2 pl-0.5">
            <Drawer>
              <DrawerTrigger
                className={buttonVariants({
                  className: 'mt-4 h-auto p-0 py-0 text-blue-600',
                  variant: 'link',
                })}
                type="button"
              >
                + Add {(watch('skill')?.length ?? 0) > 0 ? 'more' : ''} Skills
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader className="text-left">
                  <DrawerTitle>Add skill</DrawerTitle>
                  {/* <DrawerDescription>This action cannot be undone.</DrawerDescription> */}
                </DrawerHeader>
                <div>
                  <Input {...register('skill')} />
                </div>
                <DrawerFooter>
                  <Button>Submit</Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </form>
      </div>
    </main>
  )
}
