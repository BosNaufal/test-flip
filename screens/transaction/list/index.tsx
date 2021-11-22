import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { TransactionStackParamsList } from "screens/types";
import Searchbar from "./Searchbar";
import SortingModal from "./SortingModal";
import TransactionList from "./TransactionList";

interface TransactionListScreenProps
  extends NativeStackScreenProps<
    TransactionStackParamsList,
    "TransactionList"
  > {}

const TransactionListScreen: React.FC<TransactionListScreenProps> = (props) => {
  const goToDetail = (id: string) => () => {
    props.navigation.navigate<"TransactionDetail">("TransactionDetail", { id });
  };
  return (
    <View style={styles.pageWrapper}>
      <Searchbar />
      <TransactionList onShouldGoToDetail={goToDetail} />
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
});

export default TransactionListScreen;
