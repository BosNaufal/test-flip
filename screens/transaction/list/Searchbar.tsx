import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

interface SearchbarProps {}

const Searchbar: React.FC<SearchbarProps> = () => {
  return (
    <View style={styles.wrapper}>
      <TextInput style={styles.input} placeholder="Cari nama, bank, atau nominal" />
      <View style={styles.sortingButton}>
        <Text>URUTKAN</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
  
  },
  input: {
    flex: 1,
  },
  sortingButton: {
  }
});

export default Searchbar;
