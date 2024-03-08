import { View, Text, Modal, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../../screens/ChatRoom/styles";
import { ChatroomType } from "../../enums";
import {
  ChatroomContextValues,
  useChatroomContext,
} from "../../context/ChatroomContext";
import { REPORT } from "../../constants/Screens";
import { SELECTED_MESSAGES } from "../../store/types/types";
import { useAppDispatch } from "../../store";

const ReportActionModal = ({ setChatroomTopicProp }: any) => {
  const dispatch = useAppDispatch();

  const {
    navigation,
    chatroomID,
    selectedMessages,
    chatroomType,
    reportModalVisible,
    isMessagePrivately,
    isChatroomTopic,
    modalVisible,

    setChatroomTopic,
    setReportModalVisible,
    handleReportModalClose,
    onReplyPrivatelyClick,
  }: ChatroomContextValues = useChatroomContext();

  return (
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
                  const uuid = selectedMessages[0]?.member?.sdkClientInfo?.uuid;

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
                  console.log("setChatroomTopicProp", setChatroomTopicProp);
                  setChatroomTopicProp
                    ? setChatroomTopicProp()
                    : setChatroomTopic();
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
  );
};

export default ReportActionModal;
