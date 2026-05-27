import { ArrowUpRight } from 'lucide-react'

type FooterProps = {
  onToast?: (message: string) => void
}

type FooterItem = { label: string; target: string }

const locations = [
  {
    city: 'London',
    lines: [
      'Linktia Infosystems Ltd – CB7,',
      '26 Main Road Sundridge, TN14 6EP,',
      'England, United Kingdom.'
    ]
  },
  {
    city: 'Dubai',
    lines: [
      'Linktia Infosystems Ltd –',
      'CB7, Jumeirah Business Center 5',
      'Cluster W, Jumeirah Lakes Towers,',
      'Dubai, United Arab Emirates'
    ]
  },
  {
    city: 'London',
    lines: [
      'Linktia Infosystems Ltd –',
      'CB7, Nirmal, Anand Nagar,',
      'Suncity Road, Pune,',
      'Maharashtra, 411041, India'
    ]
  }
]

const columns: { title: string; items: FooterItem[] }[] = [
  {
    title: 'Solutions',
    items: [
      { label: 'Core Banking CB7', target: 'solutions' },
      { label: 'Digital Banking N7', target: 'solutions' },
      { label: 'Open Banking', target: 'solutions' },
      { label: 'Loan Origination System', target: 'solutions' },
      { label: 'Loan Management System', target: 'solutions' },
      { label: 'Digital Transformation', target: 'solutions' }
    ]
  },
  {
    title: 'N7 Banking',
    items: [
      { label: 'About Us', target: 'about' },
      { label: 'Solutions', target: 'solutions' },
      { label: 'Contact', target: 'about' },
      { label: 'Company', target: 'about' },
      { label: 'Careers', target: 'about' },
      { label: 'Insights', target: 'insights' },
      { label: 'Core Team', target: 'about' },
      { label: 'Brand Center', target: 'home' }
    ]
  },
  {
    title: 'Our Socials',
    items: [
      { label: 'LinkedIn', target: 'social' },
      { label: 'X', target: 'social' }
    ]
  }
]

export default function Footer({ onToast }: FooterProps) {
  const handleClick = (item: FooterItem) => {
    if (item.target === 'social') {
      onToast?.(`Opening ${item.label}`)
      return
    }
    const el = document.getElementById(item.target)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      onToast?.(`Jumping to ${item.label}`)
    }
  }

  return (
    <footer className="bg-[#020B12] overflow-hidden">

      <div className=" mx-auto px-16 py-20">

        {/* TOP */}
        <div className="grid grid-cols-12 gap-20">

          {/* LEFT BIG N7 */}
          <div className="col-span-4">

            <div className="relative inline-block">

              {/* Moving Dark Overlay */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="moving-shadow absolute top-0 left-0  h-full bg-black/30 blur-[50px]" />
              </div>

              {/* TEXT */}
              <h1
                className="
                  relative
                  z-10
                  text-[360px]
                  leading-[0.8]
                  font-[600]
                  tracking-[-0.08em]
                  bg-gradient-to-b
                  from-[#168DFF]
                  to-[#11C7EA]
                  bg-clip-text
                  text-transparent
                  select-none
                "
              >
                N7
              </h1>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="col-span-8 flex flex-col justify-between">

            {/* LOCATIONS */}
            <div className="grid grid-cols-3 gap-16 pb-24">

              {locations.map((loc) => (
                <div key={loc.city}>

                  <h4 className="text-white text-[22px] font-medium mb-5">
                    {loc.city}
                  </h4>

                  <div className="space-y-1 text-white/55 text-[16px] leading-[1.5] font-light">
                    {loc.lines.map((line, i) => (
                      <p key={i}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* LINKS */}
            <div className="grid grid-cols-3 gap-16">

              {columns.map((col) => (
                <div key={col.title}>

                  <h4 className="text-white text-[24px] font-medium mb-8">
                    {col.title}
                  </h4>

                  <div className="space-y-5">

                    {col.items.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleClick(item)}
                        className="
                          group
                          flex
                          items-center
                          justify-between
                          gap-6
                          w-full
                          text-left
                          text-white/60
                          hover:text-[#14BFFF]
                          transition-all
                          duration-300
                          text-[18px]
                        "
                      >
                        <span>{item.label}</span>

                        <ArrowUpRight
                          className="
                            w-5
                            h-5
                            opacity-0
                            -translate-x-2
                            group-hover:opacity-100
                            group-hover:translate-x-0
                            transition-all
                            duration-300
                          "
                        />
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-24 pt-10 border-t border-white/10">
          <p className="text-white/55 text-[14px] leading-[1.6] font-light text-center max-w-5xl mx-auto">
            Copyright © 2022 by Linktia Infosystems Limited — [CB7 and N7 as Commercial Brand] — [Registered under the Companies Act 2006 in England and Wales | Number of Incorporation 13100992]
          </p>
        </div>
      </div>

      {/* Animation */}
      <style>{`
  .moving-shadow {
    animation: moveAcross 6s linear infinite;
  }

  @keyframes moveAcross {
    0% {
      transform: translateX(-180px);
    }

    100% {
      transform: translateX(500px);
    }
  }
`}</style>
    </footer>
  )
}