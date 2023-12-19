import { StyleSheet, Text } from "react-native";
import React from "react";
import { LMChatTextViewProps } from "./types";

export const LMChatTextView = ({
  maxLines,
  textStyle,
  selectable,
  onTextLayout,
  children,
}: LMChatTextViewProps) => {
  return (
    // this renders the text component
    <Text
      selectable={selectable ? selectable : true} // default selectable value is true
      numberOfLines={maxLines}
      onTextLayout={onTextLayout}
      style={StyleSheet.flatten([defaultStyles.textStyle, textStyle])}
    >
      {children}
    </Text>
  );
};

// default text style
const defaultStyles = StyleSheet.create({
  textStyle: {
    color: "black",
    fontSize: 14,
    fontFamily: "Arial",
    textAlign: "auto",
    fontStyle: "normal",
  },
});
