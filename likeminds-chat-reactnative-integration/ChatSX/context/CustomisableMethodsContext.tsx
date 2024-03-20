import React, { createContext, ReactNode, useContext } from "react";

export interface CustomisableMethodsContextProps {
  children?: ReactNode;
  showViewParticipants?: boolean;
  showShareChatroom?: boolean;
  showMuteNotifications?: boolean;
  showLeaveChatroom?: boolean;
  showJoinChatroom?: boolean;
  showUnmuteNotifications?: boolean;
  showBlockMember?: boolean;
  showUnBlockMember?: boolean;
  showViewProfile?: boolean;
  showSecretLeaveChatroom?: boolean;
  setChatroomTopicProp?: () => void;
  leaveChatroomProp?: () => void;
  leaveSecretChatroomProp?: () => void;
  joinChatroomProp?: () => void;
  muteNotificationsProp?: () => void;
  unmuteNotificationsProp?: () => void;
  onApproveProp?: () => void;
  onRejectProp?: () => void;
  blockMemberProp?: () => void;
  unblockMemberProp?: () => void;
  onTapToUndoProp?: () => void;
  ReactionListProp?: any;
  scrollToBottomProp?: () => void;
  renderFooterProp?: () => void;
  joinSecretChatroomProp?: () => void;
  showJoinAlertProp?: () => void;
  showRejectAlertProp?: () => void;
  handleGalleryProp?: () => void;
  handleCameraProp?: () => void;
  handleDocProp?: () => void;
  onEditProp?: () => void;
}

export interface CustomisableMethodsContext {}

const CustomisableMethodsContext = createContext<
  CustomisableMethodsContext | undefined
>(undefined);

export const useCustomisableMethodsContext = () => {
  const context = useContext(CustomisableMethodsContext);
  if (!context) {
    throw new Error(
      "useCustomisableMethodsContext must be used within an CustomisableMethodsContextProvider"
    );
  }
  return context;
};

export const CustomisableMethodsContextProvider = ({
  children,
  showViewParticipants,
  showShareChatroom,
  showMuteNotifications,
  showLeaveChatroom,
  showJoinChatroom,
  showUnmuteNotifications,
  showBlockMember,
  showUnBlockMember,
  showViewProfile,
  showSecretLeaveChatroom,
  setChatroomTopicProp,
  leaveChatroomProp,
  leaveSecretChatroomProp,
  joinChatroomProp,
  muteNotificationsProp,
  unmuteNotificationsProp,
  onApproveProp,
  onRejectProp,
  blockMemberProp,
  unblockMemberProp,
  onTapToUndoProp,
  ReactionListProp,
  scrollToBottomProp,
  renderFooterProp,
  joinSecretChatroomProp,
  showJoinAlertProp,
  showRejectAlertProp,
  handleGalleryProp,
  handleCameraProp,
  handleDocProp,
  onEditProp,
}: CustomisableMethodsContextProps) => {
  const contextValues: CustomisableMethodsContext = {
    showViewParticipants,
    showShareChatroom,
    showMuteNotifications,
    showJoinChatroom,
    showLeaveChatroom,
    showUnmuteNotifications,
    showBlockMember,
    showUnBlockMember,
    showViewProfile,
    showSecretLeaveChatroom,
    setChatroomTopicProp,
    leaveChatroomProp,
    leaveSecretChatroomProp,
    joinChatroomProp,
    muteNotificationsProp,
    unmuteNotificationsProp,
    onApproveProp,
    onRejectProp,
    blockMemberProp,
    unblockMemberProp,
    onTapToUndoProp,
    ReactionListProp,
    scrollToBottomProp,
    renderFooterProp,
    joinSecretChatroomProp,
    showJoinAlertProp,
    showRejectAlertProp,
    handleGalleryProp,
    handleCameraProp,
    handleDocProp,
    onEditProp,
  };

  return (
    <CustomisableMethodsContext.Provider value={contextValues}>
      {children}
    </CustomisableMethodsContext.Provider>
  );
};
