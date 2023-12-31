import { initMyClient } from "./ChatSX/setup";
import { ChatRoom } from "./ChatSX/screens/ChatRoom";
import { LMChatProvider } from "./ChatSX/LMChatProvider";
import FileUpload from "./ChatSX/screens/FIleUpload";
import CarouselScreen from "./ChatSX/screens/CarouselScreen";
import PollResult from "./ChatSX/components/PollResult";
import CreatePollScreen from "./ChatSX/components/Poll/CreatePollScreen";
import ImageCropScreen from "./ChatSX/screens/ImageCrop";
import VideoPlayer from "./ChatSX/screens/VideoPlayer";
import store from "./ChatSX/store";

const myClient = initMyClient("c9a0a9cc-4844-4088-8fda-3146c61979a8");

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
  VideoPlayer,
};
