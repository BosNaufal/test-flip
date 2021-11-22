import React from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import THEMES from "themes";
import useTransactionStore from "stores/useTransactionStore";
import BaseText from "components/BaseText";

interface SearchbarProps {}

const Searchbar: React.FC<SearchbarProps> = () => {
  const setFilterQuery = useTransactionStore((store) => store.setFilterQuery);
  const handleChangeQuery = (text: string | undefined) => {
    setFilterQuery(text || "");
  };

  const sortingAnchor = useTransactionStore((store) => store.sortingAnchor);
  const showSortingModal = useTransactionStore(
    (store) => () => store.setIsShowingSortingModal(true)
  );

  return (
    <View style={styles.wrapper}>
      <Image
        source={require("assets/search-icon.png")}
        style={styles.searchIconImage}
      />
      <TextInput
        style={styles.input}
        placeholder="Cari nama, bank, atau nominal"
        onChangeText={handleChangeQuery}
      />
      <TouchableOpacity style={styles.sortingOuter} onPress={showSortingModal}>
        <BaseText style={styles.sortingButtonText}>
          {sortingAnchor === null ? "URUTKAN" : sortingAnchor}
        </BaseText>
        <Image
          source={require("assets/arrow-down-icon.png")}
          style={styles.arrowDownIconImage}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#ffffff",
  },
  searchIconImage: {
    height: 20,
    width: 20,
    marginRight: 8,
  },
  input: {
    paddingHorizontal: 0,
    paddingRight: 8,
    paddingVertical: 8,
    flex: 1,
    fontSize: 16,
  },
  sortingOuter: {
    flexDirection: "row",
    alignItems: "center"
  },
  sortingButtonText: {
    fontWeight: "700",
    color: THEMES.colors.primary,
    fontSize: 14,
  },
  arrowDownIconImage: {
    height: 8,
    width: 17,
    marginLeft: 4,
  }
});

export default Searchbar;
