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
import InfoColumn from "./InfoColumn";

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

  // prettier make it broken when using template literal
  const reciverName =
    (data.status === "PENDING" ? "- " : "") +
    data.beneficiary_name.toUpperCase();

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
          <InfoColumn wider title={reciverName} content={data.account_number} />
          <InfoColumn
            title={"NOMINAL"}
            content={`Rp ${convertToRupiahCurrency(data.amount)}`}
          />
          <InfoColumn wider title={"BERITA TRANSFER"} content={data.remark} />
          <InfoColumn title={"KODE UNIK"} content={data.unique_code} />
          <InfoColumn
            title={"WAKTU DIBUAT"}
            content={ISOStringDateToLocaleDate(data.created_at)}
          />
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
});

export default TransactionDetailScreen;
