import {Chat} from '@likeminds.community/chat-rn-core';
import React from 'react';
import {ChatroomScreen} from './ChatroomScreen';

interface ChatroomScreenWrapperProps {
  lmChatInterface: any;
  chatroomId: string;
  announcementRoomId: string;
}

function ChatroomScreenWrapper({
  lmChatInterface,
  chatroomId,
  announcementRoomId,
}: ChatroomScreenWrapperProps) {
  return (
    <Chat>
      <ChatroomScreen
        lmChatInterface={lmChatInterface}
        chatroomId={chatroomId}
        announcementRoomId={announcementRoomId}
      />
    </Chat>
  );
}

export default ChatroomScreenWrapper;
