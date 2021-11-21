import create from 'zustand'
import getTransactionList, { TransactionItemServer } from 'services/getTransactionList'
import { createFilterListByQuery, createSortingListByDate, createSortingListByString } from 'utils/data'

export enum sortingAnchorOptions {
  NAME_ASC = "Nama A-Z",
  NAME_DESC = "Nama Z-A",
  DATE_ASC = "Tanggal Terlama",
  DATE_DESC = "Tanggal Terbaru",
}

interface ITransactionStore {
  filterQuery: string,
  sortingAnchor: null | sortingAnchorOptions
  isShowingSortingModal: boolean,
  transactionList: TransactionItemServer[],
  originalTransactionResponse: { [index: string]: TransactionItemServer } | null,

  setFilterQuery: (query: string) => void,
  setSortingAnchor: (anchor: sortingAnchorOptions | null) => void,
  setIsShowingSortingModal: (newState: boolean) => void,
  loadTransactionList: () => Promise<TransactionItemServer[]>
}

const useTransactionStore = create<ITransactionStore>(set => ({
  filterQuery: "",
  sortingAnchor: null,
  isShowingSortingModal: false,
  transactionList: [],
  originalTransactionResponse: null,

  setFilterQuery: (query) => set(() => ({ filterQuery: query })),
  setSortingAnchor: (anchor) => set(() => ({ sortingAnchor: anchor })),
  setIsShowingSortingModal: (newState) => set(() => ({ isShowingSortingModal: newState })),

  loadTransactionList: () => {
    return getTransactionList().then((res) => {
      set(() => ({ originalTransactionResponse: res }))
      const transactionList = Object.keys(res).map((key) => ({
        ...res[key]
      }))
      set(() => ({ transactionList }))
      return transactionList
    })
  }
}))


const getFilteredList = (state: ITransactionStore) => {
  const ANCHOR_KEYS: (keyof TransactionItemServer)[] = [
    "amount",
    "sender_bank",
    "beneficiary_name",
    "beneficiary_bank",
  ]
  const filterListByQuery = createFilterListByQuery(state.transactionList, ANCHOR_KEYS)
  return filterListByQuery(state.filterQuery)
}

const getSortedAndFilteredList = (state: ITransactionStore) => {
  const filteredList = getFilteredList(state)

  const isSortedByDate = (
    state.sortingAnchor === sortingAnchorOptions.DATE_ASC
    || state.sortingAnchor === sortingAnchorOptions.DATE_DESC
  )
  if (isSortedByDate) {
    const sortingType = (
      state.sortingAnchor === sortingAnchorOptions.DATE_ASC ? "ASC" : "DESC"
    )
    const sortList = createSortingListByDate(filteredList, "created_at")
    return sortList(sortingType)
  }

  const isSortedByName = (
    state.sortingAnchor === sortingAnchorOptions.NAME_ASC
    || state.sortingAnchor === sortingAnchorOptions.NAME_DESC
  )
  if (isSortedByName) {
    const sortingType = (
      state.sortingAnchor === sortingAnchorOptions.NAME_ASC ? "ASC" : "DESC"
    )
    const sortList = createSortingListByString(filteredList, "beneficiary_name")
    return sortList(sortingType)
  }

  return filteredList
}

const getDetailTransaction = (id: string) => (state: ITransactionStore) => {
  return state.originalTransactionResponse![id]
}

export const transactionStoreSelector = {
  getFilteredList,
  getSortedAndFilteredList,
  getDetailTransaction
}


export default useTransactionStore