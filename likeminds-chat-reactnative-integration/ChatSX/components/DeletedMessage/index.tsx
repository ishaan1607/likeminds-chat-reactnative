import { View, Text, TextStyle } from "react-native";
import React from "react";
import { ChatroomType } from "../../enums";
import { useMessageContext } from "../../context/MessageContext";
import { useChatroomContext } from "../../context/ChatroomContext";
import { styles } from "../Messages/styles";
import STYLES from "../../constants/Styles";

const DeletedMessage = () => {
  const {
    isTypeSent,
    conversationDeletor,
    conversationDeletorName,
    conversationCreator,
    currentUserUuid,
    isIncluded,
  } = useMessageContext();

  const { chatroomType } = useChatroomContext();

  const chatBubbleStyles = STYLES.$CHAT_BUBBLE_STYLE;

  //styling props
  const selectedMessageBackgroundColor =
    chatBubbleStyles?.selectedMessageBackgroundColor;

  const SELECTED_BACKGROUND_COLOR = selectedMessageBackgroundColor
    ? selectedMessageBackgroundColor
    : STYLES.$COLORS.SELECTED_BLUE;
  // styling props ended
  return (
    <View style={styles.messageParent}>
      {chatroomType !== ChatroomType.DMCHATROOM ? (
        currentUserUuid === conversationDeletor ? (
          <View
            style={[
              styles.message,
              isTypeSent ? styles.sentMessage : styles.receivedMessage,
              isIncluded
                ? { backgroundColor: SELECTED_BACKGROUND_COLOR }
                : null,
            ]}
          >
            <Text style={[styles.deletedMsg] as TextStyle}>
              You deleted this message
            </Text>
          </View>
        ) : conversationCreator === conversationDeletor ? (
          <View
            style={[
              styles.message,
              isTypeSent ? styles.sentMessage : styles.receivedMessage,
              isIncluded
                ? { backgroundColor: SELECTED_BACKGROUND_COLOR }
                : null,
            ]}
          >
            <Text style={[styles.deletedMsg] as TextStyle}>
              This message has been deleted by {conversationDeletorName}
            </Text>
          </View>
        ) : (
          <View
            style={[
              styles.message,
              isTypeSent ? styles.sentMessage : styles.receivedMessage,
              isIncluded
                ? { backgroundColor: SELECTED_BACKGROUND_COLOR }
                : null,
            ]}
          >
            <Text style={[styles.deletedMsg] as TextStyle}>
              This message has been deleted by Community Manager
            </Text>
          </View>
        )
      ) : currentUserUuid === conversationDeletor ? (
        <View
          style={[
            styles.message,
            isTypeSent ? styles.sentMessage : styles.receivedMessage,
            isIncluded ? { backgroundColor: SELECTED_BACKGROUND_COLOR } : null,
          ]}
        >
          <Text style={[styles.deletedMsg] as TextStyle}>
            You deleted this message
          </Text>
        </View>
      ) : (
        <View
          style={[
            styles.message,
            isTypeSent ? styles.sentMessage : styles.receivedMessage,
            isIncluded ? { backgroundColor: SELECTED_BACKGROUND_COLOR } : null,
          ]}
        >
          <Text style={[styles.deletedMsg] as TextStyle}>
            This message has been deleted by {conversationDeletorName}
          </Text>
        </View>
      )}
    </View>
  );
};

export default DeletedMessage;
