import React from "react";
import { LMOverlayProviderProps } from "./types";
import { LMChatProvider } from "../lmChatProvider";
import { StyleSheet, View } from "react-native";
import { ContextProvider } from "../contextStore";

export const LMOverlayProvider = ({
  myClient,
  children,
  userName,
  userUniqueId,
  profileImageUrl,
  lmChatInterface,
}: LMOverlayProviderProps) => {
  return (
    <ContextProvider>
      <LMChatProvider
        myClient={myClient}
        userName={userName}
        userUniqueId={userUniqueId}
        profileImageUrl={profileImageUrl}
        lmChatInterface={lmChatInterface}
      >
        <View style={styles.flexStyling}>{children}</View>
      </LMChatProvider>
    </ContextProvider>
  );
};

const styles = StyleSheet.create({
  flexStyling: {
    flex: 1,
  },
});
