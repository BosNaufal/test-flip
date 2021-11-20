import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import SortingModal from "./SortingModal";

interface ListTransactionScreenProps {}

const ListTransactionScreen: React.FC<ListTransactionScreenProps> = () => {
  const [modalShow, setModalShow] = useState(true);
  return (
    <View>
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
  modalOuter: {
    backgroundColor: "rgba(0, 0, 0, .4)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalInner: {
    borderRadius: 8,
    backgroundColor: "white",
    width: "85%",
    paddingVertical: 24,
    paddingHorizontal: 24,
    elevation: 3,
  },
  optionItem: {
    marginVertical: 12,
  },
});

export default ListTransactionScreen;
