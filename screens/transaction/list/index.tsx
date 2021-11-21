import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import useTransactionStore, { transactionStoreSelector } from "stores/useTransactionStore";
import THEMES from "themes";
import Searchbar from "./Searchbar";
import SortingModal from "./SortingModal";
import TransactionItem, { transactionStatus } from "./TransactionItem";

interface ListTransactionScreenProps {}

const ListTransactionScreen: React.FC<ListTransactionScreenProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const transactionList = useTransactionStore(transactionStoreSelector.getSortedAndFilteredList);
  const loadTransactionList = useTransactionStore(
    (store) => store.loadTransactionList
  );
  useEffect(() => {
    setIsLoading(true);
    loadTransactionList().finally(() => {
      setIsLoading(false);
    });
  }, []);

  return (
    <View style={styles.pageWrapper}>
      <Searchbar />

      <View>
        {isLoading && (
          <ActivityIndicator
            style={styles.listWrapper}
            size="large"
            animating={true}
            color={THEMES.colors.primary}
          />
        )}
        <FlatList
          data={transactionList}
          contentContainerStyle={styles.listWrapper}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TransactionItem
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
      <SortingModal />
    </View>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    paddingVertical: 10,
    paddingBottom: 0,
    paddingHorizontal: 10,
  },
  listWrapper: {
    marginTop: 10,
    paddingBottom: 10,
  },
});

export default ListTransactionScreen;
