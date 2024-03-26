import React from 'react';
import {
  ChatRoom,
  ChatroomHeader,
  MessageList,
  MessageInput,
  useChatroomContext,
  useMessageListContext,
  useExploreFeedContext,
  useInputBoxContext,
} from '@likeminds.community/chat-rn-core';
import {ReactionList} from '../../customisableComponents/ReactionList';

export function ChatroomScreen() {
  const showViewParticipants = true;
  const showShareChatroom = true;
  const showMuteNotifications = true;
  const showLeaveChatroom = true;
  const showJoinChatroom = true;
  const showUnmuteNotifications = true;
  const showBlockMember = true;
  const showUnBlockMember = true;
  const showViewProfile = true;
  const showSecretLeaveChatroom = true;
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
    onApprove,
    onReject,
    onTapToUndo,
    blockMember,
    unblockMember,
  } = useChatroomContext();
  const {scrollToBottom} = useMessageListContext();
  const {handleGallery, handleDoc, handleCamera, onEdit} = useInputBoxContext();

  const customHandleGallery = async () => {
    console.log('before custom handle gallery');
    await handleGallery();
    console.log('after custom handle gallery');
  };
  const customHandleCamera = async () => {
    console.log('before custom handle camera');
    await handleCamera();
    console.log('after custom handle camera');
  };
  const customHandleDoc = async () => {
    console.log('before custom handle doc');
    await handleDoc();
    console.log('after custom handle doc');
  };
  const customOnEdit = async () => {
    console.log('before custom on edit');
    await onEdit();
    console.log('after custom on edit');
  };
  const customSetChatroomTopic = async () => {
    console.log('before custom chatroom topic');
    const response = await setChatroomTopic();
    console.log('response from custom chatroom topic', response);
  };
  const customLeaveChatroom = async () => {
    console.log('before custom leave chatroom');
    const response = await leaveChatroom();
    console.log('response after custom leave chatroom', response);
  };
  const customLeaveSecretChatroom = async () => {
    console.log('before custom leave secret chatroom');
    const response = await leaveSecretChatroom();
    console.log('response after custom leave secret chatroom', response);
  };
  const customJoinChatroom = async () => {
    console.log('before custom join chatroom');
    const response = await joinChatroom();
    console.log('response after custom join chatroom', response);
  };
  const customJoinSecretChatroom = async () => {
    console.log('before custom join secret chatroom');
    const response = await joinSecretChatroom();
    console.log('response after custom join secret chatroom', response);
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
  const customOnApprove = async () => {
    console.log('before custom on approve dm request');
    const response = await onApprove();
    console.log('response after custom on approve dm request', response);
  };
  const customOnReject = async () => {
    console.log('before custom on reject dm request');
    const response = await onReject();
    console.log('response after custom on reject dm request', response);
  };
  const customOnTapToUndo = async () => {
    console.log('before custom on tap to undo');
    const response = await onTapToUndo();
    console.log('response after custom on tap to undo', response);
  };
  const customBlockMember = async () => {
    console.log('before custom block member');
    const response = await blockMember();
    console.log('response after custom block member', response);
  };
  const customUnBlockMember = async () => {
    console.log('before custom un-block member');
    const response = await unblockMember();
    console.log('response after custom un-block member', response);
  };
  const customScrollToBottom = async () => {
    console.log('before custom scroll to bottom');
    await scrollToBottom();
    console.log('after custom scroll to bottom');
  };

  return (
    <ChatRoom
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
      setChatroomTopic={customSetChatroomTopic}
      leaveChatroom={customLeaveChatroom}
      leaveSecretChatroom={customLeaveSecretChatroom}
      joinChatroom={customJoinChatroom}
      muteNotifications={customMuteNotifications}
      unmuteNotifications={customUnMuteNotifications}
      onApprove={customOnApprove}
      onReject={customOnReject}
      blockMember={customBlockMember}
      unblockMember={customUnBlockMember}
      handleGallery={customHandleGallery}
      handleCamera={customHandleCamera}
      handleDoc={customHandleDoc}
      onEdit={customOnEdit}>
      {/* ChatroomHeader */}
      <ChatroomHeader />

      {/* Message List */}
      <MessageList
        onTapToUndo={customOnTapToUndo}
        scrollToBottom={customScrollToBottom}
      />

      {/* Input Box Flow */}
      <MessageInput
        joinSecretChatroomProp={customJoinSecretChatroom}
        showJoinAlertProp={customShowJoinAlert}
        showRejectAlertProp={customShowRejectAlert}
      />
    </ChatRoom>
  );
}
