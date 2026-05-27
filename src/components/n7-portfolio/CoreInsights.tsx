import { useState } from 'react'
import { ArrowRight, X } from 'lucide-react'
import { motion, AnimatePresence, type Variants } from 'motion/react'

type CoreInsightsProps = {
  onSeeAll: () => void
  onReadArticle: (slug: string) => void
  background?: 'CB7' | 'N7'
}

const backgroundSrc: Record<'CB7' | 'N7', string> = {
  CB7: '/CB7full.png',
  N7: '/N7.png'
}

type Article = {
  tag: string
  title: string
  author: string
  date: string
}

const articles: Article[] = [
  {
    tag: 'Getting Started',
    title: 'How to transition from a traditional to a digital bank',
    author: 'David Grohl',
    date: '17/08/24'
  },
  {
    tag: 'Getting Started',
    title: 'How to transition from a traditional to a digital bank',
    author: 'David Grohl',
    date: '17/08/24'
  },
  {
    tag: 'Getting Started',
    title: 'How to transition from a traditional to a digital bank',
    author: 'David Grohl',
    date: '17/08/24'
  }
]

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

function ArticleBody({ article, onReadArticle }: { article: Article; onReadArticle: (slug: string) => void }) {
  return (
    <div className="flex flex-col h-full gap-6">
      <div className="space-y-4">
        <p className="text-[10px] uppercase tracking-[0.22em] text-[#5BC2E7] font-medium">{article.tag}</p>
        <h3 className="text-xl md:text-[22px] font-light text-white leading-[1.25]">{article.title}</h3>
        <div className="flex items-center gap-4 text-[12px] text-white/45 font-light">
          <span>{article.author}</span>
          <span>{article.date}</span>
        </div>
      </div>
      <div className="mt-auto pt-4">
        <button
          onClick={() => onReadArticle(article.title)}
          className="border border-white/15 hover:border-[#5BC2E7] text-white/70 hover:text-white text-[10px] uppercase tracking-[0.22em] font-medium px-6 py-2.5 rounded transition-colors w-full md:w-auto"
        >
          Read More
        </button>
      </div>
    </div>
  )
}

export default function CoreInsights({ onSeeAll, onReadArticle, background }: CoreInsightsProps) {
  const [showAll, setShowAll] = useState(false)
  const [featured, ...rest] = articles

  const handleSeeAll = () => {
    setShowAll(true)
    onSeeAll()
  }

  const handleSelectFromModal = (title: string) => {
    setShowAll(false)
    onReadArticle(title)
  }

  return (
    <section id="insights" className="relative bg-[#000D12] py-24 overflow-hidden">
      {background && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        >
          <img
            src={backgroundSrc[background]}
            alt=""
            className="w-[700px] max-w-full h-auto object-contain"
          />
        </motion.div>
      )}
      <div className="relative max-w-[1280px] mx-auto px-8 grid md:grid-cols-12 gap-x-12 gap-y-10">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="md:col-span-4 space-y-8"
        >
          <h2 className="text-3xl md:text-[34px] font-light text-white leading-[1.2] tracking-tight">
            Get yourself up-to-speed on all the things happening in fintech
          </h2>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={onSeeAll}
            className="border border-white/20 hover:border-white text-white font-medium px-7 py-3 rounded text-[11px] uppercase tracking-[0.22em] transition-colors"
          >
            Insights
          </motion.button>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="md:col-span-8 flex flex-col gap-6"
        >
          <motion.article
            variants={cardVariants}
            whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.12)' }}
            className="grid md:grid-cols-2 gap-0 bg-[#0B131A] border border-white/5 rounded-2xl overflow-hidden transition-colors"
          >
            <div className="bg-[#0A1A28] flex items-center justify-center p-8 min-h-[260px]">
              <img
                src="/Transistion.png"
                alt=""
                className="w-full max-w-[280px] h-auto object-contain"
              />
            </div>
            <div className="p-8">
              <ArticleBody article={featured} onReadArticle={onReadArticle} />
            </div>
          </motion.article>

          <div className="grid md:grid-cols-2 gap-6">
            {rest.map((article, idx) => (
              <motion.article
                key={idx}
                variants={cardVariants}
                whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.12)' }}
                className="bg-[#0B131A] border border-white/5 rounded-2xl p-8 transition-colors"
              >
                <ArticleBody article={article} onReadArticle={onReadArticle} />
              </motion.article>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSeeAll}
              className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-medium transition-colors"
            >
              <span className="text-[#5BC2E7] underline underline-offset-[6px] decoration-[#5BC2E7] group-hover:text-white group-hover:decoration-white transition-colors">Read</span>
              <span className="text-white/70 group-hover:text-white transition-colors">All Insights</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#5BC2E7] group-hover:text-white group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </motion.div>
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
                  <p className="text-[10px] uppercase tracking-[0.22em] text-[#5BC2E7] font-medium">All Insights</p>
                  <h3 className="mt-2 text-xl md:text-[26px] font-light text-white tracking-tight">
                    {articles.length} stories on what's happening in fintech
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
                {articles.map((article, idx) => (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.35, ease: 'easeOut' }}
                    whileHover={{ y: -4, borderColor: 'rgba(91,194,231,0.5)' }}
                    onClick={() => handleSelectFromModal(article.title)}
                    className="text-left bg-[#0A1A28] border border-white/5 rounded-xl p-5 flex gap-4 items-start transition-colors group"
                  >
                    <div className="w-16 h-16 rounded-lg bg-[#0B131A] flex items-center justify-center shrink-0">
                      <img
                        src="/Transistion.png"
                        alt=""
                        className="w-12 h-12 object-contain"
                      />
                    </div>
                    <div className="space-y-2 min-w-0 flex-1">
                      <p className="text-[9px] uppercase tracking-[0.22em] text-[#5BC2E7] font-medium">
                        {article.tag}
                      </p>
                      <h4 className="text-[15px] font-light text-white leading-snug">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-3 pt-1 text-[12px] text-white/55 font-light">
                        <span>{article.author}</span>
                        <span>{article.date}</span>
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
