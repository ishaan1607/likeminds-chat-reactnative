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
  setChatroomTopic: () => void;
  leaveChatroom: () => void;
  leaveSecretChatroom: () => void;
  joinChatroom: () => void;
  muteNotifications: () => void;
  unmuteNotifications: () => void;
  onApprove: () => void;
  onReject: () => void;
  blockMember: () => void;
  unblockMember: () => void;
}

const ChatRoom = ({
  children,
  setChatroomTopic,
  leaveChatroom,
  leaveSecretChatroom,
  joinChatroom,
  muteNotifications,
  unmuteNotifications,
  onApprove,
  onReject,
  blockMember,
  unblockMember,
}: ChatRoomProps) => {
  return (
    <ChatroomContextProvider>
      <ChatroomComponent
        children={children}
        setChatroomTopic={setChatroomTopic}
        leaveChatroom={leaveChatroom}
        leaveSecretChatroom={leaveSecretChatroom}
        joinChatroom={joinChatroom}
        muteNotifications={muteNotifications}
        unmuteNotifications={unmuteNotifications}
        onApprove={onApprove}
        onReject={onReject}
        blockMember={blockMember}
        unblockMember={unblockMember}
      />
    </ChatroomContextProvider>
  );
};

interface ChatroomComponent {
  children: ReactNode;
  setChatroomTopic: () => void;
  leaveChatroom: () => void;
  leaveSecretChatroom: () => void;
  joinChatroom: () => void;
  muteNotifications: () => void;
  unmuteNotifications: () => void;
  onApprove: () => void;
  onReject: () => void;
  blockMember: () => void;
  unblockMember: () => void;
}

const ChatroomComponent = ({
  children,
  setChatroomTopic,
  leaveChatroom,
  leaveSecretChatroom,
  joinChatroom,
  muteNotifications,
  unmuteNotifications,
  onApprove,
  onReject,
  blockMember,
  unblockMember,
}: ChatroomComponent) => {
  const { isToast, msg, setIsToast }: ChatroomContextValues =
    useChatroomContext();

  return (
    <View style={styles.container}>
      {/* Children components */}
      {children}

      {/* Chatroom Modals */}
      <ChatroomModals
        setChatroomTopicProp={setChatroomTopic}
        leaveChatroomProp={leaveChatroom}
        leaveSecretChatroomProp={leaveSecretChatroom}
        joinChatroomProp={joinChatroom}
        muteNotificationsProp={muteNotifications}
        unmuteNotificationsProp={unmuteNotifications}
        onApproveProp={onApprove}
        onRejectProp={onReject}
        blockMemberProp={blockMember}
        unblockMemberProp={unblockMember}
      />

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
