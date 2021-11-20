import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useTransactionStore from "../../../stores/useTransactionStore";

interface SortingModalProps {}

const SortingModal: React.FC<SortingModalProps> = () => {
  const isShowingSortingModal = useTransactionStore(
    (store) => store.isShowingSortingModal
  );
  const closeModal = useTransactionStore(
    (store) => () => store.setIsShowingSortingModal(false)
  );

  return (
    <Modal
      transparent={true}
      visible={isShowingSortingModal}
      onRequestClose={closeModal}
    >
      <View style={styles.modalOuter}>
        <View style={styles.modalInner}>
          <TouchableOpacity style={styles.optionItem}>
            <Text>URUTKAN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem}>
            <Text>Nama A-Z</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem}>
            <Text>Nama Z-A</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItem}>
            <Text>Tanggal Terbaru</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
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
    backgroundColor: "#fff",
    width: "85%",
    paddingVertical: 24,
    paddingHorizontal: 24,
    elevation: 3,
  },
  optionItem: {
    marginVertical: 12,
  },
});

export default SortingModal;
