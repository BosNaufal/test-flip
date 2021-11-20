import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Searchbar from "./Searchbar";
import SortingModal from "./SortingModal";

interface ListTransactionScreenProps {}

const ListTransactionScreen: React.FC<ListTransactionScreenProps> = () => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <View>
      <Searchbar />
      <SortingModal
        visible={modalShow}
        onShouldClose={() => {
          setModalShow(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ListTransactionScreen;
