import { StyleSheet } from "react-native";
import Layout from "../../constants/Layout";
import STYLES from "../../constants/Styles";

export const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "black",
    opacity: 0.5,
  },
  centeredView: {
    flex: 1,
    backgroundColor: "#000000aa",
  },
  modalParent: {
    position: "absolute",
    bottom: 0,
    borderTopEndRadius: Layout.normalize(15),
    borderTopLeftRadius: Layout.normalize(15),
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: Layout.normalize(8),
    width: Layout.window.width,
    height: Layout.normalize(350),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: Layout.normalize(2),
    },
    padding: Layout.normalize(5),
    shadowOpacity: Layout.normalize(0.25),
    shadowRadius: Layout.normalize(4),
    elevation: Layout.normalize(5),
    borderTopEndRadius: Layout.normalize(15),
    borderTopLeftRadius: Layout.normalize(15),
  },
  modalText: {
    marginBottom: Layout.normalize(15),
    textAlign: "center",
  },
  bar: {
    height: Layout.normalize(8),
    width: Layout.normalize(100),
    alignSelf: "center",
    backgroundColor: STYLES.$COLORS.JOINED_BTN,
    borderRadius: Layout.normalize(10),
  },
  text: {
    fontSize: STYLES.$FONT_SIZES.MEDIUM,
    fontFamily: STYLES.$FONT_TYPES.SEMI_BOLD,
    color: STYLES.$COLORS.FONT_PRIMARY,
    marginBottom: Layout.normalize(10),
  },
});
