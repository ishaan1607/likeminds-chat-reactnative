import Styles from "./Styles";
import Layout from "../../constants/Layout";

export default {
  buttonViewStyle: {
    backgroundColor: Styles.$BACKGROUND_COLORS.LIGHT,
    borderColor: Styles.$COLORS.PRIMARY,
    borderWidth: Layout.normalize(1),
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Layout.normalize(5),
    borderRadius: Layout.normalize(5),
  },
  iconStyle: {
    width: Layout.normalize(25),
    height: Layout.normalize(25),
    resizeMode: "contain",
  },
  textInput: {
    margin: Layout.normalize(10),
    shadowRadius: Layout.normalize(5),
    elevation: Layout.normalize(8),
    borderRadius: Layout.normalize(10),
    backgroundColor: Styles.$BACKGROUND_COLORS.LIGHT,
    paddingVertical: Layout.normalize(10),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInputWithRightIcon: {
    width: "90%",
    fontSize: Layout.normalize(14),
    color: Styles.$COLORS.PRIMARY,
  },
  textInputWithoutRightIcon: {
    width: "100%",
    fontSize: Layout.normalize(14),
    color: Styles.$COLORS.PRIMARY,
  },
  rightIconButton: {
    borderWidth: 0,
  },
  textStyle: {
    color: "black",
    fontSize: Layout.normalize(14),
    fontFamily: Styles.$FONT_TYPES.MEDIUM,
    textAlign: "auto",
    fontStyle: "normal",
  },
  nonPartTextStyle: { color: "#aaa" },
};
