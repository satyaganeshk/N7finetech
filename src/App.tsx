import { useState } from 'react'
import FixedNavbar from './components/layout/FixedNavbar'
import Footer from './components/layout/Footer'
import DemoBox from './components/layout/DemoBox'
import Toast from './components/layout/Toast'
import ScrollToTop from './components/layout/ScrollToTop'
import HeroSection from './components/n7-portfolio/HeroSection'
import SolutionsSection from './components/n7-portfolio/SolutionsSection'
import { SystemSection } from './components/n7-portfolio/SystemSection'
import { CtaBanner } from './components/layout/BannerSection'
import PartnerBar from './components/n7-portfolio/PartnerBar'
import { LightShowcaseSection } from './components/n7-portfolio/LightShowcaseSection'
import CoreInsights from './components/n7-portfolio/CoreInsights'
import CaseStudies from './components/n7-portfolio/CaseStudies'
import { solutions, caseStudies } from './components/constants/sectionData'
import './App.css'

function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)
  const [activeCaseStudy, setActiveCaseStudy] = useState(0)

  const triggerToast = (message: string) => {
    setToastMessage(message)
    window.setTimeout(() => setToastMessage(null), 3500)
  }

  const handleDemoOpen = () => setIsDemoModalOpen(true)
  const handleDemoClose = () => setIsDemoModalOpen(false)

  const handleStartNow = () => triggerToast('Routing to our team — we will be in touch.')
  const handleLearnMore = (item: string) => triggerToast(`Opening details for ${item}`)
  const handleSimulate = () => triggerToast('Streaming live transaction feed.')
  const handleFeatureAction = (label: string) => triggerToast(label)
  const handleSeeAll = () => triggerToast('Opening insights archive.')
  const handleReadArticle = (slug: string) => triggerToast(`Opening: ${slug}`)
  const handleReadCase = (slug: string) => triggerToast(`Opening case study: ${slug}`)

  const goToPreviousCaseStudy = () =>
    setActiveCaseStudy((prev) => (prev === 0 ? caseStudies.length - 1 : prev - 1))
  const goToNextCaseStudy = () =>
    setActiveCaseStudy((prev) => (prev === caseStudies.length - 1 ? 0 : prev + 1))

  return (
    <div className="min-h-screen bg-[#0E1116] text-white selection:bg-[#1E5CFF] selection:text-white overflow-x-hidden">
      <FixedNavbar onRequestDemo={handleDemoOpen} onToast={triggerToast} />
      <main>
        <section id="home" aria-label="Hero">
          <HeroSection onRequestDemo={handleDemoOpen} onStartNow={handleStartNow} onToast={triggerToast} />
        </section>
        <section id="solutions" aria-label="Solutions">
          <SolutionsSection
            solutions={solutions}
            onLearnMore={handleLearnMore}
            onRequestDemo={handleDemoOpen}
          />
        </section>
        <section id="core-banking" aria-label="Core banking">
          <SystemSection onSimulate={handleSimulate} onLearnMore={() => handleLearnMore('Cloud Core Banking')} onRequestDemo={handleDemoOpen} />
        </section>
        <CtaBanner onRequestDemo={handleDemoOpen} onContact={handleStartNow} background="CB7" />
        <section id="partners" aria-label="Trusted partners">
          <PartnerBar />
        </section>
        <section id="digital-banking" aria-label="Digital banking">
          <LightShowcaseSection
            onFeatureAction={handleFeatureAction}
            onLearnMore={() => handleLearnMore('Digital banking out-of-the-box')}
            onRequestDemo={handleDemoOpen}
            onContact={handleStartNow}
          />
        </section>
        <CoreInsights onSeeAll={handleSeeAll} onReadArticle={handleReadArticle} />
        <section id="case-studies" aria-label="Case studies">
          <CaseStudies
            caseStudies={caseStudies}
            activeIndex={activeCaseStudy}
            onPrev={goToPreviousCaseStudy}
            onNext={goToNextCaseStudy}
            onJumpTo={setActiveCaseStudy}
            onReadMore={handleReadCase}
          />
        </section>
        <CtaBanner onRequestDemo={handleDemoOpen} onContact={handleStartNow} />
      </main>
      <div id="about">
        <Footer onToast={triggerToast} />
      </div>
      {toastMessage && <Toast message={toastMessage} />}
      <DemoBox open={isDemoModalOpen} onClose={handleDemoClose} onToast={triggerToast} />
      <ScrollToTop isDark={true} />
    </div>
  )
}

export default App
