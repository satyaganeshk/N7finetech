import { useState } from 'react'
import { ArrowLeft, ArrowRight, Zap, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

type CaseStudy = {
  title: string
  client: string
  results: string
  desc: string
  category: string
}

type CaseStudiesProps = {
  caseStudies: CaseStudy[]
  activeIndex: number
  onPrev: () => void
  onNext: () => void
  onJumpTo: (index: number) => void
  onReadMore: (title: string) => void
  onViewAll?: () => void
}

function CaseCard({
  study,
  onReadMore
}: {
  study: CaseStudy
  onReadMore: (title: string) => void
}) {
  return (
    <div className="bg-[#0B131A] border border-white/5 rounded-2xl overflow-hidden h-full grid md:grid-cols-2 gap-0">
      <div className="bg-[#0A1A28] flex items-center justify-center p-8 min-h-[300px]">
        <img
          src="/Transistion.png"
          alt=""
          className="w-full max-w-[320px] h-auto object-contain"
        />
      </div>
      <div className="p-8 md:p-10 flex flex-col">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#5BC2E7] font-medium">
          Getting Started
        </p>
        <h3 className="mt-5 text-2xl md:text-[32px] font-light text-white leading-[1.2]">
          {study.title}
        </h3>
        <div className="mt-5 flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white/80" fill="currentColor" strokeWidth={0} />
          </span>
          <span className="text-white/70 text-[15px] font-light">{study.client}</span>
        </div>
        <div className="mt-auto pt-8">
          <button
            onClick={() => onReadMore(study.title)}
            className="w-full border border-white/15 hover:border-[#5BC2E7] text-white/70 hover:text-white text-[10px] uppercase tracking-[0.22em] font-medium px-6 py-3 rounded transition-colors"
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CaseStudies({
  caseStudies,
  activeIndex,
  onPrev,
  onNext,
  onJumpTo,
  onReadMore,
  onViewAll
}: CaseStudiesProps) {
  const [showAll, setShowAll] = useState(false)
  const len = caseStudies.length

  const handleViewAll = () => {
    setShowAll(true)
    onViewAll?.()
  }

  const handleSelectFromModal = (idx: number) => {
    onJumpTo(idx)
    setShowAll(false)
  }

  const wrappedOffset = (idx: number) => {
    let offset = idx - activeIndex
    if (offset > len / 2) offset -= len
    if (offset < -len / 2) offset += len
    return offset
  }

  return (
    <section className="bg-[#000D12] py-24 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-8 space-y-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-3xl md:text-[40px] font-light text-white text-center tracking-tight"
        >
          Our Case Studies
        </motion.h2>

        <div className="relative max-w-[1040px] mx-auto h-[440px] md:h-[480px]">
          {caseStudies.map((study, idx) => {
            const offset = wrappedOffset(idx)
            const isActive = offset === 0
            const isVisible = Math.abs(offset) <= 1

            return (
              <motion.div
                key={idx}
                className="absolute inset-0"
                initial={false}
                animate={{
                  x: `${offset * 8}%`,
                  scale: isActive ? 1 : 0.92,
                  opacity: isVisible ? (isActive ? 1 : 0.35) : 0,
                  filter: isActive ? 'blur(0px)' : 'blur(2px)'
                }}
                style={{
                  zIndex: isActive ? 10 : 5 - Math.abs(offset),
                  pointerEvents: isActive ? 'auto' : 'none'
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <CaseCard study={study} onReadMore={onReadMore} />
              </motion.div>
            )
          })}
        </div>

        <div className="grid grid-cols-3 items-center max-w-[1040px] mx-auto pt-2">
          <div />
          <div className="flex items-center justify-center gap-5">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={onPrev}
              className="w-11 h-11 rounded-full border border-[#5BC2E7]/60 hover:border-[#5BC2E7] text-[#5BC2E7] flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </motion.button>
            <div className="flex items-center gap-2">
              {caseStudies.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => onJumpTo(idx)}
                  aria-label={`Go to case study ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeIndex ? 'w-10 bg-[#5BC2E7]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={onNext}
              className="w-11 h-11 rounded-full border border-[#5BC2E7]/60 hover:border-[#5BC2E7] text-[#5BC2E7] flex items-center justify-center transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          <button
            onClick={handleViewAll}
            className="group inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-medium transition-colors"
          >
            <span className="text-[#5BC2E7] underline underline-offset-[6px] decoration-[#5BC2E7] group-hover:text-white group-hover:decoration-white transition-colors">
              View All
            </span>
            <ArrowRight className="w-3.5 h-3.5 text-[#5BC2E7] group-hover:text-white group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showAll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowAll(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#0B131A] border border-white/10 rounded-2xl w-full max-w-[1100px] max-h-[85vh] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#5BC2E7] font-medium">All Case Studies</p>
                  <h3 className="mt-2 text-xl md:text-[26px] font-light text-white tracking-tight">
                    {caseStudies.length} stories from our clients
                  </h3>
                </div>
                <button
                  onClick={() => setShowAll(false)}
                  aria-label="Close"
                  className="w-10 h-10 rounded-full border border-white/15 hover:border-white/40 text-white/70 hover:text-white flex items-center justify-center transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto p-6 md:p-8 grid sm:grid-cols-2 gap-5">
                {caseStudies.map((study, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.35, ease: 'easeOut' }}
                    whileHover={{ y: -4, borderColor: 'rgba(91,194,231,0.5)' }}
                    onClick={() => handleSelectFromModal(idx)}
                    className="text-left bg-[#0A1A28] border border-white/5 rounded-xl p-5 flex gap-4 items-start transition-colors group"
                  >
                    <div className="w-16 h-16 rounded-lg bg-[#0B131A] flex items-center justify-center shrink-0">
                      <img
                        src="/Transistion.png"
                        alt=""
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <div className="space-y-2 min-w-0">
                      <p className="text-[9px] uppercase tracking-[0.22em] text-[#5BC2E7] font-medium">
                        {study.category}
                      </p>
                      <h4 className="text-[15px] font-light text-white leading-snug">
                        {study.title}
                      </h4>
                      <div className="flex items-center gap-2 pt-1">
                        <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                          <Zap className="w-2.5 h-2.5 text-white/80" fill="currentColor" strokeWidth={0} />
                        </span>
                        <span className="text-white/60 text-[12px] font-light">{study.client}</span>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-white/30 group-hover:text-[#5BC2E7] group-hover:translate-x-1 transition-all shrink-0 mt-1" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
