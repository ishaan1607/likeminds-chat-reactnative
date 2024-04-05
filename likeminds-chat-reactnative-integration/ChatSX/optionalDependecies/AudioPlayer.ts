let AudioPlayer;

try {
  AudioPlayer = require("react-native-track-player");
} catch (err) {
  console.log("react-native-track-player is not installed");
}

export default AudioPlayer;
