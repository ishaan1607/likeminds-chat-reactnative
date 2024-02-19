import { Image, TouchableOpacity, View } from "react-native";
import React from "react";
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
import StateMessage from "../StateMessage";
import { NavigateToProfileParams } from "../../callBacks/type";
import { CallBack } from "../../callBacks/callBackClass";

interface Messages {
  item: any;
  index: number;
  isStateIncluded: boolean;
  isIncluded: boolean;
  ReactionListProp: any;
}

const Messages = ({
  item,
  index,
  isStateIncluded,
  isIncluded,
  ReactionListProp,
}: Messages) => {
  return (
    <MessageContextProvider
      index={index}
      item={item}
      isStateIncluded={isStateIncluded}
      isIncluded={isIncluded}
    >
      <MessagesComponent ReactionListProp={ReactionListProp} />
    </MessageContextProvider>
  );
};

const MessagesComponent = ({ ReactionListProp }: any) => {
  const {
    item,
    isIncluded,
    reactionArr,
    isTypeSent,
    userIdStringified,
    isItemIncludedInStateArr,
    handleLongPress,
  } = useMessageContext();

  const { removeReaction, chatroomID } = useChatroomContext();

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

  const lmChatInterface = CallBack.lmChatInterface;

  return (
    <View style={styles.messageParent}>
      <View>
        {item?.deletedBy ? (
          <DeletedMessage />
        ) : item?.replyConversationObject ? (
          <ReplyConversations />
        ) : !item?.replyConversationObject && item?.attachmentCount > 0 ? (
          <AttachmentConversations />
        ) : item?.state === 10 ? (
          <PollConversationView />
        ) : item?.ogTags?.url != null && item?.ogTags != undefined ? (
          <LinkPreview />
        ) : (
          <StateMessage />
        )}

        {/* Sharp corner styles of a chat bubble */}
        {!isItemIncludedInStateArr ? (
          <View>
            {isTypeSent ? (
              <View
                style={[
                  styles.typeSent,
                  sentMessageBackgroundColor
                    ? {
                        borderBottomColor: sentMessageBackgroundColor,
                        borderLeftColor: sentMessageBackgroundColor,
                      }
                    : null,
                  isIncluded
                    ? {
                        borderBottomColor: SELECTED_BACKGROUND_COLOR,
                        borderLeftColor: SELECTED_BACKGROUND_COLOR,
                      }
                    : null,
                ]}
              />
            ) : (
              <View
                style={[
                  styles.typeReceived,
                  receivedMessageBackgroundColor
                    ? {
                        borderBottomColor: receivedMessageBackgroundColor,
                        borderRightColor: receivedMessageBackgroundColor,
                      }
                    : null,
                  isIncluded
                    ? {
                        borderBottomColor: SELECTED_BACKGROUND_COLOR,
                        borderRightColor: SELECTED_BACKGROUND_COLOR,
                      }
                    : null,
                ]}
              >
                <TouchableOpacity
                  onPress={() => {
                    const params: NavigateToProfileParams = {
                      taggedUserId: null,
                      member: item?.member,
                    };
                    lmChatInterface.navigateToProfile(params);
                  }}
                >
                  <Image
                    source={
                      item?.member?.imageUrl
                        ? { uri: item?.member?.imageUrl }
                        : require("../../assets/images/default_pic.png")
                    }
                    style={styles.chatroomTopicAvatar}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : null}

        {/* Reaction List */}
        {ReactionListProp ? (
          ReactionListProp
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
