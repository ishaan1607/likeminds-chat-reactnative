import { initMyClient } from "./ChatSX/setup";
import { ChatRoom } from "./ChatSX/screens/ChatRoom";
import { LMChatProvider } from "./ChatSX/LMChatProvider";
import FileUpload from "./ChatSX/screens/FIleUpload";
import CarouselScreen from "./ChatSX/screens/CarouselScreen";
import PollResult from "./ChatSX/components/PollResult";
import CreatePollScreen from "./ChatSX/components/Poll/CreatePollScreen";
import ImageCropScreen from "./ChatSX/screens/ImageCrop";
import store from "./ChatSX/store";

const myClient = initMyClient("23cd5054-0fc6-4637-8375-5c53ace14a63");

export {
  myClient,
  ChatRoom,
  LMChatProvider,
  store,
  FileUpload,
  CarouselScreen,
  PollResult,
  CreatePollScreen,
  ImageCropScreen,
};
