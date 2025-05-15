import React from 'react'
import ApeProfile from '@/assets/images/mock/Ape_profile_pic_MOCK.jpeg'
import { AvatarFallback, AvatarImage, Avatar as AvatarWrapper } from '@/components/ui/avatar'
import { cn } from '@/lib/utils/cn'
/**
 * send in alt as user name
 * @returns
 */
const Avatar = ({
  fallbackTitle = 'TV',
  src = ApeProfile.src,
  AvtImageClassName,
  alt,
  avatarFallback,
}: {
  fallbackTitle?: string
  src?: string
  alt?: string
  AvtImageClassName?: string
  avatarFallback?:
    | {
        props: React.ComponentPropsWithoutRef<'span'>
      }
    | undefined
}) => {
  return (
    <AvatarWrapper className={AvtImageClassName}>
      <AvatarImage src={src} alt={`Profile picture of ${alt}`} className={cn('object-cover')} />
      <AvatarFallback {...avatarFallback?.props}>{fallbackTitle}</AvatarFallback>
    </AvatarWrapper>
  )
}

export default Avatar
