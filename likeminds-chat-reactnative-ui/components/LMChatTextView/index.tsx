import { StyleSheet, Text } from "react-native";
import React from "react";
import { LMChatTextViewProps } from "./types";
import defaultStyles from "../constants/defaultStyles";

export const LMChatTextView = ({
  maxLines,
  textStyle,
  selectable,
  onTextLayout,
  children,
  ...textViewProps
}: LMChatTextViewProps) => {
  return (
    // this renders the text component
    <Text
      selectable={selectable ? selectable : true} // default selectable value is true
      numberOfLines={maxLines}
      onTextLayout={onTextLayout}
      style={StyleSheet.flatten([defaultStyles.textStyle, textStyle])}
      {...textViewProps}
    >
      {children}
    </Text>
  );
};
