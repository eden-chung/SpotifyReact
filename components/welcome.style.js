import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
  },
  userName: {
    marginTop: 15,
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    color: COLORS.white,
    lineHeight: 35,
  },
  spotify: {
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    color: COLORS.green,
    lineHeight: 35,
  },
  welcomeMessage: {
    fontFamily: FONT.bold,
    fontSize: SIZES.xLarge,
    color: COLORS.white,
    marginTop: 2,
    lineHeight: 30,
    marginBottom: 30,
  },

  buttons: {
    fontFamily: FONT.medium,
    fontSize: SIZES.large,
    color: COLORS.white,
    lineHeight: 35,
    paddingTop: 20,
    paddingBottom: 8,
  },
  buttonSheet: {
    flex: 1,
    color: COLORS.white,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    flex: 2,
    backgroundColor: COLORS.green,
    marginRight: SIZES.small,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
    flexBasis: "45%",
    justifyContent: "center",
  },
  searchContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginTop: SIZES.large,
    height: 50,
  },
  searchWrapper: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginRight: SIZES.small,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: SIZES.medium,
    height: "100%",
  },
  searchInput: {
    fontFamily: FONT.regular,
    width: "100%",
    height: "100%",
    paddingHorizontal: SIZES.medium,
  },
  searchBtn: {
    width: 50,
    height: "100%",
    backgroundColor: COLORS.tertiary,
    borderRadius: SIZES.medium,
    justifyContent: "center",
    alignItems: "center",
  },
  searchBtnImage: {
    width: "50%",
    height: "50%",
    tintColor: COLORS.white,
  },
  tabsContainer: {
    width: "100%",
    marginTop: SIZES.medium,
  },
  tab: (activeJobType, item) => ({
    paddingVertical: SIZES.small / 2,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.medium,
    borderWidth: 1,
    borderColor: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
  tabText: (activeJobType, item) => ({
    fontFamily: FONT.medium,
    color: activeJobType === item ? COLORS.secondary : COLORS.gray2,
  }),
});

export default styles;
