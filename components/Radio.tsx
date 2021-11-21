import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import THEMES from "themes";

interface RadioProps {
  style?: StyleProp<ViewStyle>;
  checked?: boolean;
}

const Radio: React.FC<RadioProps> = (props) => {
  return (
    <View style={[styles.outer, props.style]}>
      {props.checked && <View style={styles.filler}></View>}
    </View>
  );
};

const styles = StyleSheet.create({
  outer: {
    borderColor: THEMES.colors.primary,
    borderWidth: 3,
    borderRadius: 1000,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  filler: {
    width: "75%",
    height: "75%",
    borderRadius: 1000,
    backgroundColor: THEMES.colors.primary,
  },
});

export default Radio;
