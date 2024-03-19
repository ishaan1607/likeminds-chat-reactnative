import React, { createContext, ReactNode, useContext } from "react";

export interface CustomisableMethodsContextProps {
  children?: ReactNode;
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
