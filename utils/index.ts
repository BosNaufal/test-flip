
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

/* refs: https://stackoverflow.com/a/22740336 */
// Prevent invalid date when it run in not debug mode react native
export const convertMySQLDateToJSDate = (mySqlDate: string) => {
  const [originalDateString, originalTime] = mySqlDate.split(" ")
  const [year, month, dateNumber] = originalDateString.split("-").map((item) => parseInt(item))
  const [hour, minute] = originalTime.split(":").map((item) => parseInt(item))
  const date = new Date(year, month, dateNumber, hour, minute)
  return date
}

export const MySqlStringDateToLocaleDate = (mySqlDate: string) => {
  const [originalDateString] = mySqlDate.split(" ")
  const [year, month, dateNumber] = originalDateString.split("-").map((item) => parseInt(item))
  return `${dateNumber} ${ID_MONTHS[month - 1]} ${year}`
}

export const bankNameToUppercase = (bankName: string) => {
  const LENGTH_TO_UPPERCASE_ALL = 4
  const isConvertAllToUpperCase = bankName.length <= LENGTH_TO_UPPERCASE_ALL
  if (isConvertAllToUpperCase) return bankName.toUpperCase()
  const [firstChar, ...restChar] = bankName
  const capitalized = [firstChar.toUpperCase(), ...restChar].join("")
  return capitalized
}

export const convertToRupiahCurrency = (amount: number) => {
  const COMMA_PER_CHAR_LENGTH = 3

  let amountString = amount.toString()
  const digitLength = amountString.length
  const modulusResult = digitLength % COMMA_PER_CHAR_LENGTH
  const commaCount = (digitLength - modulusResult) / COMMA_PER_CHAR_LENGTH

  let firstGroup: string[] = []
  if (modulusResult > 0) {
    // get first group
    firstGroup = [amountString.substr(0, modulusResult)]
    // remove first group from amount string
    amountString = amountString.substr(modulusResult, digitLength)
  }

  // grouping all digit. 3 item per group
  let allGroups = []
  for (let i = 0; i < commaCount; i++) {
    allGroups.push(
      amountString.substr(
        i * COMMA_PER_CHAR_LENGTH,
        COMMA_PER_CHAR_LENGTH
      )
    )
  }

  const concatGroups = [...firstGroup, ...allGroups]
  return concatGroups.join(".")
}
