import { Platform, StyleSheet } from "react-native";
import STYLES from "../../constants/Styles";
import Layout from "../../constants/Layout";

export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: STYLES.$PADDINGS.LARGE,
    alignItems: "center",
    backgroundColor: STYLES.$COLORS.TERTIARY,
  },
  avatar: {
    width: STYLES.$AVATAR.WIDTH,
    height: STYLES.$AVATAR.HEIGHT,
    borderRadius: STYLES.$AVATAR.BORDER_RADIUS,
    marginRight: STYLES.$MARGINS.SMALL,
    resizeMode: "cover",
  },
  infoParent: { flex: 1 },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Layout.normalize(8),
  },
  title: {
    fontSize: STYLES.$FONT_SIZES.XL,
    fontFamily: STYLES.$FONT_TYPES.BOLD,
    color: STYLES.$COLORS.FONT_PRIMARY,
    width: Layout.normalize(160),
  },
  lastMessage: {
    color: STYLES.$COLORS.MSG,
    fontSize: STYLES.$FONT_SIZES.MEDIUM,
    fontFamily: STYLES.$FONT_TYPES.LIGHT,
    // display:'flex'
  },
  info: {
    color: STYLES.$COLORS.MSG,
    fontSize: STYLES.$FONT_SIZES.MEDIUM,
    fontFamily: STYLES.$FONT_TYPES.LIGHT,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  joinBtnContainer: {
    backgroundColor: STYLES.$COLORS.SECONDARY,
    borderRadius: Layout.normalize(10),
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    padding: Layout.normalize(10),
    gap: Layout.normalize(5),
  },
  joinedBtnContainer: {
    backgroundColor: STYLES.$COLORS.JOINED_BTN,
    borderRadius: Layout.normalize(10),
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    padding: Layout.normalize(10),
  },
  join: {
    color: STYLES.$COLORS.TERTIARY,
    fontSize: STYLES.$FONT_SIZES.LARGE,
    fontFamily: STYLES.$FONT_TYPES.SEMI_BOLD,
  },
  joined: {
    color: STYLES.$COLORS.SECONDARY,
    fontSize: STYLES.$FONT_SIZES.LARGE,
    fontFamily: STYLES.$FONT_TYPES.SEMI_BOLD,
  },
  icon: {
    width: Layout.normalize(30),
    height: Layout.normalize(25),
    resizeMode: "contain",
    borderRadius: STYLES.$AVATAR.BORDER_RADIUS,
    tintColor: STYLES.$COLORS.SECONDARY,
  },
  joinIcon: {
    width: Layout.normalize(30),
    height: Layout.normalize(22),
    resizeMode: "contain",
    borderRadius: STYLES.$AVATAR.BORDER_RADIUS,
  },
  info_icons: {
    width: Layout.normalize(18),
    height: Layout.normalize(18),
    resizeMode: "contain",
    marginRight: Layout.normalize(5),
  },
  chatroomInfo: {
    fontSize: STYLES.$FONT_SIZES.LARGE,
    marginTop: STYLES.$MARGINS.SMALL,
    fontFamily: STYLES.$FONT_TYPES.LIGHT,
    color: STYLES.$COLORS.MSG,
    // fontWeight:'500',
    // marginRight:STYLES.$MARGINS.SMALL,
    width: Layout.normalize(290),
  },
  pinnedIconParent: {
    backgroundColor: STYLES.$COLORS.SECONDARY,
    height: Layout.normalize(20),
    width: Layout.normalize(20),
    position: "absolute",
    borderRadius: Layout.normalize(50),
    right: Layout.normalize(10),
    bottom: 0,
  },
  pinnedIcon: {
    height: Layout.normalize(20),
    width: Layout.normalize(20),
    resizeMode: "contain",
  },
  newBadge: {
    position: "absolute",
    bottom: Layout.normalize(-3),
    left: Layout.normalize(13),
    backgroundColor: "red",
    height: Layout.normalize(15),
    width: Layout.normalize(25),
    // padding: 2,
    // paddingVertical: Platform.OS === 'ios' ? 2 : 0,
    borderRadius: Layout.normalize(3),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  newBadgeText: {
    fontSize: STYLES.$FONT_SIZES.SMALL,
    fontFamily: STYLES.$FONT_TYPES.LIGHT,
    color: STYLES.$COLORS.TERTIARY,
  },
  lockIcon: {
    width: Layout.normalize(20),
    height: Layout.normalize(20),
    resizeMode: "contain",
  },
});
