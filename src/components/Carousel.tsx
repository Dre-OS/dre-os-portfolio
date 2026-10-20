"use client"
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useAnimationControls } from 'motion/react'
import { Icon } from './Icon'

type CarouselProps = {
  items: ReactNode[]
  visibleItems?: number
  autoScroll?: boolean
}

function Carousel({ items, visibleItems = 1, autoScroll = false }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const controls = useAnimationControls()

  const maxIndex = Math.max(0, items.length - visibleItems)
  const targetX = `-${index * (visibleItems / items.length) * 100}%`

  const goToPrev = () => setIndex((current) => Math.max(0, current - 1))
  const goToNext = () => setIndex((current) => Math.min(maxIndex, current + 1))

  useEffect(() => {
    controls.start({ x: targetX })
  }, [controls, targetX])

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
      setIndex((current) => (current >= maxIndex ? 0 : current + 1))
    }, 5000)

    return () => window.clearTimeout(timeout)
  }, [autoScroll, isInView, isHovered, maxIndex, index])

  return (
    <div
      ref={carouselRef}
      className="w-full max-w-3xl mx-auto"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div ref={viewportRef} className="aspect-video overflow-hidden">
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

              setIndex(nextIndex)
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

      <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-300">
        <button
          type="button"
          aria-label="Previous slide"
          onClick={goToPrev}
          disabled={index === 0}
          className="rounded-full px-3 py-1.5 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Icon name="chevronLeft" size={20} aria-hidden="true" />
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {items.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              aria-label={`Go to slide ${dotIndex + 1}`}
              onClick={() => setIndex(Math.min(dotIndex, maxIndex))}
              className={`h-1.5 rounded-full transition-all sm:h-2.5 ${index === dotIndex ? 'w-4 bg-white sm:w-6' : 'w-1.5 bg-white/30 hover:bg-white/60 sm:w-2.5'}`}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next slide"
          onClick={goToNext}
          disabled={index >= maxIndex}
          className="rounded-full px-3 py-1.5 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Icon name="chevronRight" size={20} aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}

export default Carousel
