import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Radio from "components/Radio";
import BaseText from "components/BaseText";

interface SortingOptionProps {
  onPress: () => void;
  checked?: boolean;
  label: string;
}

const SortingOption: React.FC<SortingOptionProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.optionItem}>
      <Radio checked={props.checked} style={styles.radio} />
      <BaseText style={styles.optionText}>{props.label}</BaseText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  optionText: {
    fontSize: 18,
  },
  radio: {
    marginRight: 10,
  },
});

export default SortingOption;
