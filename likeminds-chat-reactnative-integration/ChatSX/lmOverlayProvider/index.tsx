import React from "react";
import { LMOverlayProviderProps } from "./types";
import { Provider as ReduxProvider } from "react-redux";
import store from "../store";
import { LMChatProvider } from "../lmChatProvider";
import { StyleSheet, View } from "react-native";

export const LMOverlayProvider = ({
  myClient,
  children,
  userName,
  userUniqueId,
  cohortId,
  reactionListStyles,
  chatBubbleStyles,
  inputBoxStyles,
  themeStyles,
}: LMOverlayProviderProps) => {
  return (
    <ReduxProvider store={store}>
      <LMChatProvider
        myClient={myClient}
        userName={userName}
        userUniqueId={userUniqueId}
        cohortId={cohortId}
        chatBubbleStyles={chatBubbleStyles}
        reactionListStyles={reactionListStyles}
        inputBoxStyles={inputBoxStyles}
        themeStyles={themeStyles}
      >
        <View style={styles.flexStyling}>{children}</View>
      </LMChatProvider>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  flexStyling: {
    flex: 1,
  },
});
