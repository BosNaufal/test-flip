
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

export const bankNameToUppercase = (bankName: string) => {
  const LENGTH_TO_UPPERCASE_ALL = 4 
  const isConvertAllToUpperCase = bankName.length <= LENGTH_TO_UPPERCASE_ALL
  if (isConvertAllToUpperCase) return bankName.toUpperCase()
  const [firstChar, ...restChar] = bankName
  const capitalized = [firstChar.toUpperCase(), ...restChar].join("")
  return capitalized
}
