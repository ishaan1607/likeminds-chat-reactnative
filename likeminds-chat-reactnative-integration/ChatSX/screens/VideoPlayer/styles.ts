import { StyleSheet } from "react-native";
import Layout from "../../constants/Layout";

export const styles = StyleSheet.create({
  video: {
    display: "flex",
    justifyContent: "center",
    width: Layout.window.width,
    height: Layout.window.height,
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Layout.normalize(15),
  },
  backBtn: {
    height: Layout.normalize(35),
    width: Layout.normalize(35),
    borderRadius: Layout.normalize(10),
    resizeMode: "contain",
  },
  chatRoomInfo: { gap: Layout.normalize(5) },
  videoPlayer: {},
});
