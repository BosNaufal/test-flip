import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Searchbar from "./Searchbar";
import SortingModal from "./SortingModal";

interface ListTransactionScreenProps {}

const ListTransactionScreen: React.FC<ListTransactionScreenProps> = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <View style={styles.pageWrapper}>
      <Searchbar onShouldFilter={() => {}} onShouldOpenSortingModal={() => {}} />
      <SortingModal
        visible={modalShow}
        onShouldClose={() => {
          setModalShow(false);
        }}
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
