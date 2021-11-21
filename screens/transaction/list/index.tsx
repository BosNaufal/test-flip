import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Searchbar from "./Searchbar";
import SortingModal from "./SortingModal";
import TransactionItem, { transactionStatus } from "./TransactionItem";

interface ListTransactionScreenProps {}

const DATA = [
  {
    status: "PENDING",
    id: "string1",
    senderBank: "Permata",
    recieverBank: "BNI",
    recieverName: "SYIFA SALSABYLA",
    amount: 10028,
    createdAt: "2021-11-17 07:49:54",
  },
  {
    status: "SUCCESS",
    id: "string2",
    senderBank: "Permata",
    recieverBank: "BNI",
    recieverName: "SYIFA SALSABYLA",
    amount: 10028,
    createdAt: "2021-11-17 07:49:54",
  },
];

const ListTransactionScreen: React.FC<ListTransactionScreenProps> = () => {
  return (
    <View style={styles.pageWrapper}>
      <Searchbar />
      <SortingModal />
      <FlatList
        data={DATA}
        style={styles.listWrapper}
        renderItem={({ item }) => (
          <TransactionItem
            key={item.id}
            status={item.status as transactionStatus}
            id={item.id}
            senderBank={item.senderBank}
            recieverBank={item.recieverBank}
            recieverName={item.recieverName}
            amount={item.amount}
            createdAt={item.createdAt}
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
