import { ActivityIndicator } from "react-native";
import React from "react";
import Styles from "../constants/Styles";

interface LMLoaderProps {
  color?: string; // color of the loader
  size?: number; // size of the loader
}

const LMLoader = ({ color, size }: LMLoaderProps) => {
  return (
    <ActivityIndicator
      size={size ? size : "large"}
      color={color ? color : Styles.$COLORS.PRIMARY}
    />
  );
};

export default LMLoader;
