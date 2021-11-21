import React, { useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  View,
} from "react-native";
import useTransactionStore from "stores/useTransactionStore";
import Searchbar from "./Searchbar";
import SortingModal from "./SortingModal";
import TransactionItem, { transactionStatus } from "./TransactionItem";

interface ListTransactionScreenProps {}

const ListTransactionScreen: React.FC<ListTransactionScreenProps> = () => {
  const transactionList = useTransactionStore((store) => store.transactionList);
  const loadTransactionList = useTransactionStore(
    (store) => store.loadTransactionList
  );
  useEffect(() => {
    loadTransactionList();
  }, []);

  return (
    <View style={styles.pageWrapper}>
      <Searchbar />
      <SortingModal />
      <FlatList
        data={transactionList}
        style={styles.listWrapper}
        renderItem={({ item }) => (
          <TransactionItem
            key={item.id}
            id={item.id}
            status={item.status as transactionStatus}
            senderBank={item.sender_bank}
            recieverBank={item.beneficiary_bank}
            recieverName={item.beneficiary_name}
            amount={item.amount}
            createdAt={item.created_at}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  listWrapper: {
    marginTop: 10,
  },
});

export default ListTransactionScreen;
