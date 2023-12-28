import { initMyClient } from "./ChatSX/setup";
import { ChatRoom } from "./ChatSX/screens/ChatRoom";
import { LMChatProvider } from "./ChatSX/LMChatProvider";
import store from "./ChatSX/store";

const myClient = initMyClient("1ba9ef67-ff68-4b6c-b0ee-32dd4f77d881");

export { myClient, ChatRoom, LMChatProvider, store };
