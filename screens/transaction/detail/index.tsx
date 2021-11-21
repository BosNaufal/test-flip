import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import BaseText from "components/BaseText";
import THEMES from "themes";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TransactionStackParamsList } from "screens/types";
import useTransactionStore, {
  transactionStoreSelector,
} from "stores/useTransactionStore";
import {
  bankNameToUppercase,
  convertToRupiahCurrency,
  ISOStringDateToLocaleDate,
} from "utils";

interface TransactionDetailScreenProps
  extends NativeStackScreenProps<
    TransactionStackParamsList,
    "TransactionDetail"
  > {}

const TransactionDetailScreen: React.FC<TransactionDetailScreenProps> = (
  props
) => {
  const transactionId = props.route.params.id;
  const data = useTransactionStore(
    transactionStoreSelector.getDetailTransaction(transactionId)
  );

  const [isShowDetail, setIsShowDetail] = useState(true);
  const toggleShow = () => {
    setIsShowDetail(!isShowDetail);
  };

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.header}>
        <BaseText style={styles.boldText}>
          ID TRANSAKSI: #{transactionId}
        </BaseText>
      </View>
      <View style={[styles.header, styles.spaceBetween]}>
        <BaseText style={styles.boldText}>DETAIL TRANSAKSI</BaseText>
        <TouchableOpacity onPress={toggleShow}>
          <BaseText style={styles.toggleText}>
            {isShowDetail ? "Tutup" : "Buka"}
          </BaseText>
        </TouchableOpacity>
      </View>
      <View style={[styles.infoOuter, !isShowDetail && styles.hide]}>
        <BaseText style={[styles.bankInfo]}>
          {bankNameToUppercase(data.sender_bank)} {"➔"}{" "}
          {bankNameToUppercase(data.beneficiary_bank)}
        </BaseText>
        <View style={styles.infoInner}>
          <View style={styles.infoColumn}>
            <BaseText style={styles.titleText}>
              {data.status === "PENDING" && "- "}
              {data.beneficiary_name.toUpperCase()}
            </BaseText>
            <BaseText>{data.account_number}</BaseText>
          </View>
          <View style={styles.infoColumn}>
            <BaseText style={styles.titleText}>NOMINAL</BaseText>
            <BaseText>Rp {convertToRupiahCurrency(data.amount)}</BaseText>
          </View>
          <View style={styles.infoColumn}>
            <BaseText style={styles.titleText}>BERITA TRANSFER</BaseText>
            <BaseText>{data.remark}</BaseText>
          </View>
          <View style={styles.infoColumn}>
            <BaseText style={styles.titleText}>KODE UNIK</BaseText>
            <BaseText>{data.unique_code}</BaseText>
          </View>
          <View style={styles.infoColumn}>
            <BaseText style={styles.titleText}>WAKTU DIBUAT</BaseText>
            <BaseText>{ISOStringDateToLocaleDate(data.created_at)}</BaseText>
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
  hide: {
    display: "none",
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
