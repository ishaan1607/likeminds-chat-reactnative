import { View, Text, Modal, Pressable } from "react-native";
import React from "react";
import { EmojiKeyboard } from "rn-emoji-keyboard";
import {
  ChatroomContextValues,
  useChatroomContext,
} from "../../context/ChatroomContext";
import { styles } from "../../screens/ChatRoom/styles";

const EmojiKeyboardModal = () => {
  const {
    isOpen,

    setIsOpen,
    handlePick,
  }: ChatroomContextValues = useChatroomContext();
  return (
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
  );
};

export default EmojiKeyboardModal;
