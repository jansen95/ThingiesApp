import React, {useContext, useState} from "react";

export const ThemeContext = React.createContext(undefined, undefined);
export const ThemeUpdateContext = React.createContext(undefined, undefined);

export function useTheme() {
    return useContext(ThemeContext);
}

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext);
}

export default function ThemeProvider({children}) {
    const [darkTheme, setDarkTheme] = useState(true)

    function toggleTheme() {
        setDarkTheme(prevStateTheme => !prevStateTheme)
    }

    return(
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}

