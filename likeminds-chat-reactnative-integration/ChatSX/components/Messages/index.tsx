import { Image, TouchableOpacity, View } from "react-native";
import React, { ReactNode } from "react";
import { styles } from "./styles";
import STYLES from "../../constants/Styles";
import ReplyConversations from "../ReplyConversations";
import AttachmentConversations from "../AttachmentConversations";
import { PollConversationView } from "../Poll";
import LinkPreview from "../LinkPreview";
import ReactionList from "../ReactionList";
import {
  MessageContextProvider,
  useMessageContext,
} from "../../context/MessageContext";
import { useChatroomContext } from "../../context/ChatroomContext";
import DeletedMessage from "../DeletedMessage";
import SimpleMessage from "../SimpleMessage";
import { NavigateToProfileParams } from "../../callBacks/type";
import { CallBack } from "../../callBacks/callBackClass";
import { useCustomComponentsContext } from "../../context/CustomComponentContextProvider";

interface Messages {
  item: any;
  index: number;
  isStateIncluded: boolean;
  isIncluded: boolean;
  onTapToUndoProp?: () => void;
}

const Messages = ({
  item,
  index,
  isStateIncluded,
  isIncluded,
  onTapToUndoProp,
}: Messages) => {
  return (
    <MessageContextProvider
      index={index}
      item={item}
      isStateIncluded={isStateIncluded}
      isIncluded={isIncluded}
    >
      <MessagesComponent onTapToUndoProp={onTapToUndoProp} />
    </MessageContextProvider>
  );
};

interface MessagesComponentProps {
  onTapToUndoProp?: () => void;
}

interface CustomReactionList {
  customReactionList?: ReactNode;
}

const MessagesComponent = ({ onTapToUndoProp }: MessagesComponentProps) => {
  const {
    item,
    isIncluded,
    reactionArr,
    isTypeSent,
    userIdStringified,
    isItemIncludedInStateArr,
    handleLongPress,
  } = useMessageContext();
  const { customReactionList }: CustomReactionList =
    useCustomComponentsContext();

  const { removeReaction, chatroomID } = useChatroomContext();

  const {
    customDeletedMessage,
    customReplyConversations,
    customPollConversationView,
    customLinkPreview,
  } = useCustomComponentsContext();

  const chatBubbleStyles = STYLES.$CHAT_BUBBLE_STYLE;

  //styling props
  const sentMessageBackgroundColor =
    chatBubbleStyles?.sentMessageBackgroundColor;
  const receivedMessageBackgroundColor =
    chatBubbleStyles?.receivedMessageBackgroundColor;
  const selectedMessageBackgroundColor =
    chatBubbleStyles?.selectedMessageBackgroundColor;

  const SELECTED_BACKGROUND_COLOR = selectedMessageBackgroundColor
    ? selectedMessageBackgroundColor
    : STYLES.$COLORS.SELECTED_BLUE;
  // styling props ended

  return (
    <View>
      <View>
        {item?.deletedBy ? (
          customDeletedMessage ? (
            customDeletedMessage
          ) : (
            <DeletedMessage />
          )
        ) : item?.replyConversationObject ? (
          customReplyConversations ? (
            customReplyConversations
          ) : (
            <ReplyConversations />
          )
        ) : !item?.replyConversationObject && item?.attachmentCount > 0 ? (
          <AttachmentConversations />
        ) : item?.state === 10 ? (
          customPollConversationView ? (
            customPollConversationView
          ) : (
            <PollConversationView />
          )
        ) : item?.ogTags?.url != null && item?.ogTags != undefined ? (
          customLinkPreview ? (
            customLinkPreview
          ) : (
            <LinkPreview />
          )
        ) : (
          <SimpleMessage onTapToUndoProp={onTapToUndoProp} />
        )}

        {/* Reaction List */}
        {customReactionList ? (
          customReactionList
        ) : (
          <ReactionList
            item={item}
            chatroomID={chatroomID}
            userIdStringified={userIdStringified}
            reactionArr={reactionArr}
            isTypeSent={isTypeSent}
            isIncluded={isIncluded}
            handleLongPress={handleLongPress}
            removeReaction={removeReaction}
          />
        )}
      </View>
    </View>
  );
};

export default Messages;
