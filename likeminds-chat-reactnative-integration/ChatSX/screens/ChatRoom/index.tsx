import React, { ReactNode } from "react";
import { View } from "react-native";
import ToastMessage from "../../components/ToastMessage";
import { styles } from "./styles";
import {
  ChatroomContextProvider,
  ChatroomContextValues,
  useChatroomContext,
} from "../../context/ChatroomContext";
import ChatroomModals from "../../components/ChatroomModals";

interface Data {
  id: string;
  title: string;
}

interface ChatRoomProps {
  children: ReactNode;
  customReplyBox?: (item: any, chatroomName: string) => JSX.Element;
  customMessageHeader?: ReactNode;
  customMessageFooter?: ReactNode;
  customVideoImageAttachmentConversation?: ReactNode;
  customPdfAttachmentConversation?: ReactNode;
  customVoiceNoteAttachmentConversation?: ReactNode;
  customGifAttachmentConversation?: ReactNode;
  customMessageNotSupportedConversation?: ReactNode;
  customDeletedMessage?: ReactNode;
  customReplyConversations?: ReactNode;
  customPollConversationView?: ReactNode;
  customLinkPreview?: ReactNode;
  customStateMessage?: ReactNode;
}

interface ChatRoomComponentProps {
  children: ReactNode;
}

const ChatRoom = ({
  children,
  customReplyBox,
  customMessageHeader,
  customMessageFooter,
  customVideoImageAttachmentConversation,
  customPdfAttachmentConversation,
  customVoiceNoteAttachmentConversation,
  customGifAttachmentConversation,
  customMessageNotSupportedConversation,
  customDeletedMessage,
  customReplyConversations,
  customPollConversationView,
  customLinkPreview,
  customStateMessage,
}: ChatRoomProps) => {
  return (
    <ChatroomContextProvider
      customReplyBox={customReplyBox}
      customMessageHeader={customMessageHeader}
      customMessageFooter={customMessageFooter}
      customVideoImageAttachmentConversation={
        customVideoImageAttachmentConversation
      }
      customPdfAttachmentConversation={customPdfAttachmentConversation}
      customVoiceNoteAttachmentConversation={
        customVoiceNoteAttachmentConversation
      }
      customGifAttachmentConversation={customGifAttachmentConversation}
      customMessageNotSupportedConversation={
        customMessageNotSupportedConversation
      }
      customDeletedMessage={customDeletedMessage}
      customReplyConversations={customReplyConversations}
      customPollConversationView={customPollConversationView}
      customLinkPreview={customLinkPreview}
      customStateMessage={customStateMessage}
    >
      <ChatroomComponent children={children} />
    </ChatroomContextProvider>
  );
};

const ChatroomComponent = ({ children }: ChatRoomComponentProps) => {
  const { isToast, msg, setIsToast }: ChatroomContextValues =
    useChatroomContext();

  return (
    <View style={styles.container}>
      {/* Children components */}
      {children}

      {/* Chatroom Modals */}
      <ChatroomModals />

      {/* Toast Message Flow inside Chatroom */}
      <ToastMessage
        message={msg}
        isToast={isToast}
        onDismiss={() => {
          setIsToast(false);
        }}
      />
    </View>
  );
};

export { ChatRoom };
