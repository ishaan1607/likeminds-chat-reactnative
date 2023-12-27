import { initMyClient } from "./ChatSX/setup";
import { ChatRoom } from "./ChatSX/screens/ChatRoom";
import { LMChatProvider } from "./ChatSX/LMChatProvider";
import store from "./ChatSX/store";

const myClient = initMyClient("c9a0a9cc-4844-4088-8fda-3146c61979a8");

export { myClient, ChatRoom, LMChatProvider, store };
