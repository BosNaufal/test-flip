import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Radio from "components/Radio";

interface SortingOptionProps {
  onPress: () => void;
  checked?: boolean;
  label: string;
}

const SortingOption: React.FC<SortingOptionProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.optionItem}>
      <Radio checked={props.checked} style={styles.radio} />
      <Text style={styles.optionText}>{props.label}</Text>
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
