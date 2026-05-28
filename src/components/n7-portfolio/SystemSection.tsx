import { useState } from 'react'
import { ArrowRight, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

type SystemSectionProps = {
  onSimulate?: () => void
  onLearnMore?: () => void
  onRequestDemo?: () => void
}

// Exactly split features to mirror Frame 80.png's two-column layout
const leftColumnFeatures = [
  'Customer-On Boarding',
  'Managing deposits and withdrawals',
  'Transaction management',
  'Interest Calculation',
  'Payments processing (cash, cheques, mandates, NEFT, RTGS etc)'
]

const rightColumnFeatures = [
  'CRM Activities',
  'Configuring New Banking Products',
  'Loan disbursal and Loan management',
  'Establishing criteria for minimum balances, interest rates, number of withdrawals allowed and so on.'
]

// High-fidelity responsive Laptop Mockup mirroring the glowing blue base line seen in Frame 12 and Frame 80
function LaptopMockup({ src, alt, glowingSide = 'right', floatDelay = 0 }: { src: string; alt: string; glowingSide?: 'left' | 'right'; floatDelay?: number }) {
  return (
    <motion.div
      className="relative w-full max-w-[560px] mx-auto select-none group [perspective:1200px]"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: floatDelay }}
        className="relative will-change-transform"
        whileHover={{ rotateX: -4, rotateY: glowingSide === 'right' ? -3 : 3 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
      {/* Background ambient neon flare to enhance depth */}
      <motion.div
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -inset-4 bg-[#0052FF]/10 rounded-full blur-3xl pointer-events-none"
      />

      {/* Laptop Screen Bezel */}
      <div className="relative rounded-t-xl bg-[#090D14] p-3 md:p-4 border-[2px] border-slate-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group-hover:shadow-[0_30px_70px_rgba(0,82,255,0.35)] transition-shadow duration-500 aspect-[16/10] overflow-hidden flex items-center justify-center">
        <img loading="lazy" decoding="async"
          src={encodeURI(src)}
          alt={alt}
          className="w-full h-full object-cover rounded-md"
          onError={(e) => {
            // High-fidelity styled fallback screen when physical assets are not fully present inside local folders
            e.currentTarget.style.display = 'none';
            const fallback = e.currentTarget.parentElement?.querySelector('.laptop-fallback');
            if (fallback) fallback.classList.remove('hidden');
          }}
        />

        {/* Dynamic Fallback CSS Screens to guarantee robust sandbox loading without calling any external image APIs */}
        <div className="laptop-fallback hidden w-full h-full bg-[#0D131F] text-slate-300 p-4 flex flex-col justify-between text-left font-sans text-xs select-none">
          {src.includes('Frame 90') ? (
            <div className="space-y-3 h-full flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                <span className="font-bold text-slate-200">AML Dashboard</span>
                <span className="text-[10px] text-slate-500">System Status: Active</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-[#141C2E] p-2 rounded border border-rose-500/30">
                  <span className="text-[8px] text-rose-400 font-bold block">450</span>
                  <span className="text-[7px] text-slate-500">Suspicious Transactions</span>
                </div>
                <div className="bg-[#141C2E] p-2 rounded border border-yellow-500/30">
                  <span className="text-[8px] text-yellow-400 font-bold block">3</span>
                  <span className="text-[7px] text-slate-500">AML Action Items Pending</span>
                </div>
                <div className="bg-[#141C2E] p-2 rounded border border-blue-500/30">
                  <span className="text-[8px] text-blue-400 font-bold block">600</span>
                  <span className="text-[7px] text-slate-500">Processed Today</span>
                </div>
              </div>
              <div className="flex-1 bg-[#101726] rounded border border-slate-800 p-2 flex items-center justify-between">
                <div className="w-1/2 space-y-1">
                  <span className="text-[8px] text-slate-400 block font-medium">Suspicious Trend Ratio</span>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-gradient-to-r from-rose-500 to-amber-500" />
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border-4 border-rose-500 border-t-transparent animate-spin" />
              </div>
            </div>
          ) : (
            <div className="space-y-2 h-full flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-slate-800 pb-1">
                <span className="font-bold text-slate-200">KYC Dashboard</span>
                <span className="text-[9px] text-emerald-400 font-semibold">Ready to deploy</span>
              </div>
              <div className="grid grid-cols-2 gap-2 flex-1 items-stretch py-1">
                <div className="bg-[#101726] p-2 rounded border border-slate-800 space-y-2">
                  <span className="text-[8px] text-slate-400 block">Identified Records</span>
                  <div className="space-y-1">
                    <div className="h-1 bg-blue-500 rounded" />
                    <div className="h-1 bg-slate-700 rounded w-5/6" />
                    <div className="h-1 bg-slate-700 rounded w-4/6" />
                  </div>
                </div>
                <div className="bg-[#101726] p-2 rounded border border-slate-800 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[8px]">
                    <span>Failed Uploads</span>
                    <span className="text-rose-500 font-bold">22</span>
                  </div>
                  <div className="text-[7px] text-slate-500 italic">Branch Name: Chandini Chowk</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sleek metallic lower laptop deck with integrated neon blue glowing baseline (Matches Frame 12 & Frame 80) */}
      <div className="relative h-[12px] bg-gradient-to-b from-[#182335] to-[#0D1420] rounded-b-xl border-t border-slate-700 shadow-[0_10px_20px_rgba(0,0,0,0.6)]">
        {/* Neon blue glow strip at bottom corner edge of the chassis */}
        <motion.div
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className={`absolute bottom-0 h-[2px] bg-[#00A3FF] shadow-[0_0_12px_#00A3FF] ${
            glowingSide === 'left' ? 'left-[-4%] w-[80%]' : 'right-[-4%] w-[80%]'
          }`}
        />
      </div>
      </motion.div>
    </motion.div>
  )
}

export function SystemSection({ onSimulate, onLearnMore, onRequestDemo }: SystemSectionProps) {
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const handleAction = (message: string) => {
    if (onSimulate) {
      onSimulate()
    }
    setToastMessage(`Triggering: "${message}"`)
    setTimeout(() => setToastMessage(null), 3500)
  }

  const handleLearnMore = () => {
    if (onLearnMore) {
      onLearnMore()
    } else {
      setToastMessage("Accessing Core Banking documentation...")
      setTimeout(() => setToastMessage(null), 3000)
    }
  }

  return (
    <section className="relative bg-[#040B16] text-white py-20 md:py-32 overflow-hidden font-sans">
      
      {/* ----------------- BACKGROUND WATERMARK / GRAPHICS ----------------- */}
      
      {/* Actual outlined watermark "/CB7.png" image asset from Frame 12.png */}
      <motion.div
        animate={{ opacity: [0.04, 0.08, 0.04], scale: [1, 1.03, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[5%] left-[-8%] w-[115%] h-[85%] pointer-events-none select-none z-0 flex items-start justify-center mix-blend-screen"
      >
        <img loading="lazy" decoding="async" 
          src="/CB7.png" 
          alt="" 
          className="w-[100%] max-w-none h-auto object-contain"
          onError={(e) => { 
            // Fallback to high-quality CSS outlined text if image is not inside public assets folder
            e.currentTarget.style.display = 'none';
            const fallback = e.currentTarget.parentElement?.querySelector('.text-fallback-watermark');
            if (fallback) fallback.classList.remove('hidden');
          }}
        />
        {/* CSS outline watermark fallback */}
        <span className="text-fallback-watermark hidden text-[32rem] md:text-[50rem] font-bold tracking-tight select-none leading-none pointer-events-none" style={{
          WebkitTextStroke: '1px rgba(255, 255, 255, 0.05)',
          color: 'transparent'
        }}>
          CB7
        </span>
      </motion.div>

      {/* Vector background curves layer (using given /Vector.png only as background curves) */}
      <div className="absolute inset-y-0 right-[-10%] w-[55%] h-full opacity-[0.04] pointer-events-none select-none z-0 mix-blend-screen">
        <img loading="lazy" decoding="async" 
          src="/Vector.png" 
          alt="" 
          className="w-full h-full object-contain"
          onError={(e) => { e.currentTarget.style.display = 'none'; }}
        />
      </div>

      {/* ----------------- GRID LAYOUT CONTENT ----------------- */}
      
      <div className="relative max-w-[1240px] mx-auto px-6 md:px-12 space-y-28 md:space-y-40 z-10">
        
        {/* --- ROW 1 (Matches Frame 12.png): A complete cloud-based core banking --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-5">
              <h2 className="text-4xl md:text-[46px] font-light leading-[1.14] tracking-tight text-white">
                A complete cloud-based <br />
                <span className="font-normal text-white">core banking.</span>
              </h2>
              <p className="text-slate-400 text-[14.5px] leading-relaxed max-w-md font-light">
                Faster time to market with our cloud-based core banking services
              </p>
            </div>
            
            <div className="pt-2 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => onRequestDemo?.()}
                className="px-8 py-3.5 rounded-lg bg-gradient-to-r from-[#0052FF] to-[#0076FF] text-white text-xs font-semibold uppercase tracking-[0.18em] shadow-[0_12px_25px_rgba(0,82,255,0.25)] hover:shadow-[0_15px_30px_rgba(0,82,255,0.35)] transition-all duration-200"
              >
                Request Demo
              </motion.button>
              
              <button
                onClick={handleLearnMore}
                className="group flex items-center gap-1.5 text-[11px] text-cyan hover:text-white font-semibold uppercase tracking-[0.2em] transition-colors py-2"
              >
                <span className="relative after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 group-hover:after:w-full">
                  Learn More
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Right Laptop Screen Column (glowing baseline on the right side) */}
          <div className="lg:col-span-6 flex justify-center">
            <LaptopMockup 
              src="/Dashboards/Frame 90.png"
              alt="Core banking Dashboard screen" 
              glowingSide="right"
            />
          </div>

        </div>

        {/* --- ROW 2 (Matches Frame 80.png): Run a more efficient, flexible corebanking system --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Laptop Mockup (glowing baseline on the left side) */}
          <div className="lg:col-span-6 lg:order-1 flex justify-center">
            <LaptopMockup
              src="/Dashboards/Frame 98.png"
              alt="KYC Dashboard screen"
              glowingSide="left"
              floatDelay={1.5}
            />
          </div>

          {/* Right Column: Detailed Lists */}
          <div className="lg:col-span-6 lg:order-2 space-y-6 text-left">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-[34px] font-light text-white leading-[1.2] tracking-tight">
                Run a more efficient, flexible,and digitally connected corebanking system
              </h2>
              <p className="text-white text-xs uppercase tracking-[0.2em] font-semibold pt-1">
                What you will get:
              </p>
            </div>

            {/* Split Two-Column Feature Bullets with vibrant blue badge indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 pt-2">
              
              {/* Left Bullets Column */}
              <ul className="space-y-3.5">
                {leftColumnFeatures.map((feature) => (
                  <motion.li
                    key={feature}
                    whileHover={{ x: 2 }}
                    onClick={() => handleAction(feature)}
                    className="group flex items-start gap-3.5 text-[13px] text-slate-300 font-light cursor-pointer hover:text-cyan transition-all"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#0052FF] flex items-center justify-center shrink-0 shadow-md shadow-blue-900/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_14px_rgba(0,82,255,0.6)]">
                      <Check className="w-3 h-3 text-white stroke-[3.5] transition-transform duration-300 group-hover:scale-110" />
                    </span>
                    <span className="leading-tight pt-0.5">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              {/* Right Bullets Column */}
              <ul className="space-y-3.5">
                {rightColumnFeatures.map((feature) => (
                  <motion.li
                    key={feature}
                    whileHover={{ x: 2 }}
                    onClick={() => handleAction(feature)}
                    className="group flex items-start gap-3.5 text-[13px] text-slate-300 font-light cursor-pointer hover:text-cyan transition-all"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#0052FF] flex items-center justify-center shrink-0 shadow-md shadow-blue-900/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_14px_rgba(0,82,255,0.6)]">
                      <Check className="w-3 h-3 text-white stroke-[3.5] transition-transform duration-300 group-hover:scale-110" />
                    </span>
                    <span className="leading-tight pt-0.5">{feature}</span>
                  </motion.li>
                ))}
              </ul>

            </div>
          </div>

        </div>

      </div>

      {/* --- Action Toast Notification Area --- */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-[#0A1325] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-slate-800 flex items-center gap-3 text-sm font-medium"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// Entry Point
export default function App() {
  return (
    <div className="w-full min-h-screen bg-[#040B16]">
      <SystemSection 
        onSimulate={() => console.log('Simulate/Request Demo Action executed')}
        onLearnMore={() => console.log('Learn More Action executed')}
      />
    </div>
  )
}