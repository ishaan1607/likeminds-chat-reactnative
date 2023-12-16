import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import React, { useState } from "react";
import LMTextView, { LMTextProps } from "../LMTextView";
import LMIcon from "../LMIcon";
import { LMIconProps } from "../LMIcon";
import Styles from "../constants/Styles";

export interface LMButtonProps {
  text?: LMTextProps; // this represents the text displayed on the button
  icon?: LMIconProps; // this represents ths icon displayed on the button
  onTap: (value?: any) => void; // this represents the functionality to be executed on click of button
  placement?: "start" | "end"; // this represents the placement of the icon on the button
  isActive?: boolean; // this represents the active/inactive state of the button
  activeIcon?: LMIconProps; // this represents the icon to be displayed when the button is in active state
  activeText?: LMTextProps; // this represents the text to be displayed when the button is in active state
  buttonStyle?: ViewStyle; // this represents the style of the button
  isClickable?: boolean; // this represents if the button is disabled or not
}

const LMButton = ({
  text,
  icon,
  onTap,
  placement,
  isActive,
  activeIcon,
  activeText,
  buttonStyle,
  isClickable = false,
}: LMButtonProps) => {
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
              <LMIcon
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
            <LMIcon
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

export default LMButton;
