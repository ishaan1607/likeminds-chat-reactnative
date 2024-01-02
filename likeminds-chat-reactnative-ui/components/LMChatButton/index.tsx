import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { useState } from "react";
import { LMChatIcon } from "../LMChatIcon";
import { LMChatButtonProps } from "./types";
import defaultStyles from "../constants/defaultStyles";

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
      style={
        StyleSheet.flatten([
          defaultStyles.buttonViewStyle,
          buttonStyle,
        ]) as ViewStyle
      }
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
