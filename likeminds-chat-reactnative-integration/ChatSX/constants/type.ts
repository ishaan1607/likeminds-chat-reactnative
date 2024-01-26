export interface StylesProps {
  hue?: number;
  fontColor?: string;
  primaryColor?: string;
  secondaryColor?: string;
  lightBackgroundColor?: string;
}

export interface ChatBubbleStyles {
  borderRadius?: number;
  sentMessageBackgroundColor?: string;
  receivedMessageBackgroundColor?: string;
  selectedBackgroundColor?: string;
  selectedMessageBackgroundColor?: string;
  textStyles?: {
    fontSize?: number;
    fontStyle?: string;
    fontFamily?: string;
  };
  linkTextColor?: string;
  taggingTextColor?: string;
  stateMessagesBackgroundColor?: string;
  stateMessagesTextStyles?: {
    fontSize?: number;
    fontStyle?: string;
    fontFamily?: string;
  };
}

export interface ReactionListStyles {
  reactionSize?: number;
  reactionLeftItemStroke?: string;
  reactionRightItemStroke?: string;
  reactionItemBorderRadius?: number;
  gap?: number;
  selectedMessageBackgroundColor?: string;
}

export interface InputBoxStyles {
  placeholderTextColor?: string;
  selectionColor?: string;
  partsTextStyle?: {
    color?: string;
  };
  plainTextStyle?: {
    color?: string;
  };
  inputTextStyle?: {
    flexGrow?: number;
    fontSize?: string;
    fontFamily?: string;
    maxHeight?: number;
    padding?: number;
    marginBottom?: number;
    overflow?: string;
  };
  sendIconStyles?: {
    width?: number;
    height?: number;
    resizeMode?: string;
    marginLeft?: number;
  };
  attachmentIconStyles?: {
    width?: number;
    height?: number;
    resizeMode?: string;
  };
  micIconStyles?: {
    width?: number;
    height?: number;
    resizeMode?: string;
  };
  cameraIconStyles?: {
    width?: number;
    height?: number;
    resizeMode?: string;
  };
  galleryIconStyles?: {
    width?: number;
    height?: number;
    resizeMode?: string;
  };
  documentIconStyles?: {
    width?: number;
    height?: number;
    resizeMode?: string;
  };
  pollIconStyles?: {
    width?: number;
    height?: number;
    resizeMode?: string;
  };
}
