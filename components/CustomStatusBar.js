import {StatusBar} from "react-native";
import React from "react";
import {useThemeType} from "../state/ThemeProvider";
import {THEME_COLORS} from "../state/ThemeColors";

export default function CustomStatusBar() {
    const darkTheme = useThemeType()

    return(
        <StatusBar barStyle={darkTheme ? "light-content" : "dark-content"}
                   backgroundColor={darkTheme ? THEME_COLORS.DARK_THEME.BACKGROUND : THEME_COLORS.LIGHT_THEME.BACKGROUND}>
        </StatusBar>
    )
}
