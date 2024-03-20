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
import { CustomisableMethodsContextProvider } from "../../context/CustomisableMethodsContext";

interface Data {
  id: string;
  title: string;
}

interface ChatRoomProps {
  children: ReactNode;
  ReactionList?: React.ReactNode;
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
  setChatroomTopic?: () => void;
  leaveChatroom?: () => void;
  leaveSecretChatroom?: () => void;
  joinChatroom?: () => void;
  muteNotifications?: () => void;
  unmuteNotifications?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  blockMember?: () => void;
  unblockMember?: () => void;
}

const ChatRoom = ({
  children,
  ReactionList,
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
    <ChatroomContextProvider ReactionListProp={ReactionList}>
      <CustomisableMethodsContextProvider
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
        showViewParticipants={showViewParticipants}
        showShareChatroom={showShareChatroom}
        showMuteNotifications={showMuteNotifications}
        showLeaveChatroom={showLeaveChatroom}
        showJoinChatroom={showJoinChatroom}
        showUnmuteNotifications={showUnmuteNotifications}
        showBlockMember={showBlockMember}
        showUnBlockMember={showUnBlockMember}
        showViewProfile={showViewProfile}
        showSecretLeaveChatroom={showSecretLeaveChatroom}
      >
        <ChatroomComponent children={children} />
      </CustomisableMethodsContextProvider>
    </ChatroomContextProvider>
  );
};

interface ChatroomComponent {
  children: ReactNode;
}

const ChatroomComponent = ({ children }: ChatroomComponent) => {
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
