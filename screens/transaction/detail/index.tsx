import React, { useState } from "react";
import {
  Alert,
  Image,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
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
  MySqlStringDateToLocaleDate,
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

  // refs: https://reactnative.dev/docs/share
  // Clipboard API should use community library. 
  // so we can use Share API that has pretty similar to "copy" action
  const handleShare = () => {
    return Share.share({
      message: `#${transactionId}`,
    })
      .then((result) => {
        if (result.action === Share.sharedAction) {
          Alert.alert("ID Transaksi berhasil dibagikan");
        }
      })
      .catch(() => {
        Alert.alert("Opps terjadi kesalahan");
      });
  };

  return (
    <View style={styles.pageWrapper}>
      <View style={styles.header}>
        <View style={styles.transactionId}>
          <BaseText style={styles.boldText}>ID TRANSAKSI: </BaseText>
          <BaseText selectable style={styles.boldText}>
            #{transactionId}
          </BaseText>
        </View>
        <TouchableOpacity onPress={handleShare}>
          <Image
            style={{ width: 20, height: 20, marginLeft: 4 }}
            source={require("assets/copy-icon.png")}
          />
        </TouchableOpacity>
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
          <InfoColumn title={reciverName} content={data.account_number} />
          <InfoColumn
            small
            title={"NOMINAL"}
            content={`Rp ${convertToRupiahCurrency(data.amount)}`}
          />
          <InfoColumn title={"BERITA TRANSFER"} content={data.remark} />
          <InfoColumn small title={"KODE UNIK"} content={data.unique_code} />
          <InfoColumn
            title={"WAKTU DIBUAT"}
            content={MySqlStringDateToLocaleDate(data.created_at)}
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
  transactionId: {
    flexDirection: "row"
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
