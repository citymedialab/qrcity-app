'use client'
import Image from 'next/image'
import {urlFor} from '@/app/lib/image'

type NewsAd = {
  _id?: string
  newsAdText?: string
  newsAdImage?: any
  newsAdCtaLabel?: string
  newsAdCtaUrl?: string
}

export default function NewsInlineAd({ad}: {ad: NewsAd | null}) {
  if (!ad) return null

  const {newsAdText, newsAdImage, newsAdCtaLabel, newsAdCtaUrl} = ad

  return (
    <section className="mt-6">
      <div className="text-xs uppercase tracking-wide opacity-70 mb-2">sponsored</div>

      <div className="rounded-2xl border p-3 shadow-sm bg-white">
        {/* Κείμενο πάνω από την εικόνα (αν υπάρχει) */}
        {newsAdText && (
          <p className="text-sm leading-5 mb-2">
            {newsAdText}
          </p>
        )}

        {/* Εικόνα διαφήμισης */}
        {newsAdImage && (
          <div className="relative w-full h-40 sm:h-56 overflow-hidden rounded-xl">
            <Image
              src={urlFor(newsAdImage).width(1000).fit('crop').url()}
              alt="Sponsored"
              fill
              sizes="(max-width: 640px) 100vw, 640px"
              className="object-cover"
            />
          </div>
        )}

        {/* CTA */}
        {newsAdCtaLabel && newsAdCtaUrl && (
          <div className="mt-3">
            <a
              href={newsAdCtaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full px-4 py-2 text-sm font-semibold bg-yellow-400 hover:bg-yellow-300 text-black transition"
            >
              {newsAdCtaLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
