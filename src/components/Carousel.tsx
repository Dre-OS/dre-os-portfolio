import { useState, type ReactNode } from 'react'
import { motion } from 'motion/react'

type CarouselProps<T> = {
  items: T[]
  renderItem: (item: T, index: number) => ReactNode
  getKey?: (item: T, index: number) => string | number
  visibleItems?: number
}

function Carousel<T>({
  items,
  renderItem,
  getKey,
  visibleItems = 1,
}: CarouselProps<T>) {
  const [index, setIndex] = useState(0)

  const maxIndex = Math.max(0, items.length - visibleItems)

  const goToPrev = () => setIndex((current) => Math.max(0, current - 1))
  const goToNext = () => setIndex((current) => Math.min(maxIndex, current + 1))

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
        <motion.div
          className="flex"
          animate={{ x: `-${index * (100 / visibleItems)}%` }}
          transition={{ type: 'spring', stiffness: 180, damping: 24 }}
          style={{ width: `${(items.length / visibleItems) * 100}%` }}
        >
          {items.map((item, itemIndex) => (
            <div
              key={getKey ? getKey(item, itemIndex) : itemIndex}
              className="shrink-0 px-2 py-3"
              style={{ width: `${100 / items.length}%` }}
            >
              {renderItem(item, itemIndex)}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 text-sm text-slate-300">
        <button
          type="button"
          onClick={goToPrev}
          disabled={index === 0}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Prev
        </button>

        <div className="flex items-center gap-2">
          {items.map((_, dotIndex) => (
            <button
              key={dotIndex}
              type="button"
              aria-label={`Go to slide ${dotIndex + 1}`}
              onClick={() => setIndex(Math.min(dotIndex, maxIndex))}
              className={`h-2.5 rounded-full transition-all ${
                index === dotIndex ? 'w-6 bg-white' : 'w-2.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goToNext}
          disabled={index >= maxIndex}
          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Carousel