import { LMChatClient } from "@likeminds.community/chat-rn";

export interface LMOverlayProviderProps {
  myClient: LMChatClient;
  children: React.ReactNode;
  userName: string;
  userUniqueId: string;
  profileImageUrl: string;
  lmChatInterface?: any;
}
