import { ActivityIndicator } from "react-native";
import React from "react";
import Styles from "../constants/Styles";
import { LMChatLoaderProps } from "./types";

export const LMChatLoader = ({ color, size }: LMChatLoaderProps) => {
  return (
    <ActivityIndicator
      size={size ? size : "large"}
      color={color ? color : Styles.$COLORS.PRIMARY}
    />
  );
};
