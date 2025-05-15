import { LogoAnimated } from '@/assets/icons/logo-animated'

/**
 * Renders a splash screen component with a logo animation.
 * @return {JSX.Element} The splash screen component.
 * @see LogoAnimated
 */
export function Splash() {
  return (
    <div className="absolute inset-0 -z-40 flex items-center justify-center animate-in fade-in zoom-in">
      <LogoAnimated className={'h-36'} isActive={true} />
    </div>
  )
}
