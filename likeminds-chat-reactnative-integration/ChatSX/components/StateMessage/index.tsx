import { View, Text, Pressable, TextStyle, Image } from "react-native";
import React from "react";
import { useLMChatStyles } from "../../lmChatProvider";
import { useMessageContext } from "../../context/MessageContext";
import { useChatroomContext } from "../../context/ChatroomContext";
import STYLES from "../../constants/Styles";
import { useAppSelector } from "../../store";
import { styles } from "../Messages/styles";
import { decode } from "../../commonFuctions";
import { ChatroomType } from "../../enums";

const StateMessage = () => {
  const { conversations }: any = useAppSelector((state) => state.chatroom);
  const { user } = useAppSelector((state) => state.homefeed);
  const LMChatContextStyles = useLMChatStyles();
  const {
    item,
    isIncluded,
    reactionArr,
    isTypeSent,
    userIdStringified,
    chatroomWithUser,
    isItemIncludedInStateArr,
    conversationCreator,
    chatroomWithUserUuid,
    chatroomWithUserMemberId,

    handleLongPress,
    handleOnPress,
    answerTrimming,
  } = useMessageContext();

  const { onTapToUndo, chatroomType, chatroomName } = useChatroomContext();

  const chatBubbleStyles = LMChatContextStyles?.chatBubbleStyles;

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
  const stateMessagesBackgroundColor =
    chatBubbleStyles?.stateMessagesBackgroundColor;
  const stateMessagesTextStyles = chatBubbleStyles?.stateMessagesTextStyles;

  const SELECTED_BACKGROUND_COLOR = selectedMessageBackgroundColor
    ? selectedMessageBackgroundColor
    : STYLES.$COLORS.SELECTED_BLUE;
  // styling props ended
  return (
    <View>
      {isItemIncludedInStateArr ? (
        <View>
          {/* state 19 is for the reject DM state message */}
          {/* Logic is when to show TAP TO UNDO =>
                      Item's state == 19 &&
                      conversation array's first element's ID == 19 &&
                      conversations[0]?.id == item?.id &&
                      chatRequestBy user should be same as user (when we reject DM chat request by changes to the person who rejected the request)
                */}
          {item?.state === 19 &&
          conversations[0]?.state === 19 &&
          conversations[0]?.id === item?.id &&
          (chatroomWithUser
            ? chatroomWithUser?.id == userIdStringified
            : null) ? (
            <Pressable
              onPress={() => {
                onTapToUndo();
              }}
              style={[
                styles.statusMessage,
                stateMessagesBackgroundColor
                  ? { backgroundColor: stateMessagesBackgroundColor }
                  : null,
              ]}
            >
              <Text
                style={
                  [
                    styles.textCenterAlign,
                    {
                      color: STYLES.$COLORS.FONT_PRIMARY,
                      fontFamily: STYLES.$FONT_TYPES.LIGHT,
                    },
                    stateMessagesTextStyles
                      ? { ...stateMessagesTextStyles }
                      : null,
                  ] as TextStyle
                }
              >
                {`${item?.answer} `}
                <Text
                  style={{
                    color: STYLES.$COLORS.LIGHT_BLUE,
                    fontFamily: STYLES.$FONT_TYPES.LIGHT,
                  }}
                >
                  Tap to undo.
                </Text>
              </Text>
            </Pressable>
          ) : (
            <View style={[styles.statusMessage]}>
              <Text style={styles.textCenterAlign}>
                {
                  // State 1 refers to initial DM message, so in that case trimming the first user name
                  item?.state === 1 && chatroomType === ChatroomType.DMCHATROOM
                    ? decode({
                        text: answerTrimming(item?.answer),
                        enableClick: true,
                        chatroomName: chatroomName,
                        communityId: user?.sdkClientInfo?.community,
                        isLongPress: false,
                        memberUuid: conversationCreator,
                        chatroomWithUserUuid: chatroomWithUserUuid,
                        chatroomWithUserMemberId: chatroomWithUserMemberId,
                        textStyles: stateMessagesTextStyles,
                        linkTextColor: linkTextColor,
                        taggingTextColor: taggingTextColor,
                      })
                    : decode({
                        text: item?.answer,
                        enableClick: true,
                        chatroomName: chatroomName,
                        communityId: user?.sdkClientInfo?.community,
                        isLongPress: false,
                        memberUuid: conversationCreator,
                        chatroomWithUserUuid: chatroomWithUserUuid,
                        chatroomWithUserMemberId: chatroomWithUserMemberId,
                        textStyles: stateMessagesTextStyles,
                        linkTextColor: linkTextColor,
                        taggingTextColor: taggingTextColor,
                      })
                }
              </Text>
            </View>
          )}
        </View>
      ) : (
        <View
          style={[
            styles.alignMessage,
            {
              justifyContent: isTypeSent ? "flex-end" : "flex-start",
            },
          ]}
        >
          <View
            style={[
              styles.message,
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
                      ? {
                          backgroundColor: receivedMessageBackgroundColor,
                        }
                      : null,
                  ],
              isIncluded
                ? { backgroundColor: SELECTED_BACKGROUND_COLOR }
                : null,
            ]}
          >
            {item?.member?.id == userIdStringified ? null : (
              <Text style={styles.messageInfo} numberOfLines={1}>
                {item?.member?.name}
                {item?.member?.customTitle ? (
                  <Text
                    style={styles.messageCustomTitle}
                  >{` • ${item?.member?.customTitle}`}</Text>
                ) : null}
              </Text>
            )}
            <Text>
              {decode({
                text: item?.answer,
                enableClick: true,
                chatroomName: chatroomName,
                communityId: user?.sdkClientInfo?.community,
                textStyles: textStyles,
                linkTextColor: linkTextColor,
                taggingTextColor: taggingTextColor,
              })}
            </Text>
            <View style={styles.alignTime}>
              {item?.isEdited ? (
                <Text style={styles.messageDate}>{"Edited • "}</Text>
              ) : null}
              <Text style={styles.messageDate}>{item?.createdAt}</Text>
            </View>
          </View>
          {(reactionArr.length > 0 || item?.answer?.split("").length > 100) &&
          !isTypeSent ? (
            <Pressable
              onLongPress={handleLongPress}
              delayLongPress={200}
              onPress={handleOnPress}
            >
              <Image
                style={{
                  height: 25,
                  width: 25,
                  resizeMode: "contain",
                }}
                source={require("../../assets/images/add_more_emojis3x.png")}
              />
            </Pressable>
          ) : null}
        </View>
      )}
    </View>
  );
};

export default StateMessage;
