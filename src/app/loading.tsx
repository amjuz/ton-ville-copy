import { IconAnimated } from '@/assets/icons/icon-animated'

export default function Loading() {
  return (
    <div className="absolute inset-0 -z-40 flex items-center justify-center animate-in fade-in zoom-in">
      <IconAnimated className={'h-36'} isActive={true} />
    </div>
  )
}
