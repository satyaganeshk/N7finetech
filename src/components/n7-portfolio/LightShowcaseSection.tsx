import { useState } from 'react'
import { ArrowRight, Check, ChevronRight } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { CtaLightBanner } from '../layout/BannerSection' 

type LightShowcaseSectionProps = {
  onFeatureAction?: (message: string) => void
  onLearnMore?: () => void
  onRequestDemo?: () => void
  onContact?: () => void
}

// Complete mock data matching the exact copy in Frame 39.jpg
const blocks = [
  {
    heading: 'Fully compliant with regulatory requirement',
    body: "The governance of risk management with regulations is achieved by our risk management framework that is fully integrated to work with digital bank's operational-risk protocols and procedures.",
    bullets: [
      'Pre-integrated Security System',
      'Fully Compliant With Regulatory Requirement',
      'Digitally Connected Core'
    ]
  },
  {
    heading: 'No legacy IT systems',
    body: 'Our Digital Banking solution and multilayered approach help financial institutions take advantage of digital transformation by ensuring customer trust and regulatory compliance.',
    bullets: [
      'Adaptive & Intelligent API monetization',
      'Ambient User Experience',
      'Cloud-native With lower TCO'
    ]
  },
  {
    heading: 'No traditional branches',
    body: 'Our Digital Banking out-of-the-box helps you to accelerate innovation while reducing risks and optimising operational costs for a seamless branchless experience.',
    bullets: [
      'Branchless & Paperless Banking',
      'Digital Transformation Capability',
      'Optimized, Adoptable and Scalable'
    ]
  }
]

const phoneImages = [
  { src: '/Iphones/iPhone 13 Pro.png', alt: 'Banking app home screen showing $42,295.00 USD balance' },
  { src: '/Iphones/iPhone 13 Pro-1.png', alt: 'Portfolio overview screen with interactive charts' },
  { src: '/Iphones/iPhone 13 Pro-2.png', alt: 'Account profile screen for Toni Kross' }
]

