let AddTrack;

try {
  AddTrack = require("react-native-track-player");
} catch (err) {
  console.log("react-native-track-player is not installed");
}

export default AddTrack;
