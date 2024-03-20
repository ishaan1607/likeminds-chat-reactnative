import { StyleSheet } from "react-native";
import STYLES from "../../constants/Styles";
import Layout from "../../constants/Layout";

const styles = StyleSheet.create({
  page: {
    backgroundColor: STYLES.$BACKGROUND_COLORS.LIGHT,
    flex: 1,
    paddingHorizontal: Layout.normalize(20),
    paddingTop: Layout.normalize(8),
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Layout.normalize(15),
  },
  backBtn: {
    height: Layout.normalize(35),
    width: Layout.normalize(40),
    borderRadius: Layout.normalize(10),
    resizeMode: "contain",
  },
  chatRoomInfo: { gap: Layout.normalize(5) },
  threeDots: {
    height: Layout.normalize(10),
    width: Layout.normalize(10),
    resizeMode: "contain",
  },
  textHeading: {
    color: STYLES.$COLORS.FONT_PRIMARY,
    fontSize: STYLES.$FONT_SIZES.SMALL,
    fontFamily: STYLES.$FONT_TYPES.BOLD,
  },
  text: {
    color: STYLES.$COLORS.FONT_PRIMARY,
    fontSize: STYLES.$FONT_SIZES.SMALL,
    fontFamily: STYLES.$FONT_TYPES.LIGHT,
  },
  btnText: {
    color: STYLES.$COLORS.MSG,
    fontSize: STYLES.$FONT_SIZES.MEDIUM,
    fontFamily: STYLES.$FONT_TYPES.LIGHT,
  },
  reasonsBtn: {
    borderRadius: Layout.normalize(16),
    padding: Layout.normalize(8),
    margin: Layout.normalize(8),
    borderWidth: 1,
    borderColor: STYLES.$COLORS.MSG,
  },
  reportBtnParent: {
    justifyContent: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: Layout.normalize(40),
  },
  reportBtn: {
    backgroundColor: STYLES.$COLORS.RED,
    borderRadius: Layout.normalize(25),
    paddingHorizontal: Layout.normalize(30),
    paddingVertical: Layout.normalize(15),
  },
  reportBtnText: {
    color: "white",
    fontSize: STYLES.$FONT_SIZES.MEDIUM,
    fontFamily: STYLES.$FONT_TYPES.BOLD,
  },
});

export default styles;
