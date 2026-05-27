import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

type FixedNavbarProps = {
  onRequestDemo: () => void
  onToast: (message: string) => void
}

type NavLink = { label: string; id: string }
type NavGroup = { label: string; links: NavLink[] }

const navGroups: NavGroup[] = [
  {
    label: 'Solutions',
    links: [
      { label: 'Solutions Overview', id: 'solutions' },
      { label: 'Core Banking', id: 'core-banking' },
      { label: 'Digital Banking', id: 'digital-banking' },
      { label: 'Case Studies', id: 'case-studies' }
    ]
  },
  {
    label: 'Resources',
    links: [
      { label: 'Insights', id: 'insights' },
      { label: 'Partners', id: 'partners' }
    ]
  }
]

const directLink: NavLink = { label: 'About Us', id: 'about' }

const allTrackedIds: string[] = [
  'home',
  ...navGroups.flatMap((g) => g.links.map((l) => l.id)),
  directLink.id
]

export default function FixedNavbar({ onRequestDemo, onToast }: FixedNavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [activeId, setActiveId] = useState<string>('home')
  const navRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length === 0) return
        const top = visible.reduce((a, b) =>
          a.intersectionRatio > b.intersectionRatio ? a : b
        )
        setActiveId(top.target.id)
      },
      { rootMargin: '-120px 0px -55% 0px', threshold: [0.1, 0.25, 0.5] }
    )

    allTrackedIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!openDropdown) return
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [openDropdown])

  const scrollToId = (id: string, label: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      onToast(`Jumping to ${label}`)
    }
    setOpenDropdown(null)
    setMobileMenuOpen(false)
  }

  const isGroupActive = (group: NavGroup) =>
    group.links.some((l) => l.id === activeId)

  const isDirectActive = (id: string) => id === activeId

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <div
        ref={navRef}
        className="pointer-events-auto w-full max-w-[920px] rounded-2xl bg-[#0F1318]/75 backdrop-blur-2xl backdrop-saturate-150 border border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.15)] px-6 py-3 flex items-center justify-between relative before:absolute before:inset-0 before:rounded-2xl before:bg-[radial-gradient(120%_120%_at_50%_-20%,rgba(91,194,231,0.12)_0%,transparent_60%)] before:pointer-events-none"
      >
        <button
          onClick={() => scrollToId('home', 'Home')}
          className="text-xl font-semibold tracking-tight text-white select-none"
        >
          N7
        </button>

        <nav className="hidden md:flex items-center gap-9 text-[12px] font-normal text-slate-300">
          {navGroups.map((group) => {
            const isOpen = openDropdown === group.label
            const active = isGroupActive(group)
            return (
              <div key={group.label} className="relative">
                <button
                  onClick={() =>
                    setOpenDropdown(isOpen ? null : group.label)
                  }
                  className={`relative flex items-center gap-1 transition-colors uppercase tracking-[0.18em] py-2 ${
                    active || isOpen ? 'text-white' : 'hover:text-white'
                  }`}
                >
                  <span>{group.label}</span>
                  <ChevronDown
                    className={`w-3 h-3 opacity-70 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#5BC2E7]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 min-w-[220px] rounded-xl bg-[#0F1318]/85 backdrop-blur-2xl backdrop-saturate-150 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)] p-2"
                    >
                      {group.links.map((link) => {
                        const linkActive = activeId === link.id
                        return (
                          <button
                            key={link.id}
                            onClick={() => scrollToId(link.id, link.label)}
                            className={`w-full text-left px-3 py-2.5 rounded-lg text-[12px] tracking-[0.12em] uppercase transition-colors ${
                              linkActive
                                ? 'bg-white/[0.06] text-[#5BC2E7]'
                                : 'text-white/75 hover:bg-white/[0.04] hover:text-white'
                            }`}
                          >
                            {link.label}
                          </button>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}

          <button
            onClick={() => scrollToId(directLink.id, directLink.label)}
            className={`relative transition-colors uppercase tracking-[0.18em] py-2 ${
              isDirectActive(directLink.id) ? 'text-white' : 'hover:text-white'
            }`}
          >
            {directLink.label}
            {isDirectActive(directLink.id) && (
              <motion.span
                layoutId="nav-underline"
                className="absolute -bottom-0.5 left-0 right-0 h-px bg-[#5BC2E7]"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        </nav>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onRequestDemo}
          className="hidden md:inline-block border border-white/70 hover:border-white text-white text-[11px] font-medium uppercase tracking-[0.18em] px-5 py-2.5 rounded-md transition-all"
        >
          Request Demo
        </motion.button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white p-1"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pointer-events-auto absolute top-full mt-3 left-4 right-4 md:hidden bg-[#0F1318]/85 backdrop-blur-2xl backdrop-saturate-150 border border-white/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.12)] px-5 py-4 space-y-1 text-sm text-slate-300"
          >
            {navGroups.map((group) => (
              <div key={group.label} className="py-1">
                <p className="px-2 py-1 text-[10px] uppercase tracking-[0.22em] text-white/40">
                  {group.label}
                </p>
                {group.links.map((link) => {
                  const linkActive = activeId === link.id
                  return (
                    <button
                      key={link.id}
                      onClick={() => scrollToId(link.id, link.label)}
                      className={`block w-full text-left px-2 py-2 rounded-lg text-[12px] tracking-[0.14em] uppercase transition-colors ${
                        linkActive ? 'text-[#5BC2E7]' : 'text-white/80 hover:text-white'
                      }`}
                    >
                      {link.label}
                    </button>
                  )
                })}
              </div>
            ))}
            <button
              onClick={() => scrollToId(directLink.id, directLink.label)}
              className={`block w-full text-left px-2 py-2 rounded-lg text-[12px] tracking-[0.18em] uppercase transition-colors ${
                isDirectActive(directLink.id) ? 'text-[#5BC2E7]' : 'text-white/80 hover:text-white'
              }`}
            >
              {directLink.label}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                onRequestDemo()
              }}
              className="w-full mt-3 border border-white/70 text-white py-2.5 rounded-md text-[11px] uppercase tracking-[0.18em]"
            >
              Request Demo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
