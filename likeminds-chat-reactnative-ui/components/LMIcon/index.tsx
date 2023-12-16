import { Image, View, StyleSheet, ImageStyle, ViewStyle } from "react-native";
import React from "react";

export interface LMIconProps {
  type: "png"; // this represents the type of icon
  iconUrl?: string; // this represents the url the icon
  assetPath?: object; // this represents the path of the local image
  color?: string; // this represents the tintcolor of the icon
  height?: number; // this represents the height of the icon
  width?: number; // this represents the width of the icon
  iconStyle?: ImageStyle; // this represents the style of the icon
  boxFit?: "center" | "contain" | "cover" | "repeat" | "stretch"; // this defines the fit behaviour of the icon inside the box around it
  boxStyle?: ViewStyle; // this represents the style of the view
}

const LMIcon = ({
  type,
  iconUrl,
  assetPath,
  color,
  height,
  width,
  boxStyle,
  iconStyle,
  boxFit,
}: LMIconProps) => {
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

export default LMIcon;
