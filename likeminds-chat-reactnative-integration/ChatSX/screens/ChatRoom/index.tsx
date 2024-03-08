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
  // navigation: any;
  // route: any;
  children: ReactNode;
  setChatroomTopic: any;
}

const ChatRoom = ({ children, setChatroomTopic }: ChatRoomProps) => {
  return (
    <ChatroomContextProvider>
      <ChatroomComponent
        children={children}
        setChatroomTopic={setChatroomTopic}
      />
    </ChatroomContextProvider>
  );
};

const ChatroomComponent = ({ children, setChatroomTopic }: any) => {
  const { isToast, msg, setIsToast }: ChatroomContextValues =
    useChatroomContext();

  return (
    <View style={styles.container}>
      {/* Children components */}
      {children}

      {/* Chatroom Modals */}
      <ChatroomModals setChatroomTopicProp={setChatroomTopic} />

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
