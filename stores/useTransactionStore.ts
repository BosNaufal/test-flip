import create from 'zustand'
import getTransactionList, { TransactionItemServer } from '../services/getTransactionList'

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

  setFilterQuery: (query) => set(() => ({ filterQuery: query })),
  setSortingAnchor: (anchor) => set(() => ({ sortingAnchor: anchor })),
  setIsShowingSortingModal: (newState) => set(() => ({ isShowingSortingModal: newState })),

  loadTransactionList: () => {
    return getTransactionList().then((res) => {
      const transactionList = Object.keys(res).map((key) => ({
        ...res[key]
      }))
      set(() => ({ transactionList }))
      return transactionList
    })
  }
}))

export default useTransactionStore