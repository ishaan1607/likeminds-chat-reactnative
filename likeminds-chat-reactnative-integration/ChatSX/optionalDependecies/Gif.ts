let GIFPicker: any;

try {
  GIFPicker = require("@giphy/react-native-sdk");
} catch (err) {
  console.log("@giphy/react-native-sdk is not installed");
}

export default GIFPicker;
