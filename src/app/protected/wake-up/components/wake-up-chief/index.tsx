'use client'

import { animated, useScroll, useSpring } from '@react-spring/web'
import { UserMetadata } from '@supabase/supabase-js'
import { ChevronsUp } from 'lucide-react'
import Image from 'next/image'
import { lazy, useEffect, useRef, useState } from 'react'
import { redirect } from 'next/navigation'
import CheifDefault from '@/assets/images/tonville_chief_default.webp'
import { PlaceholderChief } from '@/components/Icons/PlaceholderChief'
import { getBrowserClient } from '@/lib/supabase/client'

const FlyingZs = lazy(() => import('@/components/background/flying-zs'))

const PAGE_COUNT = 5

export const WakeUpChief = () => {
  const containerRef = useRef<HTMLDivElement>(null!)
  const [userMetadata, setUserMetadata] = useState<UserMetadata | null>(null)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  useEffect(() => {
    const fetchUserMetadata = async () => {
      const { auth } = getBrowserClient()
      const { data } = await auth.getUser()
      const { user } = data
      if (user) {
        setUserMetadata(user.user_metadata)
      }
    }

    fetchUserMetadata()
  }, [])

  const [textStyles, textApi] = useSpring(() => ({
    y: '100%',
  }))

  const { scrollYProgress } = useScroll({
    container: containerRef,
    onChange: ({ value: { scrollYProgress } }) => {
      if (scrollYProgress > 0.7) {
        textApi.start({ y: '0' })
      } else {
        textApi.start({ y: '100%' })
      }
      if (scrollYProgress === 1) {
        setTimeout(() => {
          redirect('/protected/core')
        }, 1000)
      }
    },
    default: {
      immediate: true,
    },
  })

  // Add rotation spring animation
  const rotationStyles = useSpring({
    rotate: scrollYProgress.to([0, 1], [0, 360]), // Rotate the image 0 to 360 degrees as scroll progresses
  })

  // Add saturation, brightness, and hue-rotate spring animations
  const imageFilterStyles = useSpring({
    filter: scrollYProgress.to(
      (val) => `
        grayscale(${1 - val})
        brightness(${25 + val * 75}%)`
    ),
  })

  // Add image size scale spring animation
  const imageScaleStyles = useSpring({
    scale: scrollYProgress.to([0, 1], [0.75, 1]), // Scale the image from 50% to 100% as scroll progresses
  })

  // Add clipPath spring animation for the Div component
  const clipPathStyles = useSpring({
    clipPath: scrollYProgress.to((val) => `circle(${val * 100}%)`), // Clip the div from 0% to 100% as scroll progresses
  })

  // Pulse animation for the swipe up indicator
  const swipeUpStyles = useSpring({
    opacity: scrollYProgress.to([0, 0.5], [1, 0]), // Fade out the indicator as the user scrolls up
    transform: scrollYProgress.to([0, 0.5], ['translateY(0px)', 'translateY(-24px)']), // Move it down slightly while fading out
    config: { tension: 120, friction: 14 },
  })

  return (
    <animated.div
      ref={containerRef}
      className={'absolute h-full w-full overflow-y-scroll animate-in fade-in'}
    >
      <div className={'pointer-events-none fixed inset-0 z-0 h-full w-full'}>
        <div className="pointer-events-none fixed inset-0 left-0 top-0 -z-10 flex h-full w-full items-center justify-center bg-gradient-to-br from-[#466689] via-black to-[#9e2b33] grayscale" />

        {/* FlyingZs will only be rendered after the image is fully loaded */}
        {isImageLoaded && <FlyingZs />}

        <animated.div
          className="pointer-events-none fixed inset-0 left-0 top-0 flex h-full w-full items-center justify-center bg-gradient-to-br from-[#466689] via-black to-[#9e2b33]"
          style={{
            clipPath: clipPathStyles.clipPath,
          }}
        >
          <h2 className="fixed bottom-20 left-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-5xl leading-8">
            <animated.span style={textStyles}>
              <span
                className={
                  'bg-gradient-to-l from-white via-slate-400 to-white bg-clip-text font-extralight text-transparent'
                }
              >
                {userMetadata?.first_name}
              </span>
              <br />
              <span
                className={
                  'animate-pulse bg-gradient-to-l from-slate-400 via-white to-slate-400 bg-clip-text font-black text-transparent'
                }
              >
                awakening!
              </span>
            </animated.span>
          </h2>
        </animated.div>
        <animated.div
          className="pointer-events-none fixed inset-0 left-0 top-0 flex h-full w-full items-center justify-center"
          style={{
            rotate: rotationStyles.rotate,
            filter: imageFilterStyles.filter,
            scale: imageScaleStyles.scale,
          }}
        >
          <PlaceholderChief className={'absolute -z-10 h-[256px] w-[256px] rounded-full border'} />
          <Image
            src={userMetadata?.avatar_src ?? CheifDefault.src}
            alt={userMetadata?.first_name ?? 'Tonville_cheif_default'}
            width={256}
            height={256}
            className={'rounded-full border'}
            onLoadingComplete={() => setIsImageLoaded(true)} // Set image loaded to true when image is fully loaded
          />
        </animated.div>

        {/* Swipe up indicator */}
        <animated.div
          className="fixed bottom-10 flex w-full animate-bounce flex-col items-center gap-2"
          style={swipeUpStyles}
        >
          <ChevronsUp className="h-8 w-8 animate-pulse" />
          <p className="animate-pulse text-sm uppercase text-white">Wake up!</p>
        </animated.div>
      </div>
      {new Array(PAGE_COUNT).fill(null).map((_, index) => (
        <div className={'h-screen w-screen'} key={index} />
      ))}
    </animated.div>
  )
}
