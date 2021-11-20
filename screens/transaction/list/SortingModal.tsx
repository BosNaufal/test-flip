import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useTransactionStore, {
  sortingAnchorOptions,
} from "../../../stores/useTransactionStore";

interface SortingModalProps {}

const SortingModal: React.FC<SortingModalProps> = () => {
  const isShowingSortingModal = useTransactionStore(
    (store) => store.isShowingSortingModal
  );
  const closeModal = useTransactionStore(
    (store) => () => store.setIsShowingSortingModal(false)
  );

  const setSortingAnchor = useTransactionStore(
    (store) => store.setSortingAnchor
  );

  const handleChooseOption = (anchor: sortingAnchorOptions | null) => () => {
    setSortingAnchor(anchor);
    closeModal();
  };

  return (
    <Modal
      transparent={true}
      visible={isShowingSortingModal}
      onRequestClose={closeModal}
    >
      <View style={styles.modalOuter}>
        <View style={styles.modalInner}>
          <TouchableOpacity
            onPress={handleChooseOption(null)}
            style={styles.optionItem}
          >
            <Text>URUTKAN</Text>
          </TouchableOpacity>
          {Object.keys(sortingAnchorOptions).map((key) => {
            const option: sortingAnchorOptions = (sortingAnchorOptions as any)[
              key
            ];
            return (
              <TouchableOpacity
                key={key}
                onPress={handleChooseOption(option)}
                style={styles.optionItem}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            );
          })}
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
    paddingHorizontal: 16,
    elevation: 3,
  },
  optionItem: {
    marginVertical: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
});

export default SortingModal;
