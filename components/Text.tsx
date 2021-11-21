import React from "react";
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from "react-native";

interface BaseTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
}

const BaseText: React.FC<BaseTextProps> = (props) => {
  return <Text {...props} style={[styles.defaultStyling, props.style]} />;
};

const styles = StyleSheet.create({
  defaultStyling: {
    fontSize: 16,
  },
});

export default BaseText;
