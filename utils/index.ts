
const ID_MONTHS = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember"
]
export const ISOStringDateToLocaleDate = (ISOStringDate: string) => {
  const date = new Date(ISOStringDate)
  const dateNumber = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  return `${dateNumber} ${ID_MONTHS[month]} ${year}`
}
