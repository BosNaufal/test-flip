import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TransactionListScreen from "screens/transaction/list";
import THEMES from "themes";
import { StyleSheet } from "react-native";
import TransactionDetailScreen from "./transaction/detail";

const TransactionStack = createNativeStackNavigator();

const Screens = () => {
  return (
    <NavigationContainer>
      <TransactionStack.Navigator>
        <TransactionStack.Screen
          name={"TransactionDetail"}
          component={TransactionDetailScreen}
          options={{
            title: "Detail Transaksi",
            contentStyle: styles.container,
          }}
        />
        <TransactionStack.Screen
          name={"TransactionList"}
          component={TransactionListScreen}
          options={{
            title: "Daftar Transaksi",
            contentStyle: styles.container,
          }}
        />
      </TransactionStack.Navigator>
    </NavigationContainer>
  );
};

export default Screens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEMES.colors.background,
  },
});
