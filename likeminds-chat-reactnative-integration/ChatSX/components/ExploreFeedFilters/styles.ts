import { Platform, StyleSheet } from "react-native";
import STYLES from "../../constants/Styles";
import Layout from "../../constants/Layout";

export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: STYLES.$PADDINGS.MEDIUM,
    alignItems: "center",
    // justifyContent: 'center',
    backgroundColor: STYLES.$COLORS.TERTIARY,
  },
  alignHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginLeft: Layout.normalize(10),
  },
  icon: {
    width: Layout.normalize(15),
    height: Layout.normalize(15),
    resizeMode: "contain",
    marginRight: Layout.normalize(5),
    marginLeft: STYLES.$MARGINS.SMALL,
  },
  pinIcon: {
    width: Layout.normalize(30),
    height: Layout.normalize(30),
    resizeMode: "contain",
    marginRight: STYLES.$MARGINS.LARGE,
  },
  cancelPinIconParent: {
    width: Layout.normalize(30),
    height: Layout.normalize(30),
    marginRight: STYLES.$MARGINS.SMALL,
  },
  cancelPinIcon: {
    width: Layout.normalize(30),
    height: Layout.normalize(30),
    resizeMode: "contain",
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleText: {
    fontSize: STYLES.$FONT_SIZES.LARGE,
    fontFamily: STYLES.$FONT_TYPES.MEDIUM,
    color: STYLES.$COLORS.FONT_PRIMARY,
  },

  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: Layout.normalize(20),
  },
  modalView: {
    marginLeft: Layout.normalize(10),
    marginTop:
      Platform.OS === "ios" ? Layout.normalize(115) : Layout.normalize(80),
    backgroundColor: "white",
    borderRadius: Layout.normalize(8),
    width: Layout.normalize(200),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: Layout.normalize(2),
    },
    padding: Layout.normalize(5),
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
    color: STYLES.$COLORS.FONT_PRIMARY,
  },
  button: {
    borderRadius: Layout.normalize(20),
    padding: Layout.normalize(10),
    // elevation: 2,
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
  cancelPinnedBtn: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: STYLES.$COLORS.SECONDARY,
    borderWidth: 1,
    padding: Layout.normalize(5),
    borderRadius: Layout.normalize(20),
    marginRight: Layout.normalize(20),
  },
});
