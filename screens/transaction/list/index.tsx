import React from "react";
import { StyleSheet, View } from "react-native";
import Searchbar from "./Searchbar";
import SortingModal from "./SortingModal";

interface ListTransactionScreenProps {}

const ListTransactionScreen: React.FC<ListTransactionScreenProps> = () => {
  return (
    <View style={styles.pageWrapper}>
      <Searchbar />
      <SortingModal />
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
