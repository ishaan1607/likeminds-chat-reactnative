import { LMChatClient } from "@likeminds.community/chat-rn";
import {
  ChatBubbleStylesProps,
  InputBoxStyles,
  ReactionListStylesProps,
  ThemeStyles,
} from "../lmChatProvider/type";

export interface LMOverlayProviderProps {
  myClient: LMChatClient;
  children: React.ReactNode;
  userName: string;
  userUniqueId: string;
  profileImageUrl: string;
  lmChatInterface?: any;
}
