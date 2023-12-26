import { View, Text, Image, TouchableOpacity, Pressable } from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { styles } from "./styles";
import STYLES from "../../constants/Styles";
import { decode } from "../../commonFuctions";
import ReplyConversations from "../ReplyConversations";
import AttachmentConversations from "../AttachmentConversations";
import ReactionGridModal from "../ReactionGridModal";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  LONG_PRESSED,
  SELECTED_MESSAGES,
  SET_POSITION,
} from "../../store/types/types";
import { PollConversationView } from "../Poll";
import { useQuery } from "@realm/react";
import { myClient } from "../../..";
import { ChatroomChatRequestState, Events, Keys } from "../../enums";
import { ChatroomType } from "../../enums";
import { UserSchemaResponse } from "../../db/models";
import { USER_SCHEMA_RO } from "../../constants/Strings";
import LinkPreview from "../LinkPreview";
import { LMChatAnalytics } from "../../analytics/LMChatAnalytics";
import { Credentials } from "../../credentials";
import ReactionList from "../ReactionList";

interface Messages {
  item: any;
  isIncluded: boolean;
  onScrollToIndex: any;
  navigation: any;
  openKeyboard: any;
  longPressOpenKeyboard: any;
  removeReaction: any;
  handleTapToUndo: any;
  handleFileUpload: any;
  chatroomType: any;
  chatroomID: any;
  chatroomName: any;

  // styling props
  borderRadius: number;
  sentMessageBackgroundColor: string;
  receivedMessageBackgroundColor: string;
  selectedBackgroundColor: string;
  textStyles: any;
  linkTextColor: string;
  taggingTextColor: string;
  stateMessagesBackgroundColor: string;
  stateMessagesTextStyles: any;
}

