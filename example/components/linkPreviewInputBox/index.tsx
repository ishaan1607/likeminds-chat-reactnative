import {View, Text, Image} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {LMChatIcon, LMChatTextView} from 'likeminds_chat_reactnative_ui';

interface OgTags {
  description: string;
  title: string;
  url: string;
  image: string;
}

interface LinkPreviewInputBoxProps {
  ogTags: OgTags;
}

export const LinkPreviewInputBox = ({ogTags}: LinkPreviewInputBoxProps) => {
  return (
    <View style={styles.linkPreviewBox}>
      <View style={styles.linkPreviewImageView}>
        {!!ogTags?.image ? (
          <LMChatIcon
            type="png"
            iconUrl={ogTags?.image}
            iconStyle={styles.linkPreviewIcon}
            boxFit="contain"
            width={80}
            height={80}
          />
        ) : (
          // <Image source={{uri: ogTags?.image}} style={styles.linkPreviewIcon} />
          <LMChatIcon
            type="png"
            assetPath={require('../assets/images/defaultLinkPreview.png')}
            iconStyle={styles.linkPreviewIcon}
            boxFit="contain"
            width={80}
            height={80}
          />
          // <Image
          //   source={require('../assets/images/defaultLinkPreview.png')}
          //   style={styles.linkPreviewIcon}
          // />
        )}
      </View>
      <View style={styles.linkPreviewTextView}>
        <View>
          <LMChatTextView textStyle={styles.linkPreviewTitle} maxLines={2}>
            {ogTags?.title}
          </LMChatTextView>
          {/* <Text style={styles.linkPreviewTitle} numberOfLines={2}>
            {ogTags?.title}
          </Text> */}
        </View>
        <View style={styles.alignRow}>
          <LMChatTextView
            textStyle={styles.linkPreviewMessageText}
            maxLines={1}>
            {ogTags?.description}
          </LMChatTextView>
          {/* <Text style={styles.linkPreviewMessageText} numberOfLines={1}>
            {ogTags?.description}
          </Text> */}
        </View>
        <View style={styles.alignRow}>
          <LMChatTextView
            textStyle={styles.linkPreviewMessageText}
            maxLines={1}>
            {ogTags?.url?.toLowerCase()}
          </LMChatTextView>
          {/* <Text style={styles.linkPreviewMessageText} numberOfLines={1}>
            {ogTags?.url?.toLowerCase()}
          </Text> */}
        </View>
      </View>
    </View>
  );
};

export default LinkPreviewInputBox;
