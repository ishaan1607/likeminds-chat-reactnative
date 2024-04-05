import React, { createContext, ReactNode, useContext } from "react";

export interface AttachmentConversationContextProps {
  children?: ReactNode;
  isReply: boolean | undefined;
  isReplyConversation: boolean | undefined;
}

export interface AttachmentConversationContext {
  isReply: boolean | undefined;
  isReplyConversation: boolean | undefined;
}

const AttachmentConversationContext = createContext<
  AttachmentConversationContext | undefined
>(undefined);

export const useAttachmentConversationContext = () => {
  const context = useContext(AttachmentConversationContext);
  if (!context) {
    throw new Error(
      "useAttachmentConversationContext must be used within an AttachmentConversationContextProvider"
    );
  }
  return context;
};

export const AttachmentConversationContextProvider = ({
  children,
  isReply,
  isReplyConversation,
}: AttachmentConversationContextProps) => {
  const contextValues: AttachmentConversationContext = {
    isReply,
    isReplyConversation,
  };

  return (
    <AttachmentConversationContext.Provider value={contextValues}>
      {children}
    </AttachmentConversationContext.Provider>
  );
};
