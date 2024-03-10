import { View, Text, Modal, Pressable, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../styles";
import {
  CONFIRM_BUTTON,
  CANCEL_BUTTON,
  WARNING_MSG_PRIVATE_CHATROOM,
  WARNING_MSG_PUBLIC_CHATROOM,
} from "../../constants/Strings";
import {
  ChatroomContextValues,
  useChatroomContext,
} from "../../context/ChatroomContext";

interface WarningMessageModal {
  leaveChatroomProp: () => void;
  leaveSecretChatroomProp: () => void;
}

const WarningMessageModal = ({
  leaveChatroomProp,
  leaveSecretChatroomProp,
}: WarningMessageModal) => {
  const {
    isWarningMessageModalState,
    isSecret,

    leaveChatroom,
    leaveSecretChatroom,
    hideWarningModal,
  }: ChatroomContextValues = useChatroomContext();

  const warningMessage = isSecret
    ? WARNING_MSG_PRIVATE_CHATROOM
    : WARNING_MSG_PUBLIC_CHATROOM;

  return (
    <Modal
      visible={isWarningMessageModalState}
      animationType="fade"
      transparent={true}
      onRequestClose={hideWarningModal}
    >
      <Pressable style={styles.modal} onPress={hideWarningModal}>
        <Pressable onPress={() => {}} style={styles.modalContainer}>
          <Text style={styles.message}>{warningMessage}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={hideWarningModal}
            >
              <Text style={[styles.buttonText, styles.cancelButtonText]}>
                {CANCEL_BUTTON}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.okButton]}
              onPress={() => {
                () => {
                  if (isSecret) {
                    leaveSecretChatroomProp
                      ? leaveSecretChatroomProp()
                      : leaveSecretChatroom();
                  } else {
                    leaveChatroomProp ? leaveChatroomProp() : leaveChatroom();
                  }
                };
                hideWarningModal();
              }}
            >
              <Text style={styles.buttonText}>{CONFIRM_BUTTON}</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default WarningMessageModal;
