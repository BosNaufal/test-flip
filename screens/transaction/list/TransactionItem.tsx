import React from "react";
import { StyleSheet, Text, View } from "react-native";
import BaseText from "components/Text";
import THEMES from "themes";
import { bankNameToUppercase, ISOStringDateToLocaleDate } from "utils";

export type transactionStatus = "PENDING" | "SUCCESS";

interface TransactionItemProps {
  status: transactionStatus;
  id: string;
  senderBank: string;
  recieverBank: string;
  recieverName: string;
  amount: number;
  createdAt: string;
}

const TransactionItem: React.FC<TransactionItemProps> = (props) => {
  return (
    <View
      style={[
        styles.outer,
        props.status === "PENDING" ? styles.outerPending : styles.outerSuccess,
      ]}
    >
      <View style={styles.mainInfo}>
        <BaseText style={[styles.bankInfo, styles.infoText]}>
          {bankNameToUppercase(props.senderBank)} {"➔"}{" "}
          {bankNameToUppercase(props.recieverBank)}
        </BaseText>
        <View style={[styles.infoText, styles.reciverName]}>
          {props.status === "PENDING" && <BaseText>{"- "}</BaseText>}
          <BaseText>{props.recieverName}</BaseText>
        </View>
        <BaseText style={styles.infoText}>
          Rp{props.amount} {"●"} {ISOStringDateToLocaleDate(props.createdAt)}
        </BaseText>
      </View>
      <View>
        <View
          style={[
            styles.statusLabel,
            props.status === "PENDING"
              ? styles.statusLabelPending
              : styles.statusLabelSuccess,
          ]}
        >
          <BaseText
            style={[
              styles.statusLabelText,
              props.status === "PENDING"
                ? styles.statusLabelTextPending
                : styles.statusLabelTextSuccess,
            ]}
          >
            {props.status === "PENDING" ? "Pengecekan" : "Berhasil"}
          </BaseText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    borderRadius: 8,
    backgroundColor: "#FFF",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderLeftWidth: 8,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  outerPending: {
    borderLeftColor: THEMES.colors.primary,
  },
  outerSuccess: {
    borderLeftColor: THEMES.colors.success,
  },
  mainInfo: {
    flex: 1,
  },
  infoText: {
    marginBottom: 1,
  },
  bankInfo: {
    fontSize: 18,
    fontWeight: "700",
  },
  reciverName: {
    flexDirection: "row",
  },
  statusLabel: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 2,
    borderRadius: 6,
  },
  statusLabelSuccess: {
    borderColor: THEMES.colors.success,
    backgroundColor: THEMES.colors.success,
  },
  statusLabelPending: {
    borderColor: THEMES.colors.primary,
  },
  statusLabelText: {
    fontWeight: "700",
    fontSize: 14,
  },
  statusLabelTextSuccess: {
    color: "#FFF",
  },
  statusLabelTextPending: {
    color: "#000",
  },
});

export default TransactionItem;
