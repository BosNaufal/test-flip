import { StatusBar } from "expo-status-bar";
import React, { Fragment } from "react";
import { StyleSheet, Text, View } from "react-native";
import ListTransactionScreen from "./screens/transaction/list";

export default function App() {
  return (
    <Fragment>
      <StatusBar style="auto" />
      <ListTransactionScreen />
    </Fragment>
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on your app!</Text>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
