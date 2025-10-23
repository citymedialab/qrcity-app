// Europe/Athens ημερομηνία τύπου YYYY-MM-DD
export const todayStr = () => {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

type Schedule = { cityDates?: string[]; areaDates?: string[] }
type Ctx = { cityId?: string; areaId?: string }
type Targeting = {
  cities?: Array<{ _id?: string }>
  areas?: Array<{ _id?: string }>
}

// Αν ΔΕΝ υπάρχει schedule => το θεωρούμε ενεργό
export function isAdActiveToday(s: Schedule | undefined, ctx: Ctx) {
  if (!s) return true
  const t = todayStr()
  // Area υπερισχύει (αν έχουμε area context)
  if (ctx.areaId && s.areaDates?.includes(t)) return true
  if (s.cityDates?.includes(t)) return true
  return false
}

// Αν δεν έχει δηλωθεί targeting, το θεωρούμε ok
export function respectsTargeting(targeting: Targeting | undefined, ctx: Ctx) {
  const cityOk =
    !targeting?.cities?.length ||
    (ctx.cityId ? targeting!.cities!.some((c) => c?._id === ctx.cityId) : true)

  const areaOk =
    !targeting?.areas?.length ||
    (ctx.areaId ? targeting!.areas!.some((a) => a?._id === ctx.areaId) : true)

  return cityOk && areaOk
}
