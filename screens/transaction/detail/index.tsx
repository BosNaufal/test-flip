import React from "react";
import { StyleSheet, View } from "react-native";
import BaseText from "components/BaseText";
import THEMES from "themes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TransactionStackParamsList } from "screens/types";

interface TransactionDetailScreenProps
  extends NativeStackScreenProps<
    TransactionStackParamsList,
    "TransactionDetail"
  > {}

const TransactionDetailScreen: React.FC<TransactionDetailScreenProps> = (props) => {
  return (
    <View style={styles.pageWrapper}>
      <View style={styles.header}>
        <BaseText style={styles.boldText}>ID TRANSAKSI: #{props.route.params.id}</BaseText>
      </View>
      <View style={[styles.header, styles.spaceBetween]}>
        <BaseText style={styles.boldText}>DETAIL TRANSAKSI</BaseText>
        <BaseText style={styles.toggleText}>Tutup</BaseText>
      </View>
      <View style={styles.infoOuter}>
        <BaseText style={[styles.bankInfo]}>Permata {"➔"} BNI</BaseText>
        <View style={styles.infoInner}>
          <View style={styles.infoColumn}>
            <BaseText style={styles.titleText}>-SYIFA SALSABILA</BaseText>
            <BaseText>0313955548</BaseText>
          </View>
          <View style={styles.infoColumn}>
            <BaseText style={styles.titleText}>-SYIFA SALSABILA</BaseText>
            <BaseText>0313955548</BaseText>
          </View>
          <View style={styles.infoColumn}>
            <BaseText style={styles.titleText}>-SYIFA SALSABILA</BaseText>
            <BaseText>0313955548</BaseText>
          </View>
          <View style={styles.infoColumn}>
            <BaseText style={styles.titleText}>-SYIFA SALSABILA</BaseText>
            <BaseText>0313955548</BaseText>
          </View>
          <View style={styles.infoColumn}>
            <BaseText style={styles.titleText}>-SYIFA SALSABILA</BaseText>
            <BaseText>0313955548</BaseText>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    paddingVertical: 20,
  },
  boldText: {
    fontWeight: "700",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: "#FFF",
    padding: 16,
    flexDirection: "row",
    borderBottomColor: "#DDD",
    borderBottomWidth: 1,
  },
  toggleText: {
    color: THEMES.colors.primary,
  },
  bankInfo: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 18,
  },
  infoOuter: {
    backgroundColor: "#FFF",
    padding: 16,
  },
  infoInner: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  infoColumn: {
    width: "50%",
    marginBottom: 20,
  },
  titleText: {
    fontWeight: "700",
  },
});

export default TransactionDetailScreen;
