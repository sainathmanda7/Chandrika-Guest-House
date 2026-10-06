import Link from 'next/link'
import { nav, site, whatsappUrl } from '@/lib/site-data'

export function FooterPage() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-charcoal text-soft">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <span className="font-display text-3xl tracking-wide">Chandrika Guest House</span>
            <p className="max-w-xs text-sm leading-relaxed text-soft/60">
              A quiet homestay in the hills of {site.location}. Slow down, take in the views and feel
              at home.
            </p>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex w-fit items-center gap-2 border border-soft/30 px-6 py-3.5 text-[0.8125rem] font-medium uppercase tracking-[0.16em] transition-colors duration-500 hover:bg-soft hover:text-charcoal"
            >
              Book your stay <span aria-hidden="true">↗</span>
            </a>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-4">
            <span className="eyebrow text-soft/40">Explore</span>
            <ul className="flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-soft/75 transition-colors duration-300 hover:text-soft"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-4">
            <span className="eyebrow text-soft/40">Get in touch</span>
            <ul className="flex flex-col gap-3 text-sm text-soft/75">
              <li>
                <a href={site.phoneHref} className="transition-colors duration-300 hover:text-soft">
                  Call · {site.phone}
                </a>
              </li>
              <li>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-soft"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={site.mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-soft"
                >
                  Google Maps
                </a>
              </li>
              <li className="pt-1 text-soft/50">{site.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-2 border-t border-soft/15 pt-8 text-xs text-soft/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Chandrika Guest House. All rights reserved.</span>
          <span className="tracking-[0.16em] uppercase">Araku · Araku Valley · Andhra Pradesh</span>
        </div>
      </div>
    </footer>
  )
}
