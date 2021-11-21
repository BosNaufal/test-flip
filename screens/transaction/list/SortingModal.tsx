import React, { useMemo } from "react";
import { Modal, StyleSheet, View } from "react-native";
import useTransactionStore, {
  sortingAnchorOptions,
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

  const activeOption = useTransactionStore((store) => store.sortingAnchor);
  const setSortingAnchor = useTransactionStore(
    (store) => store.setSortingAnchor
  );
  const handleChooseOption = (anchor: sortingAnchorOptions | null) => () => {
    setSortingAnchor(anchor);
    closeModal();
  };

  const optionsList = useMemo(
    () =>
      Object.keys(sortingAnchorOptions).map((key) => {
        const option: sortingAnchorOptions = (sortingAnchorOptions as any)[key];
        return option;
      }),
    []
  );

  return (
    <Modal
      transparent={true}
      visible={isShowingSortingModal}
      onRequestClose={closeModal}
    >
      <View style={styles.modalOuter}>
        <View style={styles.modalInner}>
          <SortingOption
            checked={activeOption === null}
            onPress={handleChooseOption(null)}
            label={"URUTKAN"}
          />
          {optionsList.map((option, index) => (
            <SortingOption
              key={index}
              checked={activeOption === option}
              onPress={handleChooseOption(option)}
              label={option}
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
