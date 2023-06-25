import { StyleSheet } from "react-native";

import { COLORS, FONT, SIZES } from "../constants";

const styles = StyleSheet.create({
    background: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: COLORS.blackBg,
      },
    text: {
        textAlign: 'center',
        marginTop: 15,
        fontFamily: FONT.medium,
        fontSize: SIZES.large,
        color: COLORS.white,
        lineHeight: 35,
      },
})

export default styles;
