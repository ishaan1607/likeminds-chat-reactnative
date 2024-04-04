import { View, Image, Pressable } from "react-native";
import React from "react";
import { generateGifString } from "../../commonFuctions";
import STYLES from "../../constants/Styles";

import { useAppSelector } from "../../store";
import { AUDIO_TEXT, GIF_TEXT } from "../../constants/Strings";
import { useMessageContext } from "../../context/MessageContext";
import Layout from "../../constants/Layout";
import MessageHeader from "../MessageHeader";
import MessageText from "../MessageText";
import MessageFooter from "../MessageFooter";
import { useCustomComponentsContext } from "../../context/CustomComponentContextProvider";
import { useAttachmentConversationContext } from "../../context/AttachmentConversationContext";
import GIFView from "../GifView";
import { styles } from "../AttachmentConversations/styles";

const GIFConversation = () => {
  const {
    isIncluded,
    item,
    isTypeSent,
    handleLongPress,
    handleOnPress: openKeyboard,
  } = useMessageContext();

  const { customMessageHeader, customMessageFooter } =
    useCustomComponentsContext();

  let firstAttachment = item?.attachments[0];

  const isGif = firstAttachment?.type === GIF_TEXT;
  const isAnswer = isGif ? !!generateGifString(item?.answer) : !!item?.answer;
  const { user } = useAppSelector((state) => state.homefeed);
  const { isReply, isReplyConversation } = useAttachmentConversationContext();

  const chatBubbleStyles = STYLES.$CHAT_BUBBLE_STYLE;

  //styling props
  const borderRadius = chatBubbleStyles?.borderRadius;
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

  const delayLongPress = 200;

  return (
    <>
      <View
        style={[
          styles.displayRow,
          {
            justifyContent: isTypeSent ? "flex-end" : "flex-start",
          },
        ]}
      >
        <View
          style={[
            styles.attachmentMessage,
            {
              width: isReplyConversation ? "100%" : "80%",
              padding: isReplyConversation ? 0 : 10,
            },
            borderRadius ? { borderRadius: borderRadius } : null,
            isTypeSent
              ? [
                  styles.sentMessage,
                  sentMessageBackgroundColor
                    ? { backgroundColor: sentMessageBackgroundColor }
                    : null,
                ]
              : [
                  styles.receivedMessage,
                  receivedMessageBackgroundColor
                    ? { backgroundColor: receivedMessageBackgroundColor }
                    : null,
                ],
            isIncluded ? { backgroundColor: SELECTED_BACKGROUND_COLOR } : null,
          ]}
        >
          {/* Message Header */}
          {!!(item?.member?.id !== user?.id) ||
          isReply ? null : customMessageHeader ? (
            customMessageHeader
          ) : (
            <MessageHeader />
          )}

          <GIFView />

          {/* Message text */}
          {isAnswer ? <MessageText /> : null}

          {/* Message Footer */}
          {customMessageFooter ? customMessageFooter : <MessageFooter />}
        </View>

        {/* Add reaction emoji */}
        {!isTypeSent && !(firstAttachment?.type === AUDIO_TEXT) ? (
          <Pressable
            onLongPress={handleLongPress}
            delayLongPress={delayLongPress}
            onPress={openKeyboard}
          >
            <Image
              style={{
                height: Layout.normalize(25),
                width: Layout.normalize(25),
                resizeMode: "contain",
              }}
              source={require("../../assets/images/add_more_emojis3x.png")}
            />
          </Pressable>
        ) : null}
      </View>
    </>
  );
};

export default GIFConversation;
