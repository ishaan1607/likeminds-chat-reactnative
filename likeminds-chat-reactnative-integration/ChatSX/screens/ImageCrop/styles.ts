import { StyleSheet } from "react-native";
import STYLES from "../../constants/Styles";
import Layout from "../../constants/Layout";

export const styles = StyleSheet.create({
  rotateIcon: {
    height: Layout.normalize(25),
    width: Layout.normalize(25),
    resizeMode: "contain",
    tintColor: STYLES.$COLORS.TERTIARY,
  },
  item: {
    padding: Layout.normalize(5),
  },
  cropView: {
    width: "100%",
    flex: 1,
    backgroundColor: "black",
  },
  text: {
    fontSize: STYLES.$FONT_SIZES.MEDIUM,
    fontFamily: STYLES.$FONT_TYPES.LIGHT,
    color: STYLES.$COLORS.TERTIARY,
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: Layout.normalize(20),
    alignItems: "center",
    backgroundColor: "black",
  },
});
