import { StyleSheet } from "react-native";
import STYLES from "../../constants/Styles";
import Layout from "../../constants/Layout";

export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: STYLES.$PADDINGS.MEDIUM,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: STYLES.$COLORS.TERTIARY,
  },
  icon: {
    width: Layout.normalize(30),
    height: Layout.normalize(30),
    borderRadius: STYLES.$AVATAR.BORDER_RADIUS,
    marginRight: STYLES.$MARGINS.LARGE,
    marginLeft: STYLES.$MARGINS.SMALL,
    tintColor: STYLES.$COLORS.SECONDARY,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: STYLES.$FONT_SIZES.XL,
    fontFamily: STYLES.$FONT_TYPES.BOLD,
    color: STYLES.$COLORS.FONT_PRIMARY,
  },
  newCountContainer: {
    height: Layout.normalize(25),
    backgroundColor: STYLES.$COLORS.SECONDARY,
    borderRadius: Layout.normalize(15),
    justifyContent: "center",
    alignItems: "center",
    padding: Layout.normalize(5),
  },
  newCount: {
    color: STYLES.$COLORS.TERTIARY,
    fontSize: STYLES.$FONT_SIZES.XS,
    fontFamily: STYLES.$FONT_TYPES.SEMI_BOLD,
    // padding: 5,
  },
});
