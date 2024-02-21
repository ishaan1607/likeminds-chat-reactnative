import { View, Text } from "react-native";
import React from "react";
import { styles } from "../AttachmentConversations/styles";
import { useMessageContext } from "../../context/MessageContext";

const MessageFooter = () => {
  const { item } = useMessageContext();
  return (
    <View style={styles.alignTime}>
      {item?.isEdited ? (
        <Text style={styles.messageDate}>{"Edited • "}</Text>
      ) : null}
      <Text style={styles.messageDate}>{item?.createdAt}</Text>
    </View>
  );
};

export default MessageFooter;
