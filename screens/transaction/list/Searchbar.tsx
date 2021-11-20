import React from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEventData,
  TouchableOpacity,
  View,
} from "react-native";
import THEMES from "../../../themes";

interface SearchbarProps {
  onShouldOpenSortingModal: () => void;
  onShouldFilter: (query: string) => void;
}

const Searchbar: React.FC<SearchbarProps> = (props) => {
  const handleSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    props.onShouldFilter(e.nativeEvent.text);
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="Cari nama, bank, atau nominal"
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity onPress={props.onShouldOpenSortingModal}>
        <Text style={styles.sortingButtonText}>URUTKAN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
  },
  input: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    flex: 1,
    fontSize: 18,
  },
  sortingButtonText: {
    fontWeight: "700",
    color: THEMES.colors.primary,
  },
});

export default Searchbar;
