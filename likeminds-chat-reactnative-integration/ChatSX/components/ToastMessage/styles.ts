import { StyleSheet } from "react-native";
import Layout from "../../constants/Layout";
import STYLES from "../../constants/Styles";

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginTop: Layout.normalize(20),
  },
  modalParent: {
    position: "absolute",
    bottom: Layout.normalize(60),
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    width: Layout.window.width,
  },
  modalView: {
    padding: Layout.normalize(10),
    borderRadius: Layout.normalize(8),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: Layout.normalize(2),
    },
    backgroundColor: STYLES.$COLORS.PRIMARY,
    shadowOpacity: Layout.normalize(0.25),
    shadowRadius: Layout.normalize(4),
    elevation: Layout.normalize(5),
  },
  filtersView: {
    paddingHorizontal: Layout.normalize(10),
    paddingVertical: Layout.normalize(20),
  },
  filterText: {
    fontSize: STYLES.$FONT_SIZES.LARGE,
    fontFamily: STYLES.$FONT_TYPES.LIGHT,
    color: STYLES.$COLORS.TERTIARY,
  },
  button: {
    borderRadius: Layout.normalize(20),
    padding: Layout.normalize(10),
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: Layout.normalize(15),
    textAlign: "center",
  },
});
