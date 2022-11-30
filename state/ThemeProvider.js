import React, {useContext, useState} from "react";
import * as NavigationBar from "expo-navigation-bar";
import {THEME_COLORS} from "./ThemeColors";

export const ThemeTypeContext = React.createContext(undefined, undefined);
export const ThemeToggleContext = React.createContext(undefined, undefined);

export function useThemeType() {
    return useContext(ThemeTypeContext);
}

export function toggleThemeType() {
    return useContext(ThemeToggleContext);
}

export default function ThemeProvider({children}) {
    const [darkTheme, setDarkTheme] = useState(true)

    function toggleTheme() {
        setDarkTheme(prevDarkTheme => !prevDarkTheme)
        NavigationBar.setBackgroundColorAsync(!darkTheme ?
            THEME_COLORS.DARK_THEME.BACKGROUND :
            THEME_COLORS.LIGHT_THEME.BACKGROUND
        ).then()
    }

    return(
        <ThemeTypeContext.Provider value={darkTheme}>
            <ThemeToggleContext.Provider value={toggleTheme}>
                {children}
            </ThemeToggleContext.Provider>
        </ThemeTypeContext.Provider>
    )
}

