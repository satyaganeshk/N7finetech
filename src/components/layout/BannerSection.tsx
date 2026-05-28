import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'

type BannerSectionProps = {
  onRequestDemo: () => void
  onContact?: () => void
  background?: 'CB7' | 'N7'
}

const backgroundSrc: Record<'CB7' | 'N7', string> = {
  CB7: '/CB7full.png',
  N7: '/N7.png'
}

export function CtaBanner({ onRequestDemo, onContact, background }: BannerSectionProps) {
  return (
    <section
      className="relative overflow-hidden rounded-3xl mx-4 md:mx-8 lg:mx-12 my-6 border border-white/[0.04]"
      style={{
        background:
          'radial-gradient(120% 90% at 75% 50%, rgba(0,82,255,0.06) 0%, transparent 55%), linear-gradient(180deg, #0E1218 0%, #0A0D13 100%)'
      }}
    >
      {background && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.65, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center justify-end pr-4 md:pr-12 lg:pr-20 pointer-events-none select-none"
        >
          <img loading="lazy" decoding="async"
            src={backgroundSrc[background]}
            alt=""
            className="w-[760px] max-w-[60%] h-auto object-contain"
          />
        </motion.div>
      )}

      <div className="relative max-w-[1280px] mx-auto px-10 md:px-14 py-28 md:py-36 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-4"
        >
          <h2 className="text-3xl md:text-[44px] font-light text-white leading-[1.15] tracking-tight">
            Take the full advantage of<br />
            going paper-less now.
          </h2>
          <p className="text-white/55 text-[15px] leading-relaxed font-light max-w-md pt-1">
            N7 helps your financial institution improve the client experience, automate and optimize procedures, simplify back-office operations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          className="flex gap-3 md:justify-end"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onContact}
            className="border border-white/30 hover:border-white text-white text-[11px] font-medium uppercase tracking-[0.18em] px-6 py-3 rounded-md transition-all flex items-center gap-2"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-3 h-3" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onRequestDemo}
            className="cta-gradient text-white text-[11px] font-medium uppercase tracking-[0.18em] px-6 py-3 rounded-md shadow-lg"
          >
            Request Demo
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export function CtaLightBanner({ onRequestDemo, onContact, background }: BannerSectionProps) {
  return <CtaBanner onRequestDemo={onRequestDemo} onContact={onContact} background={background} />
}
