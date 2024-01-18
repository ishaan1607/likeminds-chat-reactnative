import { Platform, StyleSheet } from "react-native";
import Layout from "../../constants/Layout";
import STYLES from "../../constants/Styles";

export const styles = StyleSheet.create({
  messageParent: {
    margin: Layout.normalize(20),
    marginBottom: 0,
  },
  replyMessage: {
    padding: Layout.normalize(10),
    width: "80%",
    alignSelf: "flex-end",
    borderRadius: Layout.normalize(15),
    backgroundColor: "#fff",
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: STYLES.$COLORS.TERTIARY,
    borderBottomRightRadius: 0,
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: STYLES.$COLORS.TERTIARY,
    borderBottomLeftRadius: 0,
  },
  messageText: {
    fontSize: STYLES.$FONT_SIZES.SMALL,
    fontFamily: STYLES.$FONT_TYPES.LIGHT,
    color: STYLES.$COLORS.FONT_PRIMARY,
    maxWidth: Layout.window.width - 150,
  },
  messageDate: {
    fontSize: Layout.normalize(10),
    color: "#aaa",
    textAlign: "right",
  },
  replySender: {
    color: "green",
    fontSize: STYLES.$FONT_SIZES.MEDIUM,
    fontFamily: STYLES.$FONT_TYPES.BOLD,
  },
  replyBox: {
    maxHeight: Layout.normalize(60),
    backgroundColor: STYLES.$COLORS.JOINED_BTN,
    borderRadius: Layout.normalize(5),
    borderLeftWidth: Layout.normalize(5),
    borderLeftColor: STYLES.$COLORS.SECONDARY,
    padding: Layout.normalize(10),
    overflow: "hidden",
    marginBottom: STYLES.$MARGINS.XS,
  },
  icon: {
    height: Layout.normalize(15),
    width: Layout.normalize(15),
    resizeMode: "contain",
    marginRight: Layout.normalize(5),
  },
  alignRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: Layout.normalize(5),
  },
  displayRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Layout.normalize(10),
  },
  alignTime: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: Layout.normalize(3),
  },
  messageInfo: {
    color: "green",
    fontSize: STYLES.$FONT_SIZES.MEDIUM,
    fontFamily: STYLES.$FONT_TYPES.BOLD,
    marginBottom: STYLES.$MARGINS.XS,
  },
  messageCustomTitle: {
    color: STYLES.$COLORS.MSG,
    fontSize: STYLES.$FONT_SIZES.SMALL,
    fontFamily: STYLES.$FONT_TYPES.LIGHT,
  },
  gifView: {
    backgroundColor: STYLES.$COLORS.MSG,
    paddingHorizontal: Layout.normalize(5),
    paddingVertical: Layout.normalize(3),
    borderRadius: Layout.normalize(5),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginRight: Layout.normalize(5),
  },
  gifText: {
    fontFamily: STYLES.$FONT_TYPES.LIGHT,
    fontSize: STYLES.$FONT_SIZES.XS,
    color: "white",
    marginTop: Platform.OS === "ios" ? Layout.normalize(1) : 0,
  },
});
