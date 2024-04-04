let AudioPlayer: any;
let AddTrack: any;
let Slider: any;
let AudioRecorder: any;
let AudioSet: any;
let LottieView: any;

try {
  AudioPlayer = require("react-native-track-player");
} catch (err) {
  console.log("react-native-track-player is not installed");
}

try {
  AddTrack = require("react-native-track-player");
} catch (err) {
  console.log("react-native-track-player is not installed");
}

try {
  Slider = require("@react-native-community/slider")?.default;
} catch (err) {
  console.log("@react-native-community/slider is not installed");
}

try {
  AudioRecorder = require("react-native-audio-recorder-player");
} catch (err) {
  console.log("react-native-audio-recorder-player is not installed");
}

try {
  AudioSet = require("react-native-audio-recorder-player");
} catch (err) {
  console.log("react-native-audio-recorder-player is not installed");
}

try {
  LottieView = require("lottie-react-native")?.default;
} catch (err) {
  console.log("lottie-react-native is not installed");
}

export { AudioPlayer, Slider, AddTrack, AudioRecorder, AudioSet, LottieView };
