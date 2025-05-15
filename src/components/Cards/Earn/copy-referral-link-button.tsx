'use client'

import { useState } from 'react'
import CopyBox from '@/components/Icons/Copy'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'

export default function CopyReferralLinkButton({ referralLink }: { referralLink: string }) {
  const [isCopied, setIsCopied] = useState<boolean>(false)
  function handleClick() {
    navigator.clipboard.writeText(referralLink).then(() => setIsCopied(true))
    setTimeout(() => {
      setIsCopied(false)
    }, 3000)
  }
  return (
    <Button
      className={cn('h-[2.3rem] w-full gap-2 max-[370px]:text-xs', {
        'border-green-400 bg-muted text-green-400': isCopied,
      })}
      variant={'outline'}
      size={'sm'}
      onClick={handleClick}
    >
      {isCopied ? (
        <p>Copied!</p>
      ) : (
        <>
          <CopyBox className="h-4 w-4" />
          <p>Referral Link</p>
        </>
      )}
    </Button>
  )
}
