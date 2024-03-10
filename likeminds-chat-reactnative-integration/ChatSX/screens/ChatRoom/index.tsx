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
}

const ChatRoom = ({
  children,
  setChatroomTopic,
  leaveChatroom,
  leaveSecretChatroom,
  joinChatroom,
  muteNotifications,
  unmuteNotifications,
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
}

const ChatroomComponent = ({
  children,
  setChatroomTopic,
  leaveChatroom,
  leaveSecretChatroom,
  joinChatroom,
  muteNotifications,
  unmuteNotifications,
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
