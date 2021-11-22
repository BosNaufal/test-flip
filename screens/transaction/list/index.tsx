import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { TransactionStackParamsList } from "screens/types";
import useTransactionStore, {
  transactionStoreSelector,
} from "stores/useTransactionStore";
import Searchbar from "./Searchbar";
import SortingModal from "./SortingModal";
import TransactionItem, { transactionStatus } from "./TransactionItem";

interface TransactionListScreenProps
  extends NativeStackScreenProps<
    TransactionStackParamsList,
    "TransactionList"
  > {}

const TransactionListScreen: React.FC<TransactionListScreenProps> = (props) => {
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

  const goToDetail = (id: string) => () => {
    props.navigation.navigate<"TransactionDetail">("TransactionDetail", { id });
  };

  return (
    <View style={styles.pageWrapper}>
      <Searchbar />

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
              onPress={goToDetail(item.id)}
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
    paddingTop: 10,
  },
  listWrapper: {
    marginTop: 10,
    paddingBottom: 70,
  },
});

export default TransactionListScreen;
