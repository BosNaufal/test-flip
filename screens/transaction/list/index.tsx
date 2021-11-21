import React from "react";
import { StyleSheet, View } from "react-native";
import Searchbar from "./Searchbar";
import SortingModal from "./SortingModal";
import TransactionItem from "./TransactionItem";

interface ListTransactionScreenProps {}

const ListTransactionScreen: React.FC<ListTransactionScreenProps> = () => {
  return (
    <View style={styles.pageWrapper}>
      <Searchbar />
      <SortingModal />
      <TransactionItem
        status={"PENDING"}
        id={"string"}
        senderBank={"Permata"}
        recieverBank={"BNI"}
        recieverName={"SYIFA SALSABYLA"}
        amount={10028}
        createdAt={"2021-11-17 07:49:54"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});

export default ListTransactionScreen;
