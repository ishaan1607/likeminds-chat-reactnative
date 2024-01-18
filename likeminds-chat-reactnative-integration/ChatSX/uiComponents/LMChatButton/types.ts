import { ViewStyle } from "react-native";
import { LMChatTextViewProps } from "../LMChatTextView/types";
import { LMChatIconProps } from "../LMChatIcon/types";

export interface LMChatButtonProps {
  text?: LMChatTextViewProps; // this represents the text displayed on the button
  icon?: LMChatIconProps; // this represents ths icon displayed on the button
  onTap: (value?: any) => void; // this represents the functionality to be executed on click of button
  placement?: "start" | "end"; // this represents the placement of the icon on the button
  isActive?: boolean; // this represents the active/inactive state of the button
  activeIcon?: LMChatIconProps; // this represents the icon to be displayed when the button is in active state
  activeText?: LMChatTextViewProps; // this represents the text to be displayed when the button is in active state
  buttonStyle?: ViewStyle; // this represents the style of the button
  isClickable?: boolean; // this represents if the button is disabled or not
}
