import React from "react";
import { StyleSheet, View } from "react-native";
import BaseText from "components/BaseText";

interface InfoColumnProps {
  small?: boolean;
  title: string;
  content: string | number;
}

const InfoColumn: React.FC<InfoColumnProps> = (props) => {
  return (
    <View style={[styles.infoColumn, !props.small && styles.infoColumnWider]}>
      <BaseText style={styles.titleText}>{props.title}</BaseText>
      <BaseText>{props.content}</BaseText>
    </View>
  );
};

const styles = StyleSheet.create({
  infoColumn: {
    width: "40%",
    marginBottom: 20,
  },
  infoColumnWider: {
    width: "60%",
  },
  titleText: {
    fontWeight: "700",
  },
});

export default InfoColumn;
