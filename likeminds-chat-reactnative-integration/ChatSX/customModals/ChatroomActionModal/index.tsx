import { View, Text, Modal, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../../screens/ChatRoom/styles";
import { ChatroomActions } from "../../enums";
import {
  ChatroomContextValues,
  useChatroomContext,
} from "../../context/ChatroomContext";
import { onShare } from "../../shareUtils";
import {
  CustomisableMethodsContextProps,
  useCustomisableMethodsContext,
} from "../../context/CustomisableMethodsContext";

const ChatroomActionModal = () => {
  const {
    joinChatroomProp,
    muteNotificationsProp,
    unmuteNotificationsProp,
    unblockMemberProp,
    showViewParticipants,
    showShareChatroom,
    showMuteNotifications,
    showJoinChatroom,
    showLeaveChatroom,
    showUnmuteNotifications,
    showBlockMember,
    showUnBlockMember,
    showViewProfile,
  }: CustomisableMethodsContextProps = useCustomisableMethodsContext();
  const {
    chatroomID,
    chatroomType,
    chatroomDBDetails,
    navigation,
    isSecret,
    filteredChatroomActions,
    modalVisible,
    setModalVisible,
    handleModalClose,
    showWarningModal,
    joinChatroom,
    muteNotifications,
    unmuteNotifications,
    handleBlockMember,
    unblockMember,
  }: ChatroomContextValues = useChatroomContext();
  const updatedFilteredChatroomActions = filteredChatroomActions.filter(
    (item) => {
      if (
        item.id === ChatroomActions.VIEW_PARTICIPANTS &&
        showViewParticipants
      ) {
        return true;
      }
      if (
        (item.id === ChatroomActions.LEAVE_CHATROOM && showLeaveChatroom) ||
        (item.id === ChatroomActions.LEAVE_SECRET_CHATROOM && showLeaveChatroom)
      ) {
        return true;
      }
      if (item.id === ChatroomActions.SHARE && showShareChatroom) {
        return true;
      }
      if (
        item.id === ChatroomActions.MUTE_NOTIFICATIONS &&
        showMuteNotifications
      ) {
        return true;
      }
      if (
        item.id === ChatroomActions.UNMUTE_NOTIFICATIONS &&
        showUnmuteNotifications
      ) {
        return true;
      }
      if (item.id === ChatroomActions.JOIN_CHATROOM && showJoinChatroom) {
        return true;
      }
      if (item.id === ChatroomActions.VIEW_PROFILE && showViewProfile) {
        return true;
      }
      if (item.id === ChatroomActions.BLOCK_MEMBER && showBlockMember) {
        return true;
      }
      if (item.id === ChatroomActions.UNBLOCK_MEMBER && showUnBlockMember) {
        return true;
      }
      return false;
    }
  );
  return (
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
                        joinChatroomProp
                          ? await joinChatroomProp()
                          : await joinChatroom();
                      }
                      setModalVisible(false);
                    } else if (val?.id === ChatroomActions.MUTE_NOTIFICATIONS) {
                      muteNotificationsProp
                        ? await muteNotificationsProp()
                        : await muteNotifications();
                      setModalVisible(false);
                    } else if (
                      val?.id === ChatroomActions.UNMUTE_NOTIFICATIONS
                    ) {
                      unmuteNotificationsProp
                        ? await unmuteNotificationsProp()
                        : await unmuteNotifications();
                      setModalVisible(false);
                    } else if (val?.id === ChatroomActions.VIEW_PROFILE) {
                      //View Profile code
                    } else if (val?.id === ChatroomActions.BLOCK_MEMBER) {
                      // await handleBlockMember();
                      setModalVisible(false);
                    } else if (val?.id === ChatroomActions.UNBLOCK_MEMBER) {
                      unblockMemberProp
                        ? await unblockMemberProp()
                        : await unblockMember();
                      setModalVisible(false);
                    } else if (val?.id === ChatroomActions.SHARE) {
                      //   Share flow
                      //   onShare(
                      //     chatroomID,
                      //     chatroomType,
                      //     chatroomDBDetails?.isSecret
                      //   );
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
  );
};

export default ChatroomActionModal;
