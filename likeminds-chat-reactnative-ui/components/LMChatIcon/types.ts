import { ImageStyle, ViewStyle } from "react-native";

export interface LMChatIconProps {
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
