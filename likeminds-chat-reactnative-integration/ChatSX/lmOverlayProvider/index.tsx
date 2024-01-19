import React from "react";
import { LMOverlayProviderProps } from "./types";
import { Provider as ReduxProvider } from "react-redux";
import store from "../store";
import { LMChatProvider } from "../lmChatProvider";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";

export const LMOverlayProvider = ({
  myClient,
  children,
  userName,
  userUniqueId,
  profileImageUrl,
  lmChatInterface,
}: LMOverlayProviderProps) => {
  return (
    <ReduxProvider store={store}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <LMChatProvider
          myClient={myClient}
          userName={userName}
          userUniqueId={userUniqueId}
          profileImageUrl={profileImageUrl}
          lmChatInterface={lmChatInterface}
        >
          <View style={styles.flexStyling}>{children}</View>
        </LMChatProvider>
      </KeyboardAvoidingView>
    </ReduxProvider>
  );
};

const styles = StyleSheet.create({
  flexStyling: {
    flex: 1,
  },
});
