import { convertMySQLDateToJSDate } from "utils"

export const createFilterListByQuery = <T>(list: T[], anchorKeys?: (keyof T)[]) => (query: string) => {
  // refs: https://stackoverflow.com/questions/19448957/why-is-regexp-test-not-consistent
  // remove 'g' flag to prevent inconsistency in regex.test()
  const regex = new RegExp(`${query.toLowerCase()}`, 'im')

  return list.filter((item) => {
    // list all anchor keys. it can be custom or default by checking all field keys in the object
    const validAnchorKeys = anchorKeys || Object.keys(item) as (keyof T)[]

    let isIncluded = false
    let stopFinding = false
    let currentKeyIndex = 0

    // abort early when it found matched
    while (!stopFinding) {
      const currentKey = validAnchorKeys[currentKeyIndex]
      const currentValue = item[currentKey]

      // make sure convert number to string
      const currentValueString = (currentValue as any).toString().toLowerCase()

      // test it with query. is it matched?
      const isMatchedTheQuery = regex.test(currentValueString)
      if (isMatchedTheQuery) {
        isIncluded = true
        stopFinding = true
        break;
      }

      // if there's other key, do search. else, stop finding
      if (currentKeyIndex < validAnchorKeys.length - 1) {
        currentKeyIndex++
      } else {
        stopFinding = true
      }
    }

    return isIncluded
  })
}

const calculateSortingString = (a: string, b: string) => {
  const _a = a.toLowerCase()
  const _b = b.toLowerCase()
  if (_a < _b) return -1
  if (_a > _b) return 1
  return 0
}

const calculateSortingNumber = (a: number, b: number) => {
  if (a < b) return -1
  if (a > b) return 1
  return 0
}

// refs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
export const createSortingListByDate = <T>(list: T[], anchorKey: keyof T) => (sortingType: "ASC" | "DESC") => {
  const immutableList = [...list]
  return immutableList.sort((a, b) => {
    const aValue = a[anchorKey] as any
    const bValue = b[anchorKey] as any
    const aTime = (convertMySQLDateToJSDate(aValue)).getTime() 
    const bTime = (convertMySQLDateToJSDate(bValue)).getTime() 
    const SORT_ANCHOR = sortingType === "DESC" ? -1 : 1
    return calculateSortingNumber(aTime, bTime) * SORT_ANCHOR
  })
}

// refs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
export const createSortingListByString = <T>(list: T[], anchorKey: keyof T) => (sortingType: "ASC" | "DESC") => {
  const immutableList = [...list]
  return immutableList.sort((a, b) => {
    const aValue = a[anchorKey] as any
    const bValue = b[anchorKey] as any
    const SORT_ANCHOR = sortingType === "DESC" ? -1 : 1
    return calculateSortingString(aValue, bValue) * SORT_ANCHOR
  })
}