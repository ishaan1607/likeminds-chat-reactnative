let CommunityClipboard;

try {
  CommunityClipboard = require("@react-native-community/clipboard");
} catch (err) {
  console.log("@react-native-community/clipboard is not installed");
}

export default CommunityClipboard;

