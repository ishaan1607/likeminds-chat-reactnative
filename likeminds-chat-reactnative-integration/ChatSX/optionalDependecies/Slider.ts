let Slider;

try {
  Slider = require("@react-native-community/slider")?.default;
} catch (err) {
  console.log("@react-native-community/slider is not installed");
}

export default Slider;
