import { initMyClient } from "./ChatSX/setup";
import { ChatRoom } from "./ChatSX/screens/ChatRoom";
import { LMChatProvider } from "./ChatSX/LMChatProvider";
import store from "./ChatSX/store";

const myClient = initMyClient("23cd5054-0fc6-4637-8375-5c53ace14a63");

export { myClient, ChatRoom, LMChatProvider, store };