function PhoneMockup({ src, alt, index }: { src: string; alt: string; index: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 50 }}
      className="relative w-[280px] md:w-[320px] mx-auto z-10 select-none group"
    >
      {/* Ambient glow behind each phone to mirror high-fidelity lighting */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-sky-200/30 to-blue-300/10 rounded-[50px] blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />
      
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 6 + index,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="relative"
      >
        <img loading="lazy" decoding="async"
          src={encodeURI(src)}
          alt={alt}
          className="w-full h-auto drop-shadow-[0_25px_50px_rgba(15,42,86,0.15)] transition-transform duration-500 hover:scale-[1.015]"
          onError={(e) => {
            // High-fidelity responsive CSS fallback when physical local image assets are resolving in different directories
            e.currentTarget.style.display = 'none';
            const fallback = e.currentTarget.parentElement?.querySelector('.fallback-mockup');
            if (fallback) fallback.classList.remove('hidden');
          }}
        />

        {/* CSS Screen Render in case assets are not physically inside public folder during sandbox builds */}
        <div className="fallback-mockup hidden w-full aspect-[9/19.5] rounded-[48px] bg-slate-950 p-3 shadow-2xl border-[5px] border-slate-800 text-white relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-6 bg-slate-950 rounded-b-2xl z-20 flex justify-center items-center">
            <div className="w-16 h-3 bg-black rounded-full" />
          </div>
          
          {index === 0 && (
            <div className="h-full bg-slate-50 text-slate-900 p-4 pt-8 flex flex-col justify-between text-left text-xs font-sans">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[10px] text-slate-400">Good Morning</p>
                    <p className="font-semibold text-slate-800">Toni Kross</p>
                  </div>
                  <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">TK</div>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm space-y-1">
                  <p className="text-[9px] text-slate-400 font-medium">Main Account</p>
                  <p className="text-lg font-bold text-slate-900">$42,295.00 USD</p>
                </div>
                <div className="grid grid-cols-3 gap-1">
                  <div className="bg-blue-50 p-2 rounded-lg text-center text-[8px] font-medium text-blue-600">Fund Transfer</div>
                  <div className="bg-blue-50 p-2 rounded-lg text-center text-[8px] font-medium text-blue-600">Add Money</div>
                  <div className="bg-blue-50 p-2 rounded-lg text-center text-[8px] font-medium text-blue-600">More</div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="font-semibold text-[10px] text-slate-500">Recent activity</p>
                <div className="space-y-1">
                  <div className="flex justify-between items-center p-1.5 bg-white rounded border border-slate-50">
                    <span className="text-[10px]">To Jin - Work</span>
                    <span className="font-semibold text-rose-500 text-[10px]">-$50</span>
                  </div>
                  <div className="flex justify-between items-center p-1.5 bg-white rounded border border-slate-50">
                    <span className="text-[10px]">From Google</span>
                    <span className="font-semibold text-emerald-500 text-[10px]">+$850</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {index === 1 && (
            <div className="h-full bg-slate-50 text-slate-900 p-4 pt-8 flex flex-col justify-between text-left text-xs font-sans">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-slate-800 text-[11px]">Insights & Trends</span>
                  <span className="text-[10px] text-blue-600 font-semibold">March 2026</span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                  <p className="text-[9px] text-slate-400 font-medium">Total Balance</p>
                  <p className="text-lg font-bold text-slate-900">$8,295.00 USD</p>
                  
                  {/* Micro Bar Chart */}
                  <div className="flex items-end justify-between h-14 mt-3 pt-2 border-t border-slate-50">
                    <div className="w-2.5 h-[40%] bg-blue-200 rounded-sm" />
                    <div className="w-2.5 h-[65%] bg-blue-300 rounded-sm" />
                    <div className="w-2.5 h-[50%] bg-blue-200 rounded-sm" />
                    <div className="w-2.5 h-[85%] bg-blue-600 rounded-sm" />
                    <div className="w-2.5 h-[70%] bg-blue-400 rounded-sm" />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white p-2 rounded-lg border border-slate-100">
                    <span className="text-[8px] text-slate-400">Income</span>
                    <p className="text-[11px] font-semibold text-emerald-600">$632.00</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-100">
                    <span className="text-[8px] text-slate-400">Spend</span>
                    <p className="text-[11px] font-semibold text-rose-500">$452.00</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {index === 2 && (
            <div className="h-full bg-slate-50 text-slate-900 p-4 pt-12 flex flex-col justify-start text-left text-xs font-sans space-y-4">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 bg-blue-100 rounded-full mx-auto flex items-center justify-center font-bold text-blue-600 text-sm">TK</div>
                <h4 className="font-semibold text-slate-800 text-xs">Toni Kross</h4>
                <p className="text-[9px] text-slate-400">toni.kross@gmail.com</p>
              </div>
              <div className="space-y-1.5 pt-2">
                {['Profile setting', 'Settings', 'Support', 'Sign out'].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-2.5 bg-white rounded-lg border border-slate-100 shadow-sm text-[10px] text-slate-700 font-medium">
                    <span>{item}</span>
                    <ChevronRight className="w-3 h-3 text-slate-400" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export function LightShowcaseSection({ onFeatureAction, onLearnMore, onRequestDemo, onContact }: LightShowcaseSectionProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleAction = (message: string) => {
    if (onFeatureAction) {
      onFeatureAction(message)
    }
    setToastMessage(`Selected: "${message}"`)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handleLearnMore = () => {
    if (onLearnMore) {
      onLearnMore()
    } else {
      setToastMessage("Navigating to detailed documents...")
      setTimeout(() => setToastMessage(null), 3000)
    }
  }

  return (
    <section className="relative bg-[#F3F8FB] text-[#0F1E36] py-16 md:py-28 overflow-hidden font-sans">
      
      {/* ----------------- BACKGROUND VECTOR ASSETS ----------------- */}
      
      {/* Actual outlined watermark "/N7.png" image asset behind the top hero section */}
      <div className="absolute top-[-3%] left-[-10%] w-[120%] h-full pointer-events-none select-none opacity-[0.16] z-0 flex items-start justify-center">
        <img loading="lazy" decoding="async" 
          src="/N7.png" 
          alt="" 
          className="w-[110%] max-w-none h-auto object-contain"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      {/* Primary Background curves using the "/Vector.png" file - with adjusted opacity so they are clearly visible */}
      <div className="absolute top-[2%] left-[-10%] w-[85%] md:w-[60%] h-auto opacity-[0.22] pointer-events-none select-none z-0">
        <img loading="lazy" decoding="async" 
          src="/Vector.png" 
          alt="" 
          className="w-full h-auto object-contain transform -rotate-12"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      <div className="absolute top-[35%] right-[-15%] w-[80%] md:w-[55%] h-auto opacity-[0.18] pointer-events-none select-none z-0">
        <img loading="lazy" decoding="async" 
          src="/Vector.png" 
          alt="" 
          className="w-full h-auto object-contain transform scale-x-[-1] rotate-45"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      <div className="absolute bottom-[12%] left-[-12%] w-[85%] md:w-[60%] h-auto opacity-[0.22] pointer-events-none select-none z-0">
        <img loading="lazy" decoding="async" 
          src="/Vector.png" 
          alt="" 
          className="w-full h-auto object-contain transform rotate-90"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      {/* ----------------- GRID LAYOUT CONTENT ----------------- */}
      
      <div className="relative max-w-[1240px] mx-auto px-6 md:px-12 space-y-24 md:space-y-36 z-10">
        
        {/* --- ROW 1: Triple Column Layout (Hero Title + Phone 1 + Feature Content) --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center">

          {/* Column A: Left Hero Title / Prompt */}
          <div className="md:col-span-12 lg:col-span-4 space-y-6 text-left">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-[45px] font-light leading-[1.12] tracking-tight text-[#0F1E36]">
                Digital banking <br />
                <span className="font-normal text-[#0F1E36]">out-of-the-box</span>
              </h1>
              <p className="text-slate-500 text-[14px] leading-relaxed max-w-sm font-light">
                N7 helps your financial institution improve the client experience, automate and optimize procedures.
              </p>
            </div>
            
            <div className="pt-2 flex flex-col sm:flex-row lg:flex-col gap-4 items-start">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => onRequestDemo?.()}
                className="px-7 py-3 rounded-lg bg-gradient-to-r from-[#0052FF] to-[#0076FF] text-white text-xs font-semibold uppercase tracking-wider shadow-[0_10px_25px_rgba(0,82,255,0.2)] hover:shadow-[0_12px_30px_rgba(0,82,255,0.3)] hover:translate-y-[-1px] transition-all duration-200"
              >
                Request Demo
              </motion.button>
              
              <button
                onClick={handleLearnMore}
                className="group flex items-center gap-1.5 text-[11px] text-[#0052FF] font-semibold uppercase tracking-[0.2em] transition-colors pt-2 pl-1"
              >
                <span>Learn More</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Column B: Center Phone Mockup (iPhone 13 Pro.png) */}
          <div className="md:col-span-6 lg:col-span-4 flex justify-center py-6">
            <PhoneMockup src={phoneImages[0].src} alt={phoneImages[0].alt} index={0} />
          </div>

          {/* Column C: Right Compliance Content block */}
          <div className="md:col-span-6 lg:col-span-4 space-y-6 text-left">
            <div className="space-y-4">
              <h3 className="text-2xl md:text-2xl font-light text-[#0F1E36] leading-snug">
                {blocks[0].heading}
              </h3>
              <p className="text-slate-500 text-[13px] leading-relaxed font-light">
                {blocks[0].body}
              </p>
            </div>

            <ul className="space-y-3 pt-2">
              {blocks[0].bullets.map((bullet) => (
                <motion.li
                  key={bullet}
                  whileHover={{ x: 3 }}
                  onClick={() => handleAction(bullet)}
                  className="flex items-center gap-3.5 text-[13px] text-slate-700 cursor-pointer hover:text-[#0052FF] transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-[#0052FF] flex items-center justify-center shrink-0 shadow-sm shadow-blue-200">
                    <Check className="w-3 h-3 text-white stroke-[3.5]" />
                  </span>
                  <span className="font-medium text-slate-600">{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </div>

        </div>

        {/* --- ROW 2: Left Content + Right Phone Mockup 2 (iPhone 13 Pro-1.png) --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 lg:gap-16 items-center">

          {/* Left Column: Text Content */}
          <div className="md:col-span-6 md:order-1 space-y-6 text-left">
            <div className="space-y-4 max-w-lg">
              <h3 className="text-2xl md:text-[28px] font-light text-[#0F1E36] leading-snug">
                {blocks[1].heading}
              </h3>
              <p className="text-slate-500 text-[13.5px] leading-relaxed font-light">
                {blocks[1].body}
              </p>
            </div>

            <ul className="space-y-3.5 pt-2 max-w-md">
              {blocks[1].bullets.map((bullet) => (
                <motion.li
                  key={bullet}
                  whileHover={{ x: 3 }}
                  onClick={() => handleAction(bullet)}
                  className="flex items-center gap-3.5 text-[13px] text-slate-700 cursor-pointer hover:text-[#0052FF] transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-[#0052FF] flex items-center justify-center shrink-0 shadow-sm shadow-blue-200">
                    <Check className="w-3 h-3 text-white stroke-[3.5]" />
                  </span>
                  <span className="font-medium text-slate-600">{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right Column: Center Phone Mockup */}
          <div className="md:col-span-6 md:order-2 flex justify-center">
            <PhoneMockup src={phoneImages[1].src} alt={phoneImages[1].alt} index={1} />
          </div>

        </div>

        {/* --- ROW 3: Left Phone Mockup 3 (iPhone 13 Pro-2.png) + Right Content --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-10 lg:gap-16 items-center">

          {/* Left Column: Center Phone Mockup */}
          <div className="md:col-span-6 flex justify-center">
            <PhoneMockup src={phoneImages[2].src} alt={phoneImages[2].alt} index={2} />
          </div>

          {/* Right Column: Text Content */}
          <div className="md:col-span-6 space-y-6 text-left">
            <div className="space-y-4 max-w-lg">
              <h3 className="text-2xl md:text-[28px] font-light text-[#0F1E36] leading-snug">
                {blocks[2].heading}
              </h3>
              <p className="text-slate-500 text-[13.5px] leading-relaxed font-light">
                {blocks[2].body}
              </p>
            </div>

            <ul className="space-y-3.5 pt-2 max-w-md">
              {blocks[2].bullets.map((bullet) => (
                <motion.li
                  key={bullet}
                  whileHover={{ x: 3 }}
                  onClick={() => handleAction(bullet)}
                  className="flex items-center gap-3.5 text-[13px] text-slate-700 cursor-pointer hover:text-[#0052FF] transition-colors"
                >
                  <span className="w-5 h-5 rounded-full bg-[#0052FF] flex items-center justify-center shrink-0 shadow-sm shadow-blue-200">
                    <Check className="w-3 h-3 text-white stroke-[3.5]" />
                  </span>
                  <span className="font-medium text-slate-600">{bullet}</span>
                </motion.li>
              ))}
            </ul>
          </div>

        </div>

        <CtaLightBanner onRequestDemo={() => onRequestDemo?.()} onContact={() => onContact?.()} background="N7" />

      </div>

      {/* --- Interactive Action Toast Notification Panel --- */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-800 flex items-center gap-3 text-sm font-medium"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}