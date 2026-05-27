import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, 
  Bell, 
  Send, 
  Plus, 
  Grid, 
  ArrowUpRight, 
  X,
  ShieldCheck,
  Info
} from 'lucide-react'

// --- Asset Path Configurations ---
// (Define these as strings so they compile immediately, while referencing your local files)
const heroImg = './hero.png'
const heroside1Img = './heroside1.png'
const heroside2Img = './heroside2.png'

const logoShells = './companiesVectors/Vector.png'
const logoSmartFinder = './companiesVectors/Vector (1).png'
const logoZoomerr = './companiesVectors/Vector (2).png'
const logoArtVenue = './companiesVectors/Group 45.png'
const logoKontrastr = './companiesVectors/Group 46.png'
const logoWavesMarathon = './companiesVectors/Group 47.png'

type HeroSectionProps = {
  onRequestDemo: () => void
  onStartNow: () => void
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
  }
}

const trustedLogos = [
  { name: 'SHELLS', src: logoShells },
  { name: 'SmartFinder', src: logoSmartFinder },
  { name: 'Zoomerr', src: logoZoomerr },
  { name: 'ArtVenue', src: logoArtVenue },
  { name: 'kontrastr', src: logoKontrastr },
  { name: 'WAVESMARATHON', src: logoWavesMarathon }
]

export default function HeroSection({ onRequestDemo, onStartNow }: HeroSectionProps) {
  // --- Simulated Interactive State ---
  const [balance, setBalance] = useState(42295.00)
  const [activeRange, setActiveRange] = useState('This Week')
  const [transactions, setTransactions] = useState([
    { id: 1, name: 'To Jin', category: 'Work', date: '12 Jun 2022', amount: -59.00, type: 'send' },
    { id: 2, name: 'Stripe Payout', category: 'Freelance', date: '10 Jun 2022', amount: 1250.00, type: 'receive' }
  ])

  // --- Modal States ---
  const [activeModal, setActiveModal] = useState<null | 'transfer' | 'add' | 'more'>(null)
  const [transferTarget, setTransferTarget] = useState('')
  const [transferAmount, setTransferAmount] = useState('')
  const [depositAmount, setDepositAmount] = useState('')

  // --- Image Fallback States (Ensures preview looks stellar even if local images are absent) ---
  const [heroFailed, setHeroFailed] = useState(false)
  const [side1Failed, setSide1Failed] = useState(false)
  const [side2Failed, setSide2Failed] = useState(false)
  const [logoFailures, setLogoFailures] = useState<Record<string, boolean>>({})

  const handleLogoError = (name: string) => {
    setLogoFailures(prev => ({ ...prev, [name]: true }))
  }

  // --- Simulation Handlers ---
  const handleTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amt = parseFloat(transferAmount)
    if (!amt || amt <= 0 || !transferTarget) return
    
    if (amt > balance) {
      alert("Insufficient funds.")
      return
    }

    setBalance(prev => prev - amt)
    setTransactions(prev => [
      {
        id: Date.now(),
        name: `To ${transferTarget}`,
        category: 'Work',
        date: 'Today',
        amount: -amt,
        type: 'send'
      },
      ...prev
    ])
    setTransferAmount('')
    setTransferTarget('')
    setActiveModal(null)
  }

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const amt = parseFloat(depositAmount)
    if (!amt || amt <= 0) return

    setBalance(prev => prev + amt)
    setTransactions(prev => [
      {
        id: Date.now(),
        name: 'Deposit',
        category: 'Personal',
        date: 'Today',
        amount: amt,
        type: 'receive'
      },
      ...prev
    ])
    setDepositAmount('')
    setActiveModal(null)
  }

  return (
    <section className="relative bg-[#000D12] pt-36 pb-32 overflow-hidden min-h-screen flex flex-col justify-center">
      {/* Dynamic Background Glowing Orbs */}
      <div 
  className="absolute top-1/2 left-4/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-[550px] h-[550px] rounded-full filter blur-[120px] opacity-50 z-0"
  style={{
    background:
      'radial-gradient(circle, rgba(0,212,255,1) 0%, rgba(0,114,255,0.95) 35%, rgba(0,58,206,0.8) 60%, transparent 100%)',
  }}
/>

      <div className="max-w-[1280px] mx-auto px-10 grid lg:grid-cols-2 gap-72 items-center relative z-10 w-full">
        
        {/* Left Column: Typography & CTAs */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="space-y-9"
        >
          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-[54px] font-normal leading-[1.08] text-white tracking-[-0.02em]"
          >
            The new foundation<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              of modern banking
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-white/60 text-[15px] leading-relaxed max-w-md font-light"
          >
            We drive innovation and growth, provide seamless customer experience and operational excellence with high-performance glassmorphic designs.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onRequestDemo}
              className="bg-gradient-to-r from-[#00B4FD] to-[#003ACE] hover:shadow-lg hover:shadow-cyan-500/10 text-white font-medium px-8 py-4 rounded-xl text-[11px] uppercase tracking-[0.2em] transition-all"
            >
              Request Demo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onStartNow}
              className="border border-white/20 hover:border-white/50 text-white font-medium px-8 py-4 rounded-xl text-[11px] uppercase tracking-[0.2em] transition-all"
            >
              Contact Us
            </motion.button>
          </motion.div>

          {/* Trusted Brands Panel */}
          <motion.div variants={fadeUp} className="pt-16 space-y-5">
            <p className="text-[13px] font-normal text-white/50 tracking-wider uppercase">Trusted By:</p>
            <div
              className="flex flex-container items-center gap-3"
            >
              {trustedLogos.map((logo, idx) => (
                <motion.span
                  key={logo.name}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + idx * 0.06, duration: 0.4 }}
                  className="flex items-center gap-2 text-[10px] text-white/80 tracking-tight whitespace-nowrap"
                > 
                  {!logoFailures[logo.name] && (
                    <img
                      src={logo.src}
                      alt=""
                      onError={() => handleLogoError(logo.name)}
                      className="h-4 w-auto object-contain brightness-100"
                    />
                  )}
                  <span>{logo.name}</span>
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Visual Interactive Area */}
        <div className="relative h-[440px] md:h-[330px] w-full max-w-[440px] mx-auto lg:mx-0">
          
          {/* Subtle Ambient Blur behind the cards */}
          <div
            className="absolute pointer-events-none rounded-full"
            style={{
              background: 'linear-gradient(103.43deg, #00B4FD -1.02%, #003ACE 83.53%)',
              width: '100%',
              height: '100%',
              opacity: 0.4,
              filter: 'blur(80px)',
              top: '10%',
              left: '5%',
              transform: 'scale(0.85)'
            }}
          />

          {/* MAIN PHOTO FRAME */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[8%] top-[8%] w-[84%] aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.6)] border border-white/10"
          >
            {!heroFailed ? (
              <img
                src={heroImg}
                alt="Modern banking experience"
                className="w-full h-full object-cover"
                onError={() => setHeroFailed(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-tr from-[#01141c] via-[#022533] to-[#01141c] flex flex-col items-center justify-center p-8 text-center text-white/30">
                <p className="text-sm font-semibold tracking-widest uppercase mb-1">Interactive Sandbox Environment</p>
                <p className="text-xs max-w-xs text-white/50 font-light">Add your local image assets to replace this placeholder</p>
              </div>
            )}
            <div className="absolute inset-0 ring-1 ring-white/10 rounded-3xl pointer-events-none" />
          </motion.div>

          {/* FLOATING CARD 2: TONI KROSS ACCOUNT STATUS (TOP RIGHT) */}
          <motion.div
            initial={{ opacity: 0, y: 24, x: 24 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-[-12%] top-[-10%] w-[52%] z-20"
          >
            {!side2Failed ? (
              <img
                src={heroside2Img}
                alt="Toni Kross account card"
                className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.45)] cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                onError={() => setSide2Failed(true)}
                onClick={() => setActiveModal('more')}
              />
            ) : (
              // High-fidelity interactive glassmorphic rendering fallback
              <div className="w-full bg-white/90 backdrop-blur-xl border border-white/60 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] text-slate-800">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center font-bold text-[#002266] text-xs">TK</div>
                    <div>
                      <h4 className="text-xs md:text-sm font-bold text-slate-900 leading-tight">Toni Kross</h4>
                      <p className="text-[9px] text-slate-400 font-medium">Good Morning</p>
                    </div>
                  </div>
                  <button onClick={() => setActiveModal('more')} className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors">
                    <Bell className="w-3.5 h-3.5 text-slate-600" />
                  </button>
                </div>
                <div className="mb-4">
                  <p className="text-[9px] text-slate-400 uppercase tracking-wider font-semibold">Total balance</p>
                  <p className="text-lg md:text-[22px] font-extrabold text-[#002266] tracking-tight">
                    ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <button onClick={() => setActiveModal('transfer')} className="flex flex-col items-center p-2 rounded-xl bg-slate-100/70 hover:bg-slate-200/80 transition-colors">
                    <Send className="w-3.5 h-3.5 text-[#003ACE] rotate-45 mb-1" />
                    <span className="text-[8px] font-bold text-slate-600">Transfer</span>
                  </button>
                  <button onClick={() => setActiveModal('add')} className="flex flex-col items-center p-2 rounded-xl bg-slate-100/70 hover:bg-slate-200/80 transition-colors">
                    <Plus className="w-3.5 h-3.5 text-[#003ACE] mb-1" />
                    <span className="text-[8px] font-bold text-slate-600">Deposit</span>
                  </button>
                  <button onClick={() => setActiveModal('more')} className="flex flex-col items-center p-2 rounded-xl bg-slate-100/70 hover:bg-slate-200/80 transition-colors">
                    <Grid className="w-3.5 h-3.5 text-[#003ACE] mb-1" />
                    <span className="text-[8px] font-bold text-slate-600">More</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>

          {/* FLOATING CARD 1: RECENT ACTIVITY STATUS (BOTTOM LEFT) */}
          <motion.div
            initial={{ opacity: 0, y: 24, x: -24 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-[-4%] bottom-[15%] w-[58%] z-20 backdrop-blur-xl "
          >
            {!side1Failed ? (
              <img
                src={heroside1Img}
                alt="Recent activity card"
                className="w-full h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.45)] cursor-pointer hover:scale-[1.02] transition-transform duration-300 "
                onError={() => setSide1Failed(true)}
              />
            ) : (
              // High-fidelity interactive glassmorphic rendering fallback
              <div className="w-full bg-white/95 backdrop-blur-xl border border-white/50 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] text-slate-800">
                <h3 className="text-xs md:text-sm font-extrabold text-slate-950 mb-3">Recent activity</h3>
                
                {/* Simulated Filters */}
                <div className="flex gap-1 mb-3 overflow-x-auto pb-1 scrollbar-none text-[8px] md:text-[9px]">
                  {['This Day', 'This Week', 'This Month'].map((range) => (
                    <button
                      key={range}
                      onClick={() => setActiveRange(range)}
                      className={`px-2.5 py-1 rounded-full font-bold transition-all ${
                        activeRange === range ? 'bg-[#002266] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>

                {/* Ledger Items */}
                <div className="space-y-3 max-h-[110px] overflow-y-auto pr-1">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                          tx.type === 'send' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
                        }`}>
                          <ArrowUpRight className={`w-3.5 h-3.5 ${tx.type === 'send' ? '' : 'rotate-180'}`} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-900 leading-none mb-0.5">{tx.name}</p>
                          <p className="text-[8px] text-slate-400 font-medium">{tx.date}</p>
                        </div>
                      </div>
                      <span className={`text-[10px] font-extrabold ${tx.type === 'send' ? 'text-slate-700' : 'text-emerald-600'}`}>
                        {tx.type === 'send' ? '-' : '+'}${Math.abs(tx.amount).toFixed(0)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Decorative Interactive Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-1 cursor-pointer hover:text-white/60 transition-colors"
      >
        <span className="text-[9px] uppercase tracking-[0.3em]">Scroll</span>
        <ArrowRight className="w-3 h-3 rotate-90" />
      </motion.div>

      {/* --- SIMULATION OVERLAY MODALS --- */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#041217] border border-white/10 rounded-3xl p-6 max-w-md w-full text-white shadow-2xl relative"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {activeModal === 'transfer' && (
                <form onSubmit={handleTransferSubmit} className="space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Send className="w-5 h-5 text-[#00B4FD] rotate-45" />
                    <div>
                      <h3 className="text-md font-bold text-white">Quick Fund Transfer</h3>
                      <p className="text-[11px] text-white/40">Instantly wire secure assets globally.</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">Recipient Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Jin" 
                      value={transferTarget}
                      onChange={(e) => setTransferTarget(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#00B4FD] text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">Amount (USD)</label>
                    <input 
                      type="number" 
                      required
                      placeholder="e.g. 59" 
                      value={transferAmount}
                      onChange={(e) => setTransferAmount(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#00B4FD] text-sm"
                    />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00B4FD] to-[#003ACE] font-semibold text-xs tracking-wider uppercase">
                    Confirm & Send
                  </button>
                </form>
              )}

              {activeModal === 'add' && (
                <form onSubmit={handleDepositSubmit} className="space-y-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Plus className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h3 className="text-md font-bold text-white">Direct Deposit</h3>
                      <p className="text-[11px] text-white/40">Fund your simulation account instantly.</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1.5">Amount to Add (USD)</label>
                    <input 
                      type="number" 
                      required
                      placeholder="e.g. 1000" 
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#00B4FD] text-sm"
                    />
                  </div>
                  <button type="submit" className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 font-semibold text-xs tracking-wider uppercase transition-colors">
                    Deposit Instantly
                  </button>
                </form>
              )}

              {activeModal === 'more' && (
                <div className="space-y-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto text-[#00B4FD]">
                    <Grid className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-md font-bold text-white">Simulation Controller</h3>
                    <p className="text-xs text-white/40 mt-1 max-w-xs mx-auto">
                      Click inside either card on the right column to test live wallet values, simulated transactions, and filters.
                    </p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-2xl text-left border border-white/10">
                    <div className="flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[11px] text-white/80 leading-normal">
                          For local deployment, replace the string configurations in your source code with your local directory layout.
                        </p>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => setActiveModal(null)} className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-xs font-bold uppercase">
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}