import {StyleSheet} from 'react-native';
import Styles from 'likeminds_chat_reactnative_ui/components/constants/Styles';

export const styles = StyleSheet.create({
  input: {
    flexGrow: 1,
    fontSize: Styles.$FONT_SIZES.XL,
    fontFamily: Styles.$FONT_TYPES.LIGHT,
    maxHeight: 120,
    padding: 0,
    marginBottom: 2,
    overflow: 'scroll',
  },
  taggableUsersBox: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    width: '100%',
    position: 'relative',
    backgroundColor: 'white',
    borderColor: Styles.$COLORS.MSG,
    overflow: 'hidden',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: Styles.$AVATAR.BORDER_RADIUS,
    marginRight: Styles.$MARGINS.SMALL,
  },
  taggableUserView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
    marginTop: 10,
  },
  infoContainer: {
    flex: 1,
    paddingVertical: 15,
    borderBottomColor: Styles.$COLORS.MSG,
  },
  title: {
    fontSize: Styles.$FONT_SIZES.LARGE,
    fontFamily: Styles.$FONT_TYPES.MEDIUM,
    color: Styles.$COLORS.PRIMARY,
  },
  subTitle: {
    fontSize: Styles.$FONT_SIZES.MEDIUM,
    fontFamily: Styles.$FONT_TYPES.LIGHT,
    color: Styles.$COLORS.MSG,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 5,
    margin: 5,
  },
  replyBoxClose: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: Styles.$COLORS.SELECTED_BLUE,
    padding: 5,
    borderRadius: 10,
  },
  replyCloseImg: {height: 7, width: 7, resizeMode: 'contain'},
});
