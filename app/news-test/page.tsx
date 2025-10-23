import {sanity} from '@/app/lib/sanity.client'
import {groq} from 'next-sanity'
import SlideBasicNews from '@/app/components/SlideBasicNews'

// ✅ βάλε εδώ προσωρινά ένα υπαρκτό slug ή id από το Sanity σου
const BASIC_NEWS_QUERY = groq`
  *[_type=="topic" && template=="basic"][0]{
    _id,
    template,
    title,
    lead,
    body,
    heroImage,
    inlineAdBlock{
      respectSchedule,
      ad->{
        _id,
        newsAdText,
        newsAdImage,
        newsAdCtaLabel,
        newsAdCtaUrl,
        schedule{cityDates,areaDates},
        targeting{
          cities[]->{_id,slug},
          areas[]->{_id,slug}
        }
      }
    }
  }
`

export default async function NewsTestPage() {
  const topic = await sanity.fetch(BASIC_NEWS_QUERY)
  const ctx = {
    cityId: 'demoCity', // προσωρινά
    areaId: 'demoArea',
  }

  if (!topic) return <div className="p-6">⚠️ Δεν βρέθηκε basic topic στο Sanity</div>

  return (
    <main className="max-w-[480px] mx-auto">
      <SlideBasicNews topic={topic} ctx={ctx} />
    </main>
  )
}
