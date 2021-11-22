import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TransactionListScreen from "screens/transaction/list";
import THEMES from "themes";
import { StyleSheet } from "react-native";
import TransactionDetailScreen from "./transaction/detail";

const TransactionStack = createNativeStackNavigator();
const transactionScreens = [
  {
    name: "TransactionList",
    title: "Daftar Transaksi",
    component: TransactionListScreen,
  },
  {
    name: "TransactionDetail",
    title: "Detil Transaksi",
    component: TransactionDetailScreen,
  },
];

const Screens = () => {
  return (
    <NavigationContainer>
      <TransactionStack.Navigator>
        {transactionScreens.map((screen) => (
          <TransactionStack.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={{
              title: screen.title,
              headerStyle: styles.header,
              headerTitleStyle: styles.whiteText,
              contentStyle: styles.container,
            }}
          />
        ))}
      </TransactionStack.Navigator>
    </NavigationContainer>
  );
};

export default Screens;

const styles = StyleSheet.create({
  header: {
    backgroundColor: THEMES.colors.primary,
  },
  whiteText: {
    color: "#FFF",
  },
  container: {
    flex: 1,
    backgroundColor: THEMES.colors.background,
  },
});
