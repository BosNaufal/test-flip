import create from 'zustand'

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
  setFilterQuery: (query: string) => void,
  setSortingAnchor: (anchor: sortingAnchorOptions | null) => void,
  setIsShowingSortingModal: (newState: boolean) => void,
}

const useTransactionStore = create<ITransactionStore>(set => ({
  filterQuery: "",
  sortingAnchor: null,
  isShowingSortingModal: false,

  setFilterQuery: (query) => set(() => ({ filterQuery: query })),
  setSortingAnchor: (anchor) => set(() => ({ sortingAnchor: anchor })),
  setIsShowingSortingModal: (newState) => set(() => ({ isShowingSortingModal: newState })),
}))

export default useTransactionStore