import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import useTransactionStore, {
  transactionStoreSelector,
} from "stores/useTransactionStore";
import TransactionItem, { transactionStatus } from "./TransactionItem";

interface TransactionListProps {
  onShouldGoToDetail: (id: string) => () => void
}

const TransactionList: React.FC<TransactionListProps> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const transactionList = useTransactionStore(
    transactionStoreSelector.getSortedAndFilteredList
  );
  const loadTransactionList = useTransactionStore(
    (store) => store.loadTransactionList
  );

  const handleRefresh = () => {
    setIsLoading(true);
    loadTransactionList().finally(() => {
      setIsLoading(false);
    });
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <View>
      <FlatList
        data={transactionList}
        contentContainerStyle={styles.listWrapper}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TransactionItem
            onPress={props.onShouldGoToDetail(item.id)}
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
  listWrapper: {
    marginTop: 10,
    paddingBottom: 70,
  },
});

export default TransactionList;
