let RNClipboard;

try {
  RNClipboard = require("@react-native-clipboard/clipboard").default;
} catch (err) {
  console.log("@react-native-clipboard/clipboard is not installed");
}

export default RNClipboard;
