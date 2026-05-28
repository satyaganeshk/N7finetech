type Item = { src: string; alt: string } | { text: string }

export default function PartnerBar() {
  const items: Item[] = [
    { src: '/BannerThings/N7.png', alt: 'N7' },
    { text: 'Say 👋 to the new way of banking' },
    { src: '/BannerThings/CB7 (1).png', alt: 'CB7' },
    { text: 'Say 👋 to the new way of banking' }
  ]
  const track = [...items, ...items, ...items]

  return (
    <section className="bg-[#f1f3fa] overflow-hidden py-6 border-y border-[#1745CC]/30">
      <div className="marquee-track flex items-center gap-10 whitespace-nowrap">
        {track.map((item, idx) => (
          <div key={idx} className="flex items-center gap-10 shrink-0">
            {'src' in item ? (
              <img loading="lazy" decoding="async"
                src={encodeURI(item.src)}
                alt={item.alt}
                className="h-8 md:h-10 w-auto object-contain"
              />
            ) : (
              <span className="text-black text-2xl md:text-[28px] tracking-tight font-light">
                {item.text}
              </span>
            )}
            <img loading="lazy" decoding="async" src="/BannerThings/bannerStar.png" alt="" className="w-8 h-8" />
          </div>
        ))}
      </div>
    </section>
  )
}
