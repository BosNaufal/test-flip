import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface SortingModalProps {
  onShouldClose: () => void;
  visible: boolean;
}

const SortingModal: React.FC<SortingModalProps> = (props) => {
  return (
    <Modal
      transparent={true}
      visible={props.visible}
      onRequestClose={props.onShouldClose}
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
