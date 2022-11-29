import {Switch} from "react-native";
import * as React from "react";
import {toggleThemeType, useThemeType} from "../state/ThemeProvider";
import {THEME_COLORS} from "../state/ThemeColors";

export default function ThemeToggleSwitch() {
    const darkTheme = useThemeType()
    const toggleTheme = toggleThemeType()
    return(
        <Switch onValueChange={toggleTheme}
                value={darkTheme}
                trackColor={{ true: THEME_COLORS.DARK_THEME.PRIMARY + THEME_COLORS.DARK_THEME.ON_PRIMARY_OPACITY.DISABLED}}
                thumbColor={darkTheme ? THEME_COLORS.DARK_THEME.PRIMARY : "#f4f3f4"}
        />
    )
}
