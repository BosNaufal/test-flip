import create from 'zustand'
import getTransactionList, { TransactionItemServer } from 'services/getTransactionList'
import { createFilterListByQuery, createSortingListByDate, createSortingListByString } from 'utils/data'

export type sortingOptionItem = {
  anchorKey: keyof TransactionItemServer | null;
  type: "ASC" | "DESC";
  label: string;
};

export const SORTING_OPTIONS: sortingOptionItem[] = [
  { anchorKey: null, type: "ASC", label: "URUTKAN" },
  { anchorKey: "beneficiary_name", type: "ASC", label: "Nama A-Z" },
  { anchorKey: "beneficiary_name", type: "DESC", label: "Nama Z-A" },
  { anchorKey: "created_at", type: "ASC", label: "Tanggal Terlama" },
  { anchorKey: "created_at", type: "DESC", label: "Tanggal Terbaru" },
];

interface ITransactionStore {
  filterQuery: string
  sortingOption: sortingOptionItem
  isShowingSortingModal: boolean
  transactionList: TransactionItemServer[]
  originalTransactionResponse: { [index: string]: TransactionItemServer } | null

  setFilterQuery: (query: string) => void
  setSortingOption: (option: sortingOptionItem) => void
  setIsShowingSortingModal: (newState: boolean) => void
  loadTransactionList: () => Promise<TransactionItemServer[]>
}

const useTransactionStore = create<ITransactionStore>(set => ({
  filterQuery: "",
  sortingOption: SORTING_OPTIONS[0],
  isShowingSortingModal: false,
  transactionList: [],
  originalTransactionResponse: null,

  setFilterQuery: (query) => set(() => ({ filterQuery: query })),
  setSortingOption: (sortingOption: sortingOptionItem) => set(() => ({ sortingOption })),
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
  const { type, anchorKey } = state.sortingOption
  let sortingFunctionCreator = null

  const isUnsorted = anchorKey === null
  if (isUnsorted) return filteredList

  const isSortedByDate = anchorKey === "created_at"
  if (isSortedByDate) sortingFunctionCreator = createSortingListByDate

  const isSortedByName = anchorKey === "beneficiary_name"
  if (isSortedByName) sortingFunctionCreator = createSortingListByString

  const sortList = sortingFunctionCreator!(filteredList, anchorKey!)
  return sortList(type)
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