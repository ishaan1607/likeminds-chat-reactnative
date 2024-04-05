let LottieView;

try {
  LottieView = require("lottie-react-native")?.default;
} catch (err) {
  console.log("lottie-react-native is not installed");
}
export default LottieView;
