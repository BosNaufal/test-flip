
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