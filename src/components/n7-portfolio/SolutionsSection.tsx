import type { SolutionItem } from '../constants/sectionData'
import { ArrowRight } from 'lucide-react'
import { motion, type Variants } from 'motion/react'

type SolutionsSectionProps = {
  solutions: SolutionItem[]
  onLearnMore: (item: string) => void
  onRequestDemo: () => void
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } }
}

export default function SolutionsSection({ solutions, onLearnMore, onRequestDemo }: SolutionsSectionProps) {
  return (
    <section className="bg-[#000D12] pt-24 pb-32 relative">
      <div className="max-w-[1200px] mx-auto px-8 grid md:grid-cols-12 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="md:col-span-4 space-y-8"
        >
          <h2 className="text-3xl md:text-[34px] font-light text-white leading-[1.2] tracking-tight">
            All of our solutions are<br />
            tailor-made to your needs
          </h2>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onRequestDemo}
            className="cta-gradient text-white font-medium px-6 py-3 rounded-md text-[11px] uppercase tracking-[0.2em] shadow-lg"
          >
            Request Demo
          </motion.button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="md:col-span-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12"
        >
          {solutions.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="relative space-y-4 group cursor-pointer rounded-xl -m-3 p-3 transition-colors duration-300 hover:bg-white/[0.03]"
            >
              {item.tag && (
                <span className="absolute top-3 right-3 text-[9px] tracking-[0.2em] text-white/40 font-medium uppercase">
                  {item.tag}
                </span>
              )}
              <img
                src={encodeURI(item.icon)}
                alt=""
                className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-110"
              />
              <h3 className="text-base font-medium text-white leading-snug">{item.title}</h3>
              <p className="text-white/50 text-[12.5px] leading-relaxed font-light">
                {item.desc}
              </p>
              <button
                onClick={() => onLearnMore(item.title)}
                className="flex items-center gap-1.5 text-[10px] text-[#5BC2E7] group-hover:text-white uppercase tracking-[0.18em] font-medium transition-colors"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
