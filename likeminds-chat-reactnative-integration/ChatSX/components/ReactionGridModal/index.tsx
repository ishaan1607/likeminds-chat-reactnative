import {
  View,
  Text,
  Modal,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { styles } from "./styles";
import MyTabs from "../TopTabNavigator";
import Layout from "../../constants/Layout";

interface ReactionGridModal {
  modalVisible: boolean;
  setModalVisible: (val: any) => void;
  reactionArr: any;
  defaultReactionArr: any;
  removeReaction: any;
  selectedReaction?: any;
  item: any;
  chatroomID: any;
}

const ReactionGridModal = ({
  modalVisible,
  setModalVisible,
  reactionArr,
  defaultReactionArr,
  removeReaction,
  selectedReaction,
  item,
  chatroomID,
}: ReactionGridModal) => {
  const handleModalClose = () => {
    setModalVisible(false);
  };
  return (
    <Modal
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <Pressable style={styles.centeredView} onPress={handleModalClose}>
        <View style={styles.modalParent}>
          <Pressable onPress={() => {}} style={[styles.modalView]}>
            <View style={styles.bar} />
            <View
              style={{
                padding: Layout.normalize(20),
                paddingTop: Layout.normalize(10),
                height: "100%",
              }}
            >
              <Text style={styles.text}>Reactions</Text>
              <MyTabs
                defaultReactionArr={defaultReactionArr}
                reactionArr={reactionArr}
                selectedReaction={selectedReaction}
                removeReaction={removeReaction}
                item={item}
                chatroomID={chatroomID}
              />
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default ReactionGridModal;
