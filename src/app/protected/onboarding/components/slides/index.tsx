'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, SkipForward } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Slide1 from '@/assets/images/slide-1.webp'
import Slide2 from '@/assets/images/slide-2.webp'
import Slide3 from '@/assets/images/slide-3.webp'
import { Button } from '@/components/ui/button'

const slides = [
  {
    title: 'Join Tribe',
    content: 'Powerful tribesmen comes from powerful tribes!',
    image: Slide1,
  },
  {
    title: 'Create Tribe',
    content: 'Powerful chiefs make tribes powerful!',
    image: Slide2,
  },
  {
    title: 'Earn Gems',
    content: 'Earn gems and climb the leaderboard!',
    image: Slide3,
  },
]

export default function SlidesPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [routing, setRouting] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Prefetch the wake-up page
    router.prefetch('/protected/wake-up') // Prefetch the target page

    // Prefetch all images
    const preloadImages = () => {
      return Promise.all(
        slides.map((slide) => {
          return new Promise<void>((resolve, reject) => {
            if (typeof window === 'undefined') return resolve()

            const imgElement: HTMLImageElement = document.createElement('img')

            imgElement.onload = () => resolve()
            imgElement.onerror = () => reject()
            imgElement.src = slide.image.src
          })
        })
      )
    }

    preloadImages().catch((error) => {
      console.error('Failed to preload some images:', error)
    })
  }, [router])

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      setRouting(true)
      router.push('/protected/wake-up')
    } else {
      setCurrentSlide((prev) => prev + 1)
    }
  }

  const skipSlides = () => {
    router.push('/protected/core') // TODO: Replace with '/protected/wake-up' with your desired route
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex flex-col justify-between"
        >
          <Image
            src={slides[currentSlide].image}
            alt={`${slides[currentSlide].title}'s Slide`}
            fill
            className={`object-cover`}
            placeholder="blur" // Enable blur-up
            blurDataURL={slides[currentSlide].image.blurDataURL}
          />
          {/* <div className="absolute inset-0 bg-black bg-opacity-50" /> */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="z-10 p-8">
            <Button
              loading={routing}
              variant="ghost"
              size="sm"
              onClick={skipSlides}
              className="float-right text-white hover:bg-white/20"
            >
              Skip <SkipForward className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="z-10 flex flex-grow flex-col justify-end px-8 pb-32 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">{slides[currentSlide].title}</h2>
            <p className="text-xl text-white">{slides[currentSlide].content}</p>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 transform space-x-2">
        {slides.map((_, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            onClick={() => setCurrentSlide(index)}
            className={`h-3 w-3 rounded-full p-0 ${
              currentSlide === index ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
            }`}
          >
            <span className="sr-only">Slide {index + 1}</span>
          </Button>
        ))}
      </div>
      <div className="absolute bottom-8 left-1/2 z-20 flex w-full -translate-x-1/2 transform justify-center">
        <Button
          loading={routing}
          variant="outline"
          size="lg"
          onClick={nextSlide}
          className="w-5/6 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}{' '}
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
