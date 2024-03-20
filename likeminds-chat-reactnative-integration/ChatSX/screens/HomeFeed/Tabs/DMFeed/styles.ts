import { Platform, StyleSheet } from "react-native";
import STYLES from "../../../../constants/Styles";
import Layout from "../../../../constants/Layout";

const styles = StyleSheet.create({
  page: {
    backgroundColor: STYLES.$BACKGROUND_COLORS.LIGHT,
    flex: 1,
  },
  avatar: {
    width: Layout.normalize(36),
    height: Layout.normalize(36),
    borderRadius: STYLES.$AVATAR.BORDER_RADIUS,
    marginRight: STYLES.$MARGINS.SMALL,
  },
  fab: {
    position: "absolute",
    backgroundColor: STYLES.$COLORS.SECONDARY,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Layout.normalize(15),
    paddingHorizontal: Layout.normalize(20),
    gap: Layout.normalize(10),
    borderRadius: Layout.normalize(50),
    bottom: Platform.OS == "ios" ? Layout.normalize(30) : Layout.normalize(20),
    right: Layout.normalize(20),
  },
  nothingFab: {
    backgroundColor: STYLES.$COLORS.SECONDARY,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Layout.normalize(15),
    paddingHorizontal: Layout.normalize(20),
    gap: Layout.normalize(10),
    borderRadius: Layout.normalize(50),
  },
  fabImg: {
    height: Layout.normalize(20),
    width: Layout.normalize(20),
    resizeMode: "contain",
  },
  nothingImg: {
    height: Layout.normalize(100),
    width: Layout.normalize(100),
    resizeMode: "contain",
  },
  nothingDM: { display: "flex", flexGrow: 1 },
  text: {
    fontSize: STYLES.$FONT_SIZES.MEDIUM,
    fontFamily: STYLES.$FONT_TYPES.BOLD,
    color: STYLES.$COLORS.TERTIARY,
  },
  justifyCenter: {
    padding: STYLES.$PADDINGS.MEDIUM,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: STYLES.$COLORS.TERTIARY,
    flex: 1,
    gap: Layout.normalize(10),
  },
  title: {
    fontSize: STYLES.$FONT_SIZES.LARGE,
    fontFamily: STYLES.$FONT_TYPES.MEDIUM,
    color: STYLES.$COLORS.FONT_PRIMARY,
  },
  subTitle: {
    fontSize: STYLES.$FONT_SIZES.SMALL,
    fontFamily: STYLES.$FONT_TYPES.LIGHT,
    color: STYLES.$COLORS.MSG,
    textAlign: "center",
  },
});

export default styles;
