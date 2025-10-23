import Image from 'next/image'
import NewsInlineAd from '@/app/components/NewsInlineAd'
import {urlFor} from '@/app/lib/image'
import {isAdActiveToday, respectsTargeting} from '@/app/lib/schedule'

type InlineAdBlock = {
  respectSchedule?: boolean
  ad?: any // topic (newsAd) με πεδία schedule/targeting
}

type BasicTopic = {
  _id: string
  template: 'basic'
  title?: string
  lead?: string
  body?: string
  heroImage?: any
  inlineAdBlock?: InlineAdBlock
}

type Ctx = { cityId?: string; areaId?: string }

export default function SlideBasicNews({
  topic,
  ctx,
}: {
  topic: BasicTopic
  ctx: Ctx
}) {
  const {title, lead, body, heroImage, inlineAdBlock} = topic

  // Υπολογισμός αν θα δείξουμε το inline ad
  let inlineAdToShow: any = null
  if (inlineAdBlock?.ad) {
    const ad = inlineAdBlock.ad
    const shouldRespect = inlineAdBlock.respectSchedule !== false // default: true

    const okBySchedule = isAdActiveToday(ad?.schedule, ctx)
    const okByTarget = respectsTargeting(ad?.targeting, ctx)

    const allowed = shouldRespect ? okBySchedule && okByTarget : true
    inlineAdToShow = allowed ? ad : null
  }

  return (
    <article className="pb-8">
      {/* HERO */}
      <div className="relative w-full h-72 sm:h-80 bg-neutral-100 overflow-hidden">
        {heroImage ? (
          <Image
            src={urlFor(heroImage).width(1200).fit('crop').url()}
            alt={title || 'News'}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-neutral-200 to-neutral-100" />
        )}

        {/* Overlay header (απλό, θα το καλλωπίσουμε μετά) */}
        <div className="absolute inset-x-0 top-0 p-3 flex items-center justify-between bg-gradient-to-b from-black/40 to-transparent text-white">
          <div className="text-xs font-semibold uppercase tracking-wide">qrcity</div>
          <div className="text-xs opacity-90">
            {new Date().toLocaleDateString('el-GR', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </div>
        </div>
      </div>

      {/* CARD */}
      <div className="-mt-6 mx-3 rounded-3xl bg-white shadow-lg p-4">
        {title && <h2 className="text-xl font-bold mb-1">{title}</h2>}
        {lead && <p className="text-sm text-neutral-600 mb-3">{lead}</p>}
        {body && <p className="text-base leading-7 whitespace-pre-wrap">{body}</p>}

        {/* Inline Ad (sponsored) */}
        <NewsInlineAd ad={inlineAdToShow} />
      </div>
    </article>
  )
}
