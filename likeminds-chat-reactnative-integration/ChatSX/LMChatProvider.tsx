import React, { createContext, ReactNode, useMemo, useState } from "react";
import STYLES from "./constants/Styles";

interface ReactionListStylesProps {
  reactionSize: number;
  reactionLeftItemStroke: string;
  reactionRightItemStroke: string;
  reactionItemBorderRadius: number;
  gap: number;
}

interface TextStyles {
  fontSize: number;
  fontStyle: string;
  fontFamily: string;
}

interface ChatBubbleStylesProps {
  borderRadius: number;
  sentMessageBackgroundColor: string;
  receivedMessageBackgroundColor: string;
  selectedBackgroundColor: string;
  selectedMessageBackgroundColor: string;
  textStyles: TextStyles;
  linkTextColor: string;
  taggingTextColor: string;
  stateMessagesBackgroundColor: string;
  stateMessagesTextStyles: TextStyles;
  deletedMessagesTextStyles: TextStyles;
}

// Define the context type
export interface ThemeContextProps {
  reactionListStyles?: ReactionListStylesProps;
  chatBubbleStyles?: ChatBubbleStylesProps;
}

// Create the theme context
export const LMChat = createContext<ThemeContextProps | undefined>(undefined);

// Define the PropTypes for the LMChatProvider component
interface LMChatProviderProps {
  children: ReactNode;
}

// Create the LMChatProvider component
const LMChatProvider: React.FC<LMChatProviderProps> = ({ children }) => {
  // useMemo(() => {
  //   STYLES.setTheme({
  //     hue: 0,
  //     fontColor: 'red',
  //     primaryColor: 'green',
  //     secondaryColor: 'green',
  //     lightBackgroundColor: '#d7f7ed',
  //   });
  // }, []);

  // const reactionListStyles = {
  //   reactionSize: 0,
  //   reactionLeftItemStroke: 'pink',
  //   reactionRightItemStroke: 'yellow',
  //   reactionItemBorderRadius: 5,
  //   gap: 5,
  // };

  // const chatBubbleStyles = {
  //   borderRadius: 5,
  //   sentMessageBackgroundColor: 'blue',
  //   receivedMessageBackgroundColor: 'pink',
  //   selectedBackgroundColor: 'grey',
  //   selectedMessageBackgroundColor: 'purple',
  //   textStyles: {
  //     fontSize: 10,
  //     fontStyle: 'italic',
  //     fontFamily: 'SofiaPro-SemiBold',
  //   },
  //   linkTextColor: 'red',
  //   taggingTextColor: 'yellow',
  //   stateMessagesBackgroundColor: 'pink',
  //   stateMessagesTextStyles:{},
  // };

  return <LMChat.Provider value={{}}>{children}</LMChat.Provider>;
};

export default LMChatProvider;
