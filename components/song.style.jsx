import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
    title: {
        fontFamily: FONT.bold,
        fontSize: SIZES.large,
        color: COLORS.white,
        lineHeight: 50,
      },
    
    textWrapper: {
        marginRight: SIZES.small,
        justifyContent: "center",
        alignItems: "left",
        borderRadius: SIZES.medium,
        //height: 250,
        marginVertical: 5,
    },
    headerContainer: {
        width: 250,
        maxHeight: "20%",
        backgroundColor: COLORS.green,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },

})

export default styles;