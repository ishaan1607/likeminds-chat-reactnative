import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
  Modal,
  Platform,
} from "react-native";
import { copySelectedMessages } from "../../commonFuctions";
import InputBox from "../../components/InputBox";
import ToastMessage from "../../components/ToastMessage";
import STYLES from "../../constants/Styles";
import { useAppDispatch } from "../../store";
import { styles } from "./styles";
import Clipboard from "@react-native-clipboard/clipboard";
import {
  CLEAR_CHATROOM_TOPIC,
  GET_CONVERSATIONS_SUCCESS,
  LONG_PRESSED,
  SELECTED_MESSAGES,
  SET_EDIT_MESSAGE,
  SET_IS_REPLY,
  SET_REPLY_MESSAGE,
} from "../../store/types/types";
import Layout from "../../constants/Layout";
import { EmojiKeyboard } from "rn-emoji-keyboard";
import { EXPLORE_FEED, HOMEFEED, REPORT } from "../../constants/Screens";
import {
  COMMUNITY_MANAGER_DISABLED_CHAT,
  DM_REQUEST_SENT_MESSAGE,
  REQUEST_SENT,
  APPROVE_BUTTON,
  REJECT_BUTTON,
  WARNING_MSG_PRIVATE_CHATROOM,
  WARNING_MSG_PUBLIC_CHATROOM,
  VOICE_NOTE_TEXT,
} from "../../constants/Strings";
import ApproveDMRequestModal from "../../customModals/ApproveDMRequest";
import BlockDMRequestModal from "../../customModals/BlockDMRequest";
import RejectDMRequestModal from "../../customModals/RejectDMRequest";
import WarningMessageModal from "../../customModals/WarningMessage";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { Keys } from "../../enums";
import { ChatroomType } from "../../enums";
import { ChatroomActions, Events } from "../../enums";
import TrackPlayer from "react-native-track-player";
import { LMChatAnalytics } from "../../analytics/LMChatAnalytics";
import { getConversationType } from "../../utils/analyticsUtils";
import MessageList from "../../components/MessageList";
import {
  ChatroomContextProvider,
  ChatroomContextValues,
  useChatroomContext,
} from "../../context/ChatroomContext";
import { Client } from "../../client";

const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

interface Data {
  id: string;
  title: string;
}

interface ChatRoomProps {
  navigation: any;
  route: any;
}

const ChatRoom = ({ navigation, route }: ChatRoomProps) => {
  return (
    <ChatroomContextProvider navigation={navigation} route={route}>
      <ChatroomComponent />
    </ChatroomContextProvider>
  );
};

const ChatroomComponent = () => {
  const myClient = Client.myClient;
  const {
    navigation,
    conversations,
    chatroomID,
    showDM,
    user,
    memberRights,
    position,
    chatroomWithUser,
    chatroomDetails,
    chatroomDBDetails,
    isLongPress,
    selectedMessages,
    currentChatroomTopic,
    reactionArr,
    chatroomType,
    replyChatID,
    isToast,
    msg,
    reportModalVisible,
    isReact,
    isOpen,
    DMApproveAlertModalVisible,
    DMRejectAlertModalVisible,
    DMBlockAlertModalVisible,
    isMessagePrivately,
    isEditable,
    isWarningMessageModalState,
    shimmerIsLoading,
    isRealmDataPresent,
    chatroomFollowStatus,
    memberCanMessage,
    chatroomDBDetailsLength,
    isChatroomTopic,
    chatRequestState,
    chatroomName,
    chatroomProfile,
    previousRoute,
    isSecret,
    filteredChatroomActions,
    modalVisible,
    refInput,

    setIsEditable,
    setReplyChatID,
    setIsReact,
    setIsOpen,
    setIsToast,
    setChatroomTopic,
    setModalVisible,
    setReportModalVisible,
    handleReportModalClose,
    handleModalClose,
    handleReactionModalClose,
    leaveChatroom,
    hideWarningModal,
    leaveSecretChatroom,
    joinSecretChatroom,
    showJoinAlert,
    showRejectAlert,
    sendReaction,
    removeReaction,
    handlePick,
    handleLongPress,
    handleClick,
    onApprove,
    onReject,
    onTapToUndo,
    blockMember,
    handleDMApproveClick,
    handleDMRejectClick,
    hideDMApproveAlert,
    hideDMRejectAlert,
    hideDMBlockAlert,
    handleFileUpload,
    onReplyPrivatelyClick,
  }: ChatroomContextValues = useChatroomContext();

  const dispatch = useAppDispatch();

  // Initial header of chatroom screen
  const setInitialHeader = () => {
    navigation.setOptions({
      title: "",
      headerShadowVisible: false,
      headerLeft: () => (
        <View style={styles.headingContainer}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require("../../assets/images/back_arrow3x.png")}
              style={styles.backBtn}
            />
          </TouchableOpacity>
          {!(Object.keys(chatroomDBDetails)?.length === 0) ? (
            <View style={styles.alignRow}>
              {chatroomType === ChatroomType.DMCHATROOM ? (
                <View style={styles.profile}>
                  <Image
                    source={
                      chatroomProfile
                        ? { uri: chatroomProfile }
                        : require("../../assets/images/default_pic.png")
                    }
                    style={styles.avatar}
                  />
                </View>
              ) : null}

              <View style={styles.chatRoomInfo}>
                <Text
                  ellipsizeMode="tail"
                  numberOfLines={1}
                  style={{
                    color: STYLES.$COLORS.FONT_PRIMARY,
                    fontSize: STYLES.$FONT_SIZES.LARGE,
                    fontFamily: STYLES.$FONT_TYPES.BOLD,
                    maxWidth: 150,
                  }}
                >
                  {chatroomName}
                </Text>
                {chatroomType !== ChatroomType.DMCHATROOM ? (
                  <Text
                    style={{
                      color: STYLES.$COLORS.MSG,
                      fontSize: STYLES.$FONT_SIZES.SMALL,
                      fontFamily: STYLES.$FONT_TYPES.LIGHT,
                    }}
                  >
                    {chatroomDetails?.participantCount != undefined
                      ? `${chatroomDetails?.participantCount} participants`
                      : ""}
                  </Text>
                ) : null}
              </View>
            </View>
          ) : null}
        </View>
      ),
      headerRight: () =>
        filteredChatroomActions?.length > 0 && (
          <View style={styles.headerRight}>
            {chatroomDetails ? (
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Image
                  source={require("../../assets/images/three_dots3x.png")}
                  style={styles.threeDots}
                />
              </TouchableOpacity>
            ) : null}
          </View>
        ),
    });
  };

  // Selected header of chatroom screen
  const setSelectedHeader = () => {
    navigation.setOptions({
      title: "",
      headerShadowVisible: false,
      headerLeft: () => (
        <View style={styles.headingContainer}>
          <TouchableOpacity
            onPress={() => {
              dispatch({ type: SELECTED_MESSAGES, body: [] });
              dispatch({ type: LONG_PRESSED, body: false });
              setInitialHeader();
            }}
          >
            <Image
              source={require("../../assets/images/blue_back_arrow3x.png")}
              style={styles.selectedBackBtn}
            />
          </TouchableOpacity>
          <View style={styles.chatRoomInfo}>
            <Text
              style={{
                color: STYLES.$COLORS.FONT_PRIMARY,
                fontSize: STYLES.$FONT_SIZES.LARGE,
                fontFamily: STYLES.$FONT_TYPES.BOLD,
              }}
            >
              {selectedMessages?.length}
            </Text>
          </View>
        </View>
      ),
      headerRight: () => {
        const len = selectedMessages?.length;
        const communityManagerState = 1;
        let userCanDeleteParticularMessageArr: any = [];
        let selectedMessagesIDArr: any = [];
        let isCopy = false;
        let showCopyIcon = true;
        let isDelete = false;
        const isFirstMessageDeleted = selectedMessages[0]?.deletedBy;
        let isSelectedMessageEditable = false;
        const selectedMessagesLength = selectedMessages?.length;

        //Logic to set isSelectedMessageEditable true/false, based on that we will show edit icon.
        if (selectedMessagesLength === 1) {
          if (
            selectedMessages[0]?.member?.id == user?.id &&
            !!selectedMessages[0]?.answer &&
            selectedMessages[0]?.deletedBy == null
          ) {
            isSelectedMessageEditable = true;
          } else {
            isSelectedMessageEditable = false;
          }
        } else {
          isSelectedMessageEditable = false;
        }

        //Logic to set isCopy, showCopyIcon, isDelete true/false, based on that we will show respective icons.
        for (let i = 0; i < selectedMessagesLength; i++) {
          if (selectedMessages[i]?.attachmentCount > 0) {
            showCopyIcon = false;
          }

          if (!selectedMessages[i]?.deletedBy && showCopyIcon) {
            isCopy = true;
          } else if (!showCopyIcon) {
            isCopy = false;
          }

          if (
            selectedMessages[i]?.member?.id == user?.id &&
            !selectedMessages[i]?.deletedBy
          ) {
            userCanDeleteParticularMessageArr = [
              ...userCanDeleteParticularMessageArr,
              true,
            ];
            selectedMessagesIDArr = [
              ...selectedMessagesIDArr,
              selectedMessages[i]?.id,
            ];
          } else {
            userCanDeleteParticularMessageArr = [
              ...userCanDeleteParticularMessageArr,
              false,
            ];
            selectedMessagesIDArr = [
              ...selectedMessagesIDArr,
              selectedMessages[i]?.id,
            ];
          }
        }

        if (userCanDeleteParticularMessageArr.includes(false)) {
          if (
            user?.state === communityManagerState &&
            userCanDeleteParticularMessageArr?.length === 1 &&
            !isFirstMessageDeleted
          ) {
            isDelete = true;
          } else {
            isDelete = false;
          }
        } else {
          isDelete = true;
        }
        return (
          <View style={styles.selectedHeadingContainer}>
            {len === 1 &&
              !isFirstMessageDeleted &&
              memberCanMessage &&
              chatroomFollowStatus && (
                <TouchableOpacity
                  onPress={() => {
                    if (len > 0) {
                      setReplyChatID(selectedMessages[0]?.id);
                      dispatch({ type: SET_IS_REPLY, body: { isReply: true } });
                      dispatch({
                        type: SET_REPLY_MESSAGE,
                        body: { replyMessage: selectedMessages[0] },
                      });
                      dispatch({ type: SELECTED_MESSAGES, body: [] });
                      dispatch({ type: LONG_PRESSED, body: false });
                      setInitialHeader();
                      refInput?.current.focus();
                      LMChatAnalytics.track(
                        Events.MESSAGE_REPLY,
                        new Map<string, string>([
                          [Keys.TYPE, getConversationType(selectedMessages[0])],
                          [Keys.CHATROOM_ID, chatroomID?.toString()],
                          [
                            Keys.REPLIED_TO_MEMBER_ID,
                            selectedMessages[0]?.member?.id,
                          ],
                          [
                            Keys.REPLIED_TO_MEMBER_STATE,
                            selectedMessages[0]?.member?.state,
                          ],
                          [Keys.REPLIED_TO_MESSAGE_ID, selectedMessages[0]?.id],
                        ])
                      );
                    }
                  }}
                >
                  <Image
                    source={require("../../assets/images/reply_icon3x.png")}
                    style={styles.threeDots}
                  />
                </TouchableOpacity>
              )}

            {len === 1 && !isFirstMessageDeleted && isCopy ? (
              <TouchableOpacity
                onPress={() => {
                  const output = copySelectedMessages(
                    selectedMessages,
                    chatroomID
                  );
                  Clipboard.setString(output);
                  dispatch({ type: SELECTED_MESSAGES, body: [] });
                  dispatch({ type: LONG_PRESSED, body: false });
                  setInitialHeader();
                }}
              >
                <Image
                  source={require("../../assets/images/copy_icon3x.png")}
                  style={styles.threeDots}
                />
              </TouchableOpacity>
            ) : len > 1 && isCopy ? (
              <TouchableOpacity
                onPress={() => {
                  const output = copySelectedMessages(
                    selectedMessages,
                    chatroomID
                  );
                  Clipboard.setString(output);
                  dispatch({ type: SELECTED_MESSAGES, body: [] });
                  dispatch({ type: LONG_PRESSED, body: false });
                  setInitialHeader();
                }}
              >
                <Image
                  source={require("../../assets/images/copy_icon3x.png")}
                  style={styles.threeDots}
                />
              </TouchableOpacity>
            ) : null}

            {isSelectedMessageEditable &&
            (chatroomType === ChatroomType.DMCHATROOM
              ? !!chatRequestState
              : true) ? ( // this condition checks in case of DM, chatRequestState != 0 && chatRequestState != null then only show edit Icon
              <TouchableOpacity
                onPress={() => {
                  setIsEditable(true);
                  dispatch({
                    type: SET_EDIT_MESSAGE,
                    body: { editConversation: { ...selectedMessages[0] } },
                  });
                  dispatch({ type: SELECTED_MESSAGES, body: [] });
                  refInput.current.focus();
                }}
              >
                <Image
                  source={require("../../assets/images/edit_icon3x.png")}
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            ) : null}
            {isDelete && (
              <TouchableOpacity
                onPress={async () => {
                  const res = await myClient
                    .deleteConversations({
                      conversationIds: selectedMessagesIDArr,
                      reason: "none",
                    })
                    .then(async () => {
                      dispatch({ type: SELECTED_MESSAGES, body: [] });
                      dispatch({ type: LONG_PRESSED, body: false });
                      let updatedConversations;
                      for (let i = 0; i < selectedMessagesIDArr.length; i++) {
                        LMChatAnalytics.track(
                          Events.MESSAGE_DELETED,
                          new Map<string, string>([
                            [
                              Keys.TYPE,
                              getConversationType(selectedMessages[i]),
                            ],
                            [Keys.CHATROOM_ID, chatroomID?.toString()],
                          ])
                        );
                        if (
                          selectedMessagesIDArr[i] == currentChatroomTopic?.id
                        ) {
                          dispatch({
                            type: CLEAR_CHATROOM_TOPIC,
                          });
                          updatedConversations =
                            await myClient?.deleteConversation(
                              selectedMessagesIDArr[i],
                              user,
                              conversations,
                              true,
                              chatroomID?.toString()
                            );
                        } else {
                          updatedConversations =
                            await myClient?.deleteConversation(
                              selectedMessagesIDArr[i],
                              user,
                              conversations,
                              false,
                              chatroomID?.toString()
                            );
                        }
                        // to stop audio player if we delete the message
                        const conversation: any =
                          await myClient.getConversation(
                            selectedMessagesIDArr[i]
                          );
                        if (
                          conversation[0]?.attachments[0]?.type ==
                          VOICE_NOTE_TEXT
                        ) {
                          await TrackPlayer.reset();
                        }
                      }
                      dispatch({
                        type: GET_CONVERSATIONS_SUCCESS,
                        body: { conversations: updatedConversations },
                      });
                      setInitialHeader();
                    })
                    .catch(() => {
                      Alert.alert("Delete message failed");
                    });
                }}
              >
                <Image
                  source={require("../../assets/images/delete_icon3x.png")}
                  style={styles.threeDots}
                />
              </TouchableOpacity>
            )}
            {len === 1 && !isFirstMessageDeleted && (
              <TouchableOpacity
                onPress={() => {
                  setReportModalVisible(true);
                }}
              >
                <Image
                  source={require("../../assets/images/three_dots3x.png")}
                  style={styles.threeDots}
                />
              </TouchableOpacity>
            )}
          </View>
        );
      },
    });
  };

  // this useEffect update initial header when we get chatroomDetails.
  useEffect(() => {
    setInitialHeader();
  }, [chatroomDBDetails, chatroomDetails]);

  // this useEffect update headers when we longPress or update selectedMessages array.
  useEffect(() => {
    if (selectedMessages?.length === 0) {
      setInitialHeader();
    } else if (isLongPress) {
      setSelectedHeader();
    }
  }, [isLongPress, selectedMessages]);

  return (
    <View style={styles.container}>
      <MessageList />

      {/* Input Box Flow */}
      <View
        style={{
          marginTop: "auto",
        }}
      >
        {/* if chatroomType !== 10 (Not DM) then show group bottom changes, else if chatroomType === 10 (DM) then show DM bottom changes */}
        {chatroomType !== ChatroomType.DMCHATROOM &&
        memberRights?.length > 0 ? (
          <View>
            {!(chatroomDBDetailsLength === 0) &&
            previousRoute?.name === EXPLORE_FEED
              ? !chatroomFollowStatus && (
                  <TouchableOpacity
                    onPress={() => {
                      joinSecretChatroom();
                    }}
                    style={[styles.joinBtnContainer, { alignSelf: "center" }]}
                  >
                    <Image
                      source={require("../../assets/images/join_group3x.png")}
                      style={styles.icon}
                    />
                    <Text style={styles.join}>{"Join"}</Text>
                  </TouchableOpacity>
                )
              : null}
            {!(chatroomDBDetailsLength === 0) ? (
              //case to block normal user from messaging in a chatroom where only CMs can message
              user.state !== 1 &&
              chatroomDBDetails?.memberCanMessage === false ? (
                <View style={styles.disabledInput}>
                  <Text style={styles.disabledInputText}>
                    Only Community Manager can message here.
                  </Text>
                </View>
              ) : //case to allow CM for messaging in an Announcement Room
              !(user.state !== 1 && chatroomDBDetails?.type === 7) &&
                chatroomFollowStatus &&
                memberRights[3]?.isSelected === true ? (
                <InputBox
                  chatroomName={chatroomName}
                  chatroomWithUser={chatroomWithUser}
                  replyChatID={replyChatID}
                  chatroomID={chatroomID}
                  navigation={navigation}
                  isUploadScreen={false}
                  myRef={refInput}
                  handleFileUpload={handleFileUpload}
                  isEditable={isEditable}
                  setIsEditable={(value: boolean) => {
                    setIsEditable(value);
                  }}
                  isSecret={isSecret}
                  chatroomType={chatroomType}
                  currentChatroomTopic={currentChatroomTopic}
                />
              ) : //case to block normal users from messaging in an Announcement Room
              user.state !== 1 && chatroomDBDetails?.type === 7 ? (
                <View style={styles.disabledInput}>
                  <Text style={styles.disabledInputText}>
                    Only Community Manager can message here.
                  </Text>
                </View>
              ) : memberRights[3]?.isSelected === false ? (
                <View style={styles.disabledInput}>
                  <Text style={styles.disabledInputText}>
                    The community managers have restricted you from responding
                    here.
                  </Text>
                </View>
              ) : !(Object.keys(chatroomDBDetails)?.length === 0) &&
                previousRoute?.name === HOMEFEED &&
                isRealmDataPresent ? (
                <View
                  style={{
                    padding: 20,
                    backgroundColor: STYLES.$COLORS.TERTIARY,
                  }}
                >
                  <Text
                    style={styles.inviteText}
                  >{`${chatroomDBDetails?.header} invited you to join this secret group.`}</Text>
                  <View style={{ marginTop: 10 }}>
                    <TouchableOpacity
                      onPress={() => {
                        showJoinAlert();
                      }}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        flexGrow: 1,
                        paddingVertical: 10,
                      }}
                    >
                      <Image
                        style={styles.emoji}
                        source={require("../../assets/images/like_icon3x.png")}
                      />
                      <Text style={styles.inviteBtnText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        showRejectAlert();
                      }}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        flexGrow: 1,
                        paddingVertical: 10,
                      }}
                    >
                      <Image
                        style={styles.emoji}
                        source={require("../../assets/images/ban_icon3x.png")}
                      />
                      <Text style={styles.inviteBtnText}>{REJECT_BUTTON}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ) : (
                <View style={styles.disabledInput}>
                  <Text style={styles.disabledInputText}>
                    Responding is disabled
                  </Text>
                </View>
              )
            ) : (
              <View style={styles.disabledInput}>
                <Text style={styles.disabledInputText}>Loading...</Text>
              </View>
            )}
          </View>
        ) : chatroomType === ChatroomType.DMCHATROOM &&
          memberRights?.length > 0 ? (
          <View>
            {chatRequestState === 0 &&
            (chatroomDBDetails?.chatRequestedBy
              ? chatroomDBDetails?.chatRequestedBy?.id !== user?.id?.toString()
              : null) ? (
              <View style={styles.dmRequestView}>
                <Text style={styles.inviteText}>{DM_REQUEST_SENT_MESSAGE}</Text>
                <View style={styles.dmRequestButtonBox}>
                  <TouchableOpacity
                    onPress={() => {
                      handleDMApproveClick();
                    }}
                    style={styles.requestMessageTextButton}
                  >
                    <Image
                      style={styles.emoji}
                      source={require("../../assets/images/like_icon3x.png")}
                    />
                    <Text style={styles.inviteBtnText}>{APPROVE_BUTTON}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleDMRejectClick();
                    }}
                    style={styles.requestMessageTextButton}
                  >
                    <Image
                      style={styles.emoji}
                      source={require("../../assets/images/ban_icon3x.png")}
                    />
                    <Text style={styles.inviteBtnText}>{REJECT_BUTTON}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            {showDM === false ? (
              <View style={styles.disabledInput}>
                <Text style={styles.disabledInputText}>
                  {COMMUNITY_MANAGER_DISABLED_CHAT}
                </Text>
              </View>
            ) : showDM === true &&
              (chatRequestState === 0 || chatRequestState === 2) ? (
              <View style={styles.disabledInput}>
                <Text style={styles.disabledInputText}>{REQUEST_SENT}</Text>
              </View>
            ) : (showDM === true && chatRequestState === 1) ||
              chatRequestState === null ? (
              <InputBox
                replyChatID={replyChatID}
                chatroomID={chatroomID}
                chatRequestState={chatRequestState}
                chatroomType={chatroomType}
                navigation={navigation}
                isUploadScreen={false}
                isPrivateMember={chatroomDBDetails?.isPrivateMember}
                myRef={refInput}
                handleFileUpload={handleFileUpload}
                isEditable={isEditable}
                setIsEditable={(value: boolean) => {
                  setIsEditable(value);
                }}
              />
            ) : (
              <View style={styles.disabledInput}>
                <Text style={styles.disabledInputText}>Loading...</Text>
              </View>
            )}
          </View>
        ) : null}
      </View>

      {/* Chatroom Action Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Pressable style={styles.centeredView} onPress={handleModalClose}>
          <View>
            <Pressable onPress={() => {}} style={[styles.modalView]}>
              {filteredChatroomActions?.map((val: any, index: any) => {
                return (
                  <TouchableOpacity
                    onPress={async () => {
                      if (val?.id === ChatroomActions.VIEW_PARTICIPANTS) {
                        setModalVisible(false);
                        // navigation.navigate(VIEW_PARTICIPANTS, {
                        //   chatroomID: chatroomID,
                        //   isSecret: isSecret,
                        //   chatroomName: chatroomName,
                        // });
                      } else if (
                        val?.id === ChatroomActions.LEAVE_CHATROOM ||
                        val?.id === ChatroomActions.LEAVE_SECRET_CHATROOM
                      ) {
                        // showWarningModal();
                        setModalVisible(false);
                      } else if (val?.id === ChatroomActions.JOIN_CHATROOM) {
                        if (!isSecret) {
                          // joinChatroom();
                        }
                        setModalVisible(false);
                      } else if (
                        val?.id === ChatroomActions.MUTE_NOTIFICATIONS
                      ) {
                        // await muteNotifications();
                        setModalVisible(false);
                      } else if (
                        val?.id === ChatroomActions.UNMUTE_NOTIFICATIONS
                      ) {
                        // await unmuteNotifications();
                        setModalVisible(false);
                      } else if (val?.id === ChatroomActions.VIEW_PROFILE) {
                        //View Profile code
                      } else if (val?.id === ChatroomActions.BLOCK_MEMBER) {
                        // await handleBlockMember();
                        setModalVisible(false);
                      } else if (val?.id === ChatroomActions.UNBLOCK_MEMBER) {
                        // await unblockMember();
                        setModalVisible(false);
                      } else if (val?.id === ChatroomActions.SHARE) {
                        // Share flow
                        // onShare(
                        //   chatroomID,
                        //   chatroomType,
                        //   chatroomDBDetails?.isSecret
                        // );
                      }
                    }}
                    key={val?.id}
                    style={styles.filtersView}
                  >
                    <Text style={styles.filterText}>{val?.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      {/* Report Action Modal */}
      <Modal
        transparent={true}
        visible={reportModalVisible && selectedMessages?.length == 1}
        onRequestClose={() => {
          setReportModalVisible(!modalVisible);
        }}
      >
        <Pressable style={styles.centeredView} onPress={handleReportModalClose}>
          <View>
            <Pressable onPress={() => {}} style={[styles.modalView]}>
              {isMessagePrivately ? (
                <TouchableOpacity
                  onPress={() => {
                    const uuid =
                      selectedMessages[0]?.member?.sdkClientInfo?.uuid;

                    onReplyPrivatelyClick(uuid, selectedMessages[0]?.id);
                    dispatch({ type: SELECTED_MESSAGES, body: [] });
                    setReportModalVisible(false);
                    // handleReportModalClose()
                  }}
                  style={styles.filtersView}
                >
                  <Text style={styles.filterText}>Message Privately</Text>
                </TouchableOpacity>
              ) : null}

              {isChatroomTopic && chatroomType !== ChatroomType.DMCHATROOM ? (
                <TouchableOpacity
                  onPress={async () => {
                    setChatroomTopic();
                    setReportModalVisible(false);
                  }}
                  style={styles.filtersView}
                >
                  <Text style={styles.filterText}>Set chatroom topic</Text>
                </TouchableOpacity>
              ) : null}

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(REPORT, {
                    conversationID: selectedMessages[0]?.id,
                    chatroomID: chatroomID,
                    selectedMessages: selectedMessages[0],
                  });
                  dispatch({ type: SELECTED_MESSAGES, body: [] });
                  setReportModalVisible(false);
                }}
                style={styles.filtersView}
              >
                <Text style={styles.filterText}>Report Message</Text>
              </TouchableOpacity>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      {/* Message Reaction Modal */}
      <Modal
        transparent={true}
        visible={isReact}
        onRequestClose={() => {
          setIsReact(false);
        }}
      >
        <Pressable
          style={styles.reactionCenteredView}
          onPress={handleReactionModalClose}
        >
          <View>
            <Pressable
              onPress={() => {}}
              style={[
                styles.reactionModalView,
                {
                  top:
                    position.y > Layout.window.height / 2
                      ? Platform.OS === "ios"
                        ? position.y - 150
                        : position.y - 100
                      : position.y - 10,
                },
              ]}
            >
              {reactionArr?.map((val: any, index: any) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      sendReaction(val, false);
                    }}
                    key={val + index}
                    style={styles.reactionFiltersView}
                  >
                    <Text style={styles.filterText}>{val}</Text>
                  </TouchableOpacity>
                );
              })}
              <Pressable
                style={[
                  {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    marginTop: 8,
                  },
                ]}
                onPress={() => {
                  setIsOpen(true);
                  setIsReact(false);
                }}
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
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      {/* Emoji Keyboard Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(false);
        }}
      >
        <Pressable
          style={styles.emojiCenteredView}
          onPress={() => {
            setIsOpen(false);
          }}
        >
          <View>
            <Pressable onPress={() => {}} style={[styles.emojiModalView]}>
              <View style={{ height: 350 }}>
                <EmojiKeyboard
                  categoryPosition="top"
                  onEmojiSelected={handlePick}
                />
              </View>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      {/* CHATROOM LEAVING WARNING message modal */}
      <WarningMessageModal
        hideWarningModal={hideWarningModal}
        warningMessageModalState={isWarningMessageModalState}
        warningMessage={
          isSecret ? WARNING_MSG_PRIVATE_CHATROOM : WARNING_MSG_PUBLIC_CHATROOM
        }
        leaveChatroom={() => {
          if (isSecret) {
            leaveSecretChatroom();
          } else {
            leaveChatroom();
          }
        }}
      />

      {/* APPROVE DM request Modal */}
      <ApproveDMRequestModal
        hideDMApproveAlert={hideDMApproveAlert}
        DMApproveAlertModalVisible={DMApproveAlertModalVisible}
        onApprove={onApprove}
      />

      {/* REJECT DM request Modal */}
      <RejectDMRequestModal
        hideDMRejectAlert={hideDMRejectAlert}
        DMRejectAlertModalVisible={DMRejectAlertModalVisible}
        onReject={onReject}
        navigation={navigation}
        chatroomID={chatroomID}
        chatroomType={chatroomType}
      />

      {/* BLOCK DM request Modal */}
      <BlockDMRequestModal
        hideDMBlockAlert={hideDMBlockAlert}
        DMBlockAlertModalVisible={DMBlockAlertModalVisible}
        blockMember={blockMember}
        chatroomName={chatroomName}
      />

      <ToastMessage
        message={msg}
        isToast={isToast}
        onDismiss={() => {
          setIsToast(false);
        }}
      />
    </View>
  );
};

export { ChatRoom };
