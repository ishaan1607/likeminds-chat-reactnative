import { Image, View, StyleSheet, ImageStyle } from "react-native";
import React from "react";
import { LMChatIconProps } from "./types";
import defaultStyles from "../constants/defaultStyles";

export const LMChatIcon = ({
  iconUrl,
  assetPath,
  color,
  height,
  width,
  boxStyle,
  iconStyle,
  boxFit,
}: LMChatIconProps) => {
  // this throws the error if both image url and image path are passed as props because only one is required
  if (iconUrl && assetPath) {
    throw new Error("Property iconUrl and assetPath can not exist together.");
  }

  return (
    <>
      {/* this renders the png image */}
      <View style={boxStyle}>
        <Image
          source={
            assetPath
              ? assetPath
              : {
                  uri: iconUrl,
                }
          }
          style={
            StyleSheet.flatten([
              {
                width: width ? width : defaultStyles.iconStyle.width,
                height: height ? height : defaultStyles.iconStyle.height,
                tintColor: color,
                resizeMode: boxFit
                  ? boxFit
                  : defaultStyles.iconStyle.resizeMode,
              },
              iconStyle,
            ]) as ImageStyle
          }
        />
      </View>
    </>
  );
};
