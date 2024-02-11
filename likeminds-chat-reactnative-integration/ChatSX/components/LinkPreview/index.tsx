import { View, Text, Image, Linking, Pressable } from "react-native";
import React from "react";
import { styles } from "./styles";
import STYLES from "../../constants/Styles";
import { useAppSelector } from "../../store";
import { decode } from "../../commonFuctions";
import LinkPreviewBox from "../linkPreviewBox";
import { useChatroomContext } from "../../context/ChatroomContext";
import { useMessageContext } from "../../context/MessageContext";
import { NavigateToProfileParams } from "../../callBacks/type";
import { CallBack } from "../../callBacks/callBackClass";

const LinkPreview = () => {
  const { user } = useAppSelector((state) => state.homefeed);

  const { isIncluded, item, isTypeSent } = useMessageContext();
  const { chatroomName } = useChatroomContext();

  const description = item?.ogTags?.description;
  const title = item?.ogTags?.title;
  const image = item?.ogTags?.image;
  const url = item?.ogTags?.url;
  const lmChatInterface = CallBack.lmChatInterface;

  const chatBubbleStyles = STYLES.$CHAT_BUBBLE_STYLE;

  //styling props
  const borderRadius = chatBubbleStyles?.borderRadius;
  const sentMessageBackgroundColor =
    chatBubbleStyles?.sentMessageBackgroundColor;
  const receivedMessageBackgroundColor =
    chatBubbleStyles?.receivedMessageBackgroundColor;
  const selectedMessageBackgroundColor =
    chatBubbleStyles?.selectedMessageBackgroundColor;
  const textStyles = chatBubbleStyles?.textStyles;
  const linkTextColor = chatBubbleStyles?.linkTextColor;
  const taggingTextColor = chatBubbleStyles?.taggingTextColor;
  const messageReceivedHeader = chatBubbleStyles?.messageReceivedHeader;
  const senderNameStyles = messageReceivedHeader?.senderNameStyles;
  const senderDesignationStyles =
    messageReceivedHeader?.senderDesignationStyles;

  const SELECTED_BACKGROUND_COLOR = selectedMessageBackgroundColor
    ? selectedMessageBackgroundColor
    : STYLES.$COLORS.SELECTED_BLUE;
  // styling props ended

  return (
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
          styles.linkPreview,
          borderRadius
            ? {
                borderRadius: borderRadius,
              }
            : null,
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
        {/* Reply conversation message sender name */}
        {item?.member?.id == user?.id ? null : (
          <Text
            style={[
              styles.messageInfo,
              senderNameStyles?.color
                ? { color: senderNameStyles?.color }
                : null,
              senderNameStyles?.fontSize
                ? { fontSize: senderNameStyles?.fontSize }
                : null,
              senderNameStyles?.fontFamily
                ? { color: senderNameStyles?.color }
                : null,
            ]}
            numberOfLines={1}
            onPress={() => {
              const params: NavigateToProfileParams = {
                taggedUserId: null,
                member: item?.member,
              };
              lmChatInterface.navigateToProfile(params);
            }}
          >
            {item?.member?.name}
            {item?.member?.customTitle ? (
              <Text
                style={[
                  styles.messageCustomTitle,
                  senderDesignationStyles?.color
                    ? { color: senderDesignationStyles?.color }
                    : null,
                  senderDesignationStyles?.fontSize
                    ? { fontSize: senderDesignationStyles?.fontSize }
                    : null,
                  senderDesignationStyles?.fontFamily
                    ? { color: senderDesignationStyles?.color }
                    : null,
                ]}
              >{` • ${item?.member?.customTitle}`}</Text>
            ) : null}
          </Text>
        )}
        <LinkPreviewBox
          description={description}
          title={title}
          url={url}
          image={image}
        />
        <View>
          <View style={styles.messageText as any}>
            {decode({
              text: item?.answer,
              enableClick: true,
              chatroomName: chatroomName,
              communityId: user?.sdkClientInfo?.community,
              textStyles: textStyles,
              linkTextColor: linkTextColor,
              taggingTextColor: taggingTextColor,
            })}
          </View>
          <View style={styles.alignTime}>
            {item?.isEdited ? (
              <Text style={styles.messageDate}>{"Edited • "}</Text>
            ) : null}
            <Text style={styles.messageDate}>{item?.createdAt}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LinkPreview;
