"use client"
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useAnimationControls } from 'motion/react'
import { Icon } from './Icon'

type CarouselProps = {
  items: ReactNode[]
  visibleItems?: number
  autoScroll?: boolean
}

const MAX_VISIBLE_DOTS = 10

function Carousel({ items, visibleItems = 1, autoScroll = false }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [dotDirection, setDotDirection] = useState(1)
  const carouselRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()
  const dotControls = useAnimationControls()

  const maxIndex = Math.max(0, items.length - visibleItems)
  const targetX = `-${index * (visibleItems / items.length) * 100}%`
  const visibleDotCount = Math.min(MAX_VISIBLE_DOTS, items.length)
  const dotStart = Math.min(
    Math.max(0, index - Math.floor(visibleDotCount / 2)),
    Math.max(0, items.length - visibleDotCount),
  )
  const previousDotStartRef = useRef(dotStart)
  const visibleDotIndexes = Array.from(
    { length: visibleDotCount },
    (_, dotOffset) => dotStart + dotOffset,
  )
  const hasPreviousDots = dotStart > 0
  const hasNextDots = dotStart + visibleDotCount < items.length

  const setCarouselIndex = useCallback((nextIndex: number) => {
    setDotDirection(nextIndex >= index ? 1 : -1)
    setIndex(nextIndex)
  }, [index])

  const goToPrev = () => setCarouselIndex(Math.max(0, index - 1))
  const goToNext = () => setCarouselIndex(Math.min(maxIndex, index + 1))

  useEffect(() => {
    controls.start({ x: targetX })
  }, [controls, targetX])

  useEffect(() => {
    if (previousDotStartRef.current === dotStart) return

    previousDotStartRef.current = dotStart
    dotControls.set({ x: dotDirection * 24 })
    dotControls.start({
      x: 0,
      transition: { duration: 0.35, ease: 'easeOut' },
    })
  }, [dotControls, dotDirection, dotStart])

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 },
    )

    observer.observe(carousel)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!autoScroll || !isInView || isHovered || maxIndex === 0) return

    const timeout = window.setTimeout(() => {
      setCarouselIndex(index >= maxIndex ? 0 : index + 1)
    }, 5000)

    return () => window.clearTimeout(timeout)
  }, [autoScroll, isInView, isHovered, maxIndex, index, setCarouselIndex])

  return (
    <div
      ref={carouselRef}
      className="w-full max-w-4xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={viewportRef} className="aspect-3/4 overflow-hidden md:aspect-video">
        <div className="gap-3 h-full overflow-hidden">
          <motion.div
            className="flex h-full lg:cursor-default sm:cursor-grab touch-pan-y active:cursor-grabbing"
            animate={controls}
            transition={{ type: 'spring', stiffness: 180, damping: 24 }}
            drag="x"
            dragConstraints={viewportRef}
            dragDirectionLock
            dragMomentum={false}
            dragElastic={0}
            onDragEnd={(_, info) => {
              const nextIndex =
                Math.abs(info.offset.x) < 40
                  ? index
                  : info.offset.x < 0
                    ? Math.min(maxIndex, index + 1)
                    : Math.max(0, index - 1)

              setCarouselIndex(nextIndex)
              controls.start({ x: `-${nextIndex * (visibleItems / items.length) * 100}%` })
            }}
            style={{ width: `${(items.length / visibleItems) * 100}%` }}
          >
            {items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="shrink-0 box-border"
                style={{ width: `${100 / items.length}%` }}
              >
                {item}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="relative mt-4 flex min-h-10 items-center justify-center text-sm text-slate-300">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={goToPrev}
          disabled={index === 0}
          className="absolute left-0 rounded-full px-3 py-1.5 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Icon name="chevronLeft" size={20} aria-hidden="true" />
        </button>

        <div className="relative flex max-w-full items-center overflow-hidden px-3">
          <motion.span
            aria-hidden="true"
            animate={{ opacity: hasPreviousDots ? 1 : 0 }}
            className="from-background via-background/90 pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r to-transparent sm:w-10"
            initial={false}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
          <motion.div
            animate={dotControls}
            className="flex items-center gap-1.5 sm:gap-2"
          >
            {visibleDotIndexes.map((dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                aria-label={`Go to slide ${dotIndex + 1}`}
                onClick={() => setCarouselIndex(Math.min(dotIndex, maxIndex))}
                className={`h-1.5 rounded-full transition-all sm:h-2.5 ${index === dotIndex ? 'w-4 bg-white sm:w-6' : 'w-1.5 bg-white/30 hover:bg-white/60 sm:w-2.5'}`}
              />
            ))}
          </motion.div>
          <motion.span
            aria-hidden="true"
            animate={{ opacity: hasNextDots ? 1 : 0 }}
            className="from-background via-background/90 pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l to-transparent sm:w-10"
            initial={false}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>

        <button
          type="button"
          aria-label="Next slide"
          onClick={goToNext}
          disabled={index >= maxIndex}
          className="absolute right-0 rounded-full px-3 py-1.5 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Icon name="chevronRight" size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default Carousel
