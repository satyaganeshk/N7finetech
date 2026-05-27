import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll } from 'motion/react'
import { ArrowUp } from 'lucide-react'

type ScrollToTopProps = {
  isDark: boolean
}

export default function ScrollToTop({ isDark }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }
    toggleVisibility()
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className={`fixed bottom-8 right-8 z-[100] p-4 rounded-full shadow-2xl flex items-center justify-center group ${
            isDark
              ? 'bg-zinc-900 border border-white/10 text-white'
              : 'bg-white border border-black/5 text-zinc-900'
          }`}
        >
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <motion.circle
              cx="50%"
              cy="50%"
              r="48%"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              style={{ pathLength: scrollYProgress }}
            />
          </svg>
          <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
