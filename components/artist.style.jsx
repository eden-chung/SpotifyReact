import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
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
    artistInfo: {
        //marginTop: 15,
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
        color: COLORS.white,
        lineHeight: 35,
    },
    headerContainer: {
        width: 250,
        height: "15%",
        backgroundColor: COLORS.green,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        fontFamily: FONT.bold,
        fontSize: SIZES.medium,
        color: COLORS.white,
        lineHeight: 35,
    },
    scrollView: {
      //flex: 1,
    },
    scrollViewContent: {
      flexGrow: 1,
      alignItems: "center",
      borderRadius: SIZES.medium,
      //marginBottom: 300,
    },
    infoContainer: {
        width: 350,
        //height: 50,
        borderRadius: SIZES.medium,
        justifyContent: "left",
        alignItems: "left",
    },
    textWrapper: {
        marginRight: SIZES.small,
        justifyContent: "center",
        alignItems: "left",
        borderRadius: SIZES.medium,
        //height: 250,
        marginVertical: 5,
    },
    textContainer: {
        flex: 1,
        marginHorizontal: SIZES.medium,
    }
});

export default styles;