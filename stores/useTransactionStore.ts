import create from 'zustand'

interface ITransactionStore {
  filterQuery: string,
  isShowingSortingModal: boolean,
  setIsShowingSortingModal: (newState: boolean) => void,
  setFilterQuery: (query: string) => void,
}

const useTransactionStore = create<ITransactionStore>(set => ({
  filterQuery: "",
  isShowingSortingModal: false,

  setIsShowingSortingModal: (newState) => set(() => ({ isShowingSortingModal: newState })),
  setFilterQuery: (query) => set(() => ({ filterQuery: query })),
}))

export default useTransactionStore