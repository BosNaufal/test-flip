import React from "react";
import { Modal, StyleSheet, View } from "react-native";
import useTransactionStore, {
  sortingOptionItem,
  SORTING_OPTIONS,
} from "stores/useTransactionStore";
import SortingOption from "./SortingOption";

interface SortingModalProps {}

const SortingModal: React.FC<SortingModalProps> = () => {
  const isShowingSortingModal = useTransactionStore(
    (store) => store.isShowingSortingModal
  );
  const closeModal = useTransactionStore(
    (store) => () => store.setIsShowingSortingModal(false)
  );

  const isActiveOption = useTransactionStore(
    (store) => (option: sortingOptionItem) => {
      return (
        option.anchorKey === store.sortingOption.anchorKey &&
        option.type === store.sortingOption.type
      );
    }
  );
  const setSortingOption = useTransactionStore(
    (store) => store.setSortingOption
  );
  const handleChooseOption = (option: sortingOptionItem) => () => {
    setSortingOption(option);
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
          {SORTING_OPTIONS.map((option, index) => (
            <SortingOption
              key={index}
              checked={isActiveOption(option)}
              onPress={handleChooseOption(option)}
              label={option.label}
            />
          ))}
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
});

export default SortingModal;
