import { StyleSheet } from "react-native";
import STYLES from "../../constants/Styles";
import Layout from "../../constants/Layout";

const styles = StyleSheet.create({
  page: {
    backgroundColor: STYLES.$BACKGROUND_COLORS.LIGHT,
    flex: 1,
  },
  headingContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: Layout.normalize(15),
  },
  backBtn: {
    height: Layout.normalize(40),
    width: Layout.normalize(40),
    borderRadius: Layout.normalize(10),
    resizeMode: "contain",
    tintColor: STYLES.$COLORS.SECONDARY,
  },
});

export default styles;
