import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { LMChatIcon } from "../LMChatIcon";
import Styles from "../constants/Styles";
import { LMChatButtonProps } from "./types";

export const LMChatButton = ({
  text,
  icon,
  onTap,
  placement,
  isActive,
  activeIcon,
  activeText,
  buttonStyle,
  isClickable = false,
}: LMChatButtonProps) => {
  const [active, setActive] = useState(isActive);

  // this function handles the active state of the button
  const activeStateHandler = () => {
    if (isActive !== undefined) {
      setActive(!active);
    }
  };
  return (
    <TouchableOpacity
      disabled={isClickable}
      hitSlop={{ top: 10, bottom: 10 }}
      style={StyleSheet.flatten([defaultStyles.buttonViewStyle, buttonStyle])}
      activeOpacity={0.8}
      onPress={(event) => {
        onTap(event);
        activeStateHandler();
      }}
    >
      {/* button view */}
      <View
        style={StyleSheet.flatten([
          {
            flexDirection: placement === "end" ? "row-reverse" : "row",
            alignItems: "center",
          },
        ])}
      >
        {/* icon view */}
        {icon ? (
          active ? (
            activeIcon ? (
              // this renders the icon in active state
              <LMChatIcon
                type={activeIcon.type}
                width={activeIcon.width}
                height={activeIcon.height}
                iconUrl={activeIcon.iconUrl}
                assetPath={activeIcon.assetPath}
                color={activeIcon.color}
                iconStyle={activeIcon.iconStyle}
                boxFit={activeIcon.boxFit}
                boxStyle={activeIcon.boxStyle}
              />
            ) : null
          ) : (
            // this renders the icon in inactive state
            <LMChatIcon
              type={icon.type}
              width={icon.width}
              height={icon.height}
              iconUrl={icon.iconUrl}
              assetPath={icon.assetPath}
              color={icon.color}
              iconStyle={icon.iconStyle}
              boxFit={icon.boxFit}
              boxStyle={icon.boxStyle}
            />
          )
        ) : null}
        {/* text view */}
      </View>
    </TouchableOpacity>
  );
};

// default button style
const defaultStyles = StyleSheet.create({
  buttonViewStyle: {
    backgroundColor: Styles.$BACKGROUND_COLORS.LIGHT,
    borderColor: Styles.$COLORS.PRIMARY,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    borderRadius: 5,
  },
  buttonTextStyle: {
    fontSize: 16,
  },
});
