
const BASE_API_URL = "https://nextar.flip.id/frontend-test"

export interface TransactionItemServer {
  id: string;
  amount: number;
  unique_code: number;
  status: string;
  sender_bank: string;
  account_number: string;
  beneficiary_name: string;
  beneficiary_bank: string;
  remark: string;
  created_at: string;
  completed_at: string;
  fee: number;
}

interface TransactionListServer {
  [index: string]: TransactionItemServer
}

const getTransactionList = () => (
  fetch(BASE_API_URL).then((res) => res.json() as unknown as TransactionListServer).catch((err) => {
    console.error(err)
    return err
  })
)

export default getTransactionList