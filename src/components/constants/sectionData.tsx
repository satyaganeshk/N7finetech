export type SolutionItem = {
  title: string
  desc: string
  variant: 'a' | 'b'
  icon: string
  tag?: string
}

export type CaseStudy = {
  title: string
  client: string
  results: string
  desc: string
  category: string
}

export const solutions: SolutionItem[] = [
  {
    title: 'Core Banking CB7',
    desc: 'CB7 helps your financial institution improve the client experience, automate and optimize procedures, simplify back-office operations for your employees, improve risk management, increase productivity, and ensure full regulatory compliance.',
    variant: 'a',
    icon: '/SolutionsVectors/Vector.png'
  },
  {
    title: 'Digital Banking N7',
    desc: 'N7 brings business agility, automation, scalability and disruptive technology innovation. Our approach to building digital banks is specifically designed to help clients deliver modern banking experiences.',
    variant: 'b',
    icon: '/SolutionsVectors/Vector (1).png'
  },
  {
    title: 'Open Banking',
    desc: 'Our API banking helps you to gain sustainable insights, enable account aggregation, streamline customer onboarding, KYC and payment initiation flows, and reinforce enhanced credit scoring.',
    variant: 'a',
    icon: '/SolutionsVectors/Vector (2).png'
  },
  {
    title: 'Loan Origination System',
    desc: 'N7 brings full capabilities across strategy, human-centred design, operations, engineering and data sciences to design and deliver disruptive innovation. Our approach to building digital banks is specifically designed to help clients.',
    variant: 'b',
    icon: '/SolutionsVectors/Vector (3).png',
    tag: 'NBFC'
  },
  {
    title: 'Loan Management System',
    desc: 'N7 brings full capabilities across strategy, human-centred design, operations, engineering and data sciences to create and deliver disruptive innovation. Our approach to building digital banks is specifically designed to help clients.',
    variant: 'a',
    icon: '/SolutionsVectors/Group.png',
    tag: 'NBFC'
  }
]

export const caseStudies: CaseStudy[] = [
  {
    title: 'How we help brand reach out to more people',
    client: 'Zoomer',
    results: 'Higher conversion and deeper customer engagement across digital channels.',
    desc: 'A leading regional bank partnered with us to modernize their digital channels. Through a phased rollout of our core banking platform and open APIs, they launched mobile-first experiences for customers and reached new segments — without disrupting their existing operations.',
    category: 'Digital Transformation'
  },
  {
    title: 'Scaling cross-border payments for a digital wallet',
    client: 'VeloPay',
    results: 'Faster settlement and a unified ledger across multiple corridors.',
    desc: 'VeloPay leveraged our API-first infrastructure to consolidate their legacy systems and deliver instant cross-border settlement at scale, with a single source of truth for every transaction.',
    category: 'Payments Modernization'
  },
  {
    title: 'Launching a neobank in 90 days',
    client: 'AURA Capital',
    results: 'Production launch in under three months with a full digital stack.',
    desc: 'AURA Capital used our digital banking suite to spin up a fully branded neobank — including onboarding, accounts, and cards — in record time, with regulatory compliance built in from day one.',
    category: 'Neobank Launch'
  }
]
