import { View } from "react-native";
import React from "react";
import { styles } from "./styles";
import STYLES from "../../constants/Styles";
import ReplyConversations from "../ReplyConversations";
import AttachmentConversations from "../AttachmentConversations";
import { PollConversationView } from "../Poll";
import LinkPreview from "../LinkPreview";
import { useLMChatStyles } from "../../lmChatProvider";
import ReactionList from "../ReactionList";
import { useMessageContext } from "../../context/MessageContext";
import { useChatroomContext } from "../../context/ChatroomContext";
import DeletedMessage from "../DeletedMessage";
import StateMessage from "../StateMessage";

interface Messages {
  item: any;
  isIncluded: boolean;
}

const Messages = ({ item, isIncluded }: Messages) => {
  const LMChatContextStyles = useLMChatStyles();
  const {
    reactionArr,
    isTypeSent,
    userIdStringified,
    isItemIncludedInStateArr,

    handleLongPress,
  } = useMessageContext();

  const { removeReaction, chatroomID } = useChatroomContext();

  const chatBubbleStyles = LMChatContextStyles?.chatBubbleStyles;

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
              />
            )}
          </View>
        ) : null}

        {/* Reaction List */}
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
      </View>
    </View>
  );
};

export default Messages;
