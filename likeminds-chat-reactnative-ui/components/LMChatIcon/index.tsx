import { Image, View, StyleSheet } from "react-native";
import React from "react";
import { LMChatIconProps } from "./types";

export const LMChatIcon = ({
  type,
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
      {type === "png" && (
        <View style={boxStyle}>
          <Image
            source={
              assetPath
                ? assetPath
                : {
                    uri: iconUrl,
                  }
            }
            style={StyleSheet.flatten([
              iconStyle,
              {
                width: width ? width : defaultStyles.iconStyle.width,
                height: height ? height : defaultStyles.iconStyle.height,
                tintColor: color,
                resizeMode: boxFit
                  ? boxFit
                  : defaultStyles.iconStyle.resizeMode,
              },
            ])}
          />
        </View>
      )}
    </>
  );
};

// default icon style
const defaultStyles = StyleSheet.create({
  iconStyle: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
});
