import {Platform, StyleSheet} from 'react-native';
import STYLES from '../../constants/Styles';

export const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    padding: STYLES.$PADDINGS.LARGE,
    alignItems: 'center',
    backgroundColor: STYLES.$COLORS.TERTIARY,
  },
  avatar: {
    width: STYLES.$AVATAR.WIDTH,
    height: STYLES.$AVATAR.HEIGHT,
    borderRadius: STYLES.$AVATAR.BORDER_RADIUS,
    marginRight: STYLES.$MARGINS.SMALL,
    resizeMode: 'cover',
  },
  infoParent: {flex: 1},
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontSize: STYLES.$FONT_SIZES.XL,
    fontFamily: STYLES.$FONT_TYPES.BOLD,
    color: STYLES.$COLORS.FONT_PRIMARY,
    width: 160,
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
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinBtnContainer: {
    backgroundColor: STYLES.$COLORS.SECONDARY,
    borderRadius: 10,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    gap: 5,
  },
  joinedBtnContainer: {
    backgroundColor: STYLES.$COLORS.JOINED_BTN,
    borderRadius: 10,
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
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
    width: 30,
    height: 25,
    resizeMode: 'contain',
    borderRadius: STYLES.$AVATAR.BORDER_RADIUS,
    tintColor: STYLES.$COLORS.SECONDARY,
  },
  joinIcon: {
    width: 30,
    height: 22,
    resizeMode: 'contain',
    borderRadius: STYLES.$AVATAR.BORDER_RADIUS,
  },
  info_icons: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 5,
  },
  chatroomInfo: {
    fontSize: STYLES.$FONT_SIZES.LARGE,
    marginTop: STYLES.$MARGINS.SMALL,
    fontFamily: STYLES.$FONT_TYPES.LIGHT,
    color: STYLES.$COLORS.MSG,
    // fontWeight:'500',
    // marginRight:STYLES.$MARGINS.SMALL,
    width: 290,
  },
  pinnedIconParent: {
    backgroundColor: STYLES.$COLORS.SECONDARY,
    height: 20,
    width: 20,
    position: 'absolute',
    borderRadius: 50,
    right: 10,
    bottom: 0,
  },
  pinnedIcon: {
    height: 20,
    width: 20,
    resizeMode: 'contain',
  },
  newBadge: {
    position: 'absolute',
    bottom: -3,
    left: 13,
    backgroundColor: 'red',
    height: 15,
    width: 25,
    // padding: 2,
    // paddingVertical: Platform.OS === 'ios' ? 2 : 0,
    borderRadius: 3,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newBadgeText: {
    fontSize: STYLES.$FONT_SIZES.SMALL,
    fontFamily: STYLES.$FONT_TYPES.LIGHT,
    color: STYLES.$COLORS.TERTIARY,
  },
  lockIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
