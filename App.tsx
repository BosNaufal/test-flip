import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, SafeAreaView, StyleSheet, Text, View } from "react-native";
import ListTransactionScreen from "./screens/transaction/list";

export default function App() {
  return (
    <SafeAreaView
      style={[
        styles.container,
        // need to implement this gist:
        /* refs: https://gist.github.com/dantman/235833869dab844340ee530c1643a208 */
        //
        {
          paddingTop: 30,
        },
      ]}
    >
      <StatusBar style="auto" />
      <ListTransactionScreen />
      <Text>
        {Platform.OS === "android" ? (StatusBar as any).currentHeight : 0}
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