const Messages = ({
  item,
  isIncluded,
  onScrollToIndex,
  navigation,
  openKeyboard,
  longPressOpenKeyboard,
  removeReaction,
  handleTapToUndo,
  handleFileUpload,
  chatroomType,
  chatroomID,
  chatroomName,

  //styling props
  borderRadius,
  sentMessageBackgroundColor,
  receivedMessageBackgroundColor,
  selectedBackgroundColor,
  textStyles,
  linkTextColor,
  taggingTextColor,
  stateMessagesBackgroundColor,
  stateMessagesTextStyles,
}: Messages) => {
  const { user } = useAppSelector((state) => state.homefeed);

  const { stateArr, conversations, chatroomDBDetails }: any = useAppSelector(
    (state) => state.chatroom
  );

  const [reactionArr, setReactionArr] = useState([] as any);
  const userIdStringified = user?.id?.toString();
  const isTypeSent = item?.member?.id == userIdStringified ? true : false;
  const chatroomWithUser = chatroomDBDetails?.chatroomWithUser;
  const isItemIncludedInStateArr = stateArr.includes(item?.state);

  const SELECTED_BACKGROUND_COLOR = selectedBackgroundColor
    ? selectedBackgroundColor
    : STYLES.$COLORS.SELECTED_BLUE;

  const dispatch = useAppDispatch();

  const defaultReactionArrLen = item?.reactions?.length;

  //this useEffect update setReactionArr in format of { reaction: 👌, memberArr: []}
  useEffect(() => {
    let tempArr = [] as any;
    if (defaultReactionArrLen === 0) {
      setReactionArr([]);
    }
    for (let i = 0; i < defaultReactionArrLen; i++) {
      if (defaultReactionArrLen > 0) {
        const isIncuded = tempArr.some(
          (val: any) => val.reaction === item?.reactions[i]?.reaction
        );
        if (isIncuded) {
          const index = tempArr.findIndex(
            (val: any) => val.reaction === item?.reactions[i]?.reaction
          );
          tempArr[index].memberArr = [
            ...tempArr[index]?.memberArr,
            item?.reactions[i]?.member,
          ];
          setReactionArr([...tempArr] as any);
        } else {
          const obj = {
            reaction: item?.reactions[i]?.reaction,
            memberArr: [item?.reactions[i]?.member],
          };
          tempArr = [...tempArr, obj];
          setReactionArr([...tempArr] as any);
        }
      }
    }
  }, [item?.reactions]);

  // function handles event on longPress action on a message
  const handleLongPress = (event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    dispatch({
      type: SET_POSITION,
      body: { pageX: pageX, pageY: pageY },
    });
    longPressOpenKeyboard();
  };

  // function handles event on Press action on a message
  const handleOnPress = (event: any) => {
    const { pageX, pageY } = event.nativeEvent;
    dispatch({
      type: SET_POSITION,
      body: { pageX: pageX, pageY: pageY },
    });
    openKeyboard();
  };

  const conversationDeletor = item?.deletedByMember?.sdkClientInfo?.uuid;
  const conversationDeletorName = item?.deletedByMember?.name;
  const conversationCreator = item?.member?.sdkClientInfo?.uuid;
  const chatroomWithUserUuid = user?.sdkClientInfo?.uuid;
  const chatroomWithUserMemberId = user?.id;
  const users = useQuery<UserSchemaResponse>(USER_SCHEMA_RO);
  const currentUserUuid =
    Credentials.userUniqueId.length > 0
      ? Credentials.userUniqueId
      : users[0]?.userUniqueID;

  // Method to trim the initial DM connection message based on loggedInMember id
  const answerTrimming = (answer: string) => {
    const loggedInMember = currentUserUuid;
    const chatroomWithUser =
      chatroomDBDetails?.chatroomWithUser?.sdkClientInfo?.uuid;

    if (loggedInMember === chatroomWithUser) {
      const startingIndex = answer.lastIndexOf("<");
      const receivingUser = answer.substring(0, startingIndex - 2);
      return receivingUser;
    } else {
      const startingIndex = answer.indexOf("<");
      const endingIndex = answer.indexOf(">");
      const sendingUser =
        answer.substring(0, startingIndex - 1) +
        answer.substring(endingIndex + 2);
      return sendingUser;
    }
  };

  return (
    <View style={styles.messageParent}>
      <View>
        {item?.deletedBy ? (
          chatroomType !== ChatroomType.DMCHATROOM ? (
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
                <Text style={styles.deletedMsg}>You deleted this message</Text>
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
                <Text style={styles.deletedMsg}>
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
                <Text style={styles.deletedMsg}>
                  This message has been deleted by Community Manager
                </Text>
              </View>
            )
          ) : currentUserUuid === conversationDeletor ? (
            <View
              style={[
                styles.message,
                isTypeSent ? styles.sentMessage : styles.receivedMessage,
                isIncluded
                  ? { backgroundColor: SELECTED_BACKGROUND_COLOR }
                  : null,
              ]}
            >
              <Text style={styles.deletedMsg}>You deleted this message</Text>
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
              <Text style={styles.deletedMsg}>
                This message has been deleted by {conversationDeletorName}
              </Text>
            </View>
          )
        ) : item?.replyConversationObject ? (
          <ReplyConversations
            isIncluded={isIncluded}
            item={item}
            isTypeSent={isTypeSent}
            onScrollToIndex={onScrollToIndex}
            openKeyboard={() => {
              openKeyboard();
            }}
            longPressOpenKeyboard={() => {
              longPressOpenKeyboard();
            }}
            reactionArr={reactionArr}
            navigation={navigation}
            handleFileUpload={handleFileUpload}
            chatroomID={chatroomID}
            chatroomName={chatroomName}
          />
        ) : !item?.replyConversationObject && item?.attachmentCount > 0 ? (
          <AttachmentConversations
            chatroomName={chatroomName}
            navigation={navigation}
            isIncluded={isIncluded}
            item={item}
            isTypeSent={isTypeSent}
            openKeyboard={() => {
              openKeyboard();
            }}
            longPressOpenKeyboard={() => {
              longPressOpenKeyboard();
            }}
            handleFileUpload={handleFileUpload}
          />
        ) : item?.state === 10 ? (
          <View
            style={[
              styles.pollMessage,
              isTypeSent ? styles.sentMessage : styles.receivedMessage,
              isIncluded
                ? { backgroundColor: SELECTED_BACKGROUND_COLOR }
                : null,
            ]}
          >
            <PollConversationView
              navigation={navigation}
              item={item}
              isIncluded={isIncluded}
              openKeyboard={() => {
                openKeyboard();
              }}
              longPressOpenKeyboard={() => {
                longPressOpenKeyboard();
              }}
            />
          </View>
        ) : item?.ogTags?.url != null && item?.ogTags != undefined ? (
          <LinkPreview
            description={item?.ogTags?.description}
            title={item?.ogTags?.title}
            image={item?.ogTags?.image}
            url={item?.ogTags?.url}
            isTypeSent={isTypeSent}
            isIncluded={isIncluded}
            item={item}
            chatroomName={chatroomName}
          />
        ) : (
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
                      handleTapToUndo();
                    }}
                    style={[
                      styles.statusMessage,
                      stateMessagesBackgroundColor
                        ? { backgroundColor: stateMessagesBackgroundColor }
                        : null,
                    ]}
                  >
                    <Text
                      style={[
                        styles.textCenterAlign,
                        {
                          color: STYLES.$COLORS.PRIMARY,
                          fontFamily: STYLES.$FONT_TYPES.LIGHT,
                        },
                        stateMessagesTextStyles
                          ? { ...stateMessagesTextStyles }
                          : null,
                      ]}
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
                        item?.state === 1 &&
                        chatroomType === ChatroomType.DMCHATROOM
                          ? decode(
                              answerTrimming(item?.answer),
                              true,
                              chatroomName,
                              user?.sdkClientInfo?.community,
                              false,
                              conversationCreator,

                              chatroomWithUserUuid,
                              chatroomWithUserMemberId,
                              (textStyles = stateMessagesTextStyles),
                              taggingTextColor,
                              linkTextColor
                            )
                          : decode(
                              item?.answer,
                              true,
                              chatroomName,
                              user?.sdkClientInfo?.community,
                              false,
                              conversationCreator,

                              chatroomWithUserUuid,
                              chatroomWithUserMemberId,
                              (textStyles = stateMessagesTextStyles),
                              taggingTextColor,
                              linkTextColor
                            )
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
                    [
                      styles.message,
                      borderRadius ? { borderRadius: borderRadius } : null,
                    ],
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
                    {decode(
                      item?.answer,
                      true,
                      chatroomName,
                      user?.sdkClientInfo?.community,
                      textStyles,
                      taggingTextColor,
                      linkTextColor
                    )}
                  </Text>
                  <View style={styles.alignTime}>
                    {item?.isEdited ? (
                      <Text style={styles.messageDate}>{"Edited • "}</Text>
                    ) : null}
                    <Text style={styles.messageDate}>{item?.createdAt}</Text>
                  </View>
                </View>
                {(reactionArr.length > 0 ||
                  item?.answer?.split("").length > 100) &&
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
        )}

        {!isItemIncludedInStateArr ? (
          <View>
            {isTypeSent ? (
              <View
                style={[
                  styles.typeSent,
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
