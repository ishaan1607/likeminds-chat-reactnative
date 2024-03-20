import {
  View,
  Text,
  Image,
  Pressable,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import React from "react";
import { styles } from "../../screens/ChatRoom/styles";
import {
  ChatroomContextValues,
  useChatroomContext,
} from "../../context/ChatroomContext";
import Layout from "../../constants/Layout";

const MessageReactionModal = () => {
  const {
    position,
    reactionArr,
    isReact,

    setIsReact,
    setIsOpen,
    handleReactionModalClose,
    sendReaction,
  }: ChatroomContextValues = useChatroomContext();
  return (
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
  );
};

export default MessageReactionModal;
