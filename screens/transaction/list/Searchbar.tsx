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
import useTransactionStore from "../../../stores/useTransactionStore";

interface SearchbarProps {}

const Searchbar: React.FC<SearchbarProps> = () => {
  const filterQuery = useTransactionStore((store) => store.filterQuery);
  const setFilterQuery = useTransactionStore((store) => store.setFilterQuery);
  const handleSubmit = (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => {
    setFilterQuery(e.nativeEvent.text);
  };

  const showSortingModal = useTransactionStore(
    (store) => () => store.setIsShowingSortingModal(true)
  );

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        value={filterQuery}
        placeholder="Cari nama, bank, atau nominal"
        onSubmitEditing={handleSubmit}
      />
      <TouchableOpacity onPress={showSortingModal}>
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
