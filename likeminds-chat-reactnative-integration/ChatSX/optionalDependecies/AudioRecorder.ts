let AudioRecorder;

try {
  AudioRecorder = require("react-native-audio-recorder-player");
} catch (err) {
  console.log("react-native-audio-recorder-player is not installed");
}

export default AudioRecorder;
