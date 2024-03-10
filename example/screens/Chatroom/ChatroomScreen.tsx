import React from 'react';
import {
  ChatRoom,
  ChatroomHeader,
  MessageList,
  MessageInput,
  useChatroomContext,
  Chat,
} from '@likeminds.community/chat-rn-core';

export function ChatroomScreen() {
  const {
    setChatroomTopic,
    leaveChatroom,
    leaveSecretChatroom,
    joinChatroom,
    joinSecretChatroom,
    muteNotifications,
    unmuteNotifications,
    showJoinAlert,
    showRejectAlert,
  } = useChatroomContext();
  const customSetChatroomTopic = async () => {
    console.log('before custom chatroom topic');
    const response = await setChatroomTopic();
    console.log('response from custom chatroom topic', response);
  };
  const customLeaveChatroom = async () => {
    console.log('before custom leave chatroom');
    const response = await leaveChatroom();
    console.log('after custom leave chatroom', response);
  };
  const customLeaveSecretChatroom = async () => {
    console.log('before custom leave secret chatroom');
    const response = await leaveSecretChatroom();
    console.log('after custom leave secret chatroom', response);
  };
  const customJoinChatroom = async () => {
    console.log('before custom join chatroom');
    const response = await joinChatroom();
    console.log('after custom join chatroom', response);
  };
  const customJoinSecretChatroom = async () => {
    console.log('before custom join secret chatroom');
    const response = await joinSecretChatroom();
    console.log('after custom join secret chatroom', response);
  };
  const customMuteNotifications = async () => {
    console.log('before custom mute notifications');
    await muteNotifications();
    console.log('after custom mute notifications');
  };
  const customUnMuteNotifications = async () => {
    console.log('before custom un-mute notifications');
    await unmuteNotifications();
    console.log('after custom un-mute notifications');
  };
  const customShowJoinAlert = async () => {
    console.log('before custom show join alert');
    await showJoinAlert();
    console.log('after custom show join alert');
  };
  const customShowRejectAlert = async () => {
    console.log('before custom show reject alert');
    await showRejectAlert();
    console.log('after custom show reject alert');
  };

  return (
    <ChatRoom
      setChatroomTopic={customSetChatroomTopic}
      leaveChatroom={customLeaveChatroom}
      leaveSecretChatroom={customLeaveSecretChatroom}
      joinChatroom={customJoinChatroom}
      muteNotifications={customMuteNotifications}
      unmuteNotifications={customUnMuteNotifications}>
      {/* ChatroomHeader */}
      <ChatroomHeader />

      {/* Message List */}
      <MessageList />

      {/* Input Box Flow */}
      <MessageInput
        joinSecretChatroomProp={customJoinSecretChatroom}
        showJoinAlertProp={customShowJoinAlert}
        showRejectAlertProp={customShowRejectAlert}
      />
    </ChatRoom>
  );
}
