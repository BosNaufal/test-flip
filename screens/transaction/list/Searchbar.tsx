import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import THEMES from "../../../themes";

interface SearchbarProps {}

const Searchbar: React.FC<SearchbarProps> = () => {
  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="Cari nama, bank, atau nominal"
      />
      <View>
        <Text style={styles.sortingButtonText}>URUTKAN</Text>
      </View>
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
