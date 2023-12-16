import {
  StyleSheet,
  Text,
  TextStyle,
  NativeSyntheticEvent,
  TextLayoutEventData,
} from "react-native";
import React from "react";

export interface LMTextProps {
  maxLines?: number; // this defines the maximum lines to be displayed
  textStyle?: TextStyle; // this represents ths style of the text
  selectable?: boolean; // this represents the selection behaviour of the text
  onTextLayout?: (event: NativeSyntheticEvent<TextLayoutEventData>) => void; // callback function executed on change of text layout,
  children: React.ReactNode;
}

const LMTextView = ({
  maxLines,
  textStyle,
  selectable,
  onTextLayout,
  children,
}: LMTextProps) => {
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

export default LMTextView;
