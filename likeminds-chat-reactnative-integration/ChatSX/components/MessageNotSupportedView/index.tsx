import { View, Text } from "react-native";
import React from "react";
import { styles } from "../AttachmentConversations/styles";
import { MESSAGE_NOT_SUPPORTED } from "../../constants/Strings";

const MessageNotSupportedView = () => {
  return (
    <View>
      <Text style={styles.deletedMsg}>
        {MESSAGE_NOT_SUPPORTED}
      </Text>
    </View>
  );
};

export default MessageNotSupportedView;
