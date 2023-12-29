import Styles from "./Styles";

export default {
  buttonViewStyle: {
    backgroundColor: Styles.$BACKGROUND_COLORS.LIGHT,
    borderColor: Styles.$COLORS.PRIMARY,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
    borderRadius: 5,
  },
  iconStyle: {
    width: 25,
    height: 25,
    resizeMode: "contain",
  },
  textInput: {
    margin: 10,
    shadowRadius: 5,
    elevation: 8,
    borderRadius: 10,
    backgroundColor: Styles.$BACKGROUND_COLORS.LIGHT,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textInputWithRightIcon: {
    width: "90%",
    fontSize: 14,
    color: Styles.$COLORS.PRIMARY,
  },
  textInputWithoutRightIcon: {
    width: "100%",
    fontSize: 14,
    color: Styles.$COLORS.PRIMARY,
  },
  rightIconButton: {
    borderWidth: 0,
  },
  textStyle: {
    color: "black",
    fontSize: 14,
    fontFamily: "Arial",
    textAlign: "auto",
    fontStyle: "normal",
  },
};
