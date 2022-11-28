import React, {useContext, useState} from "react";

export const ThemeContext = React.createContext(undefined, undefined);
export const ThemeUpdateContext = React.createContext(undefined, undefined);
export const ThemeColors = {
    "DARK-THEME": {
        "PRIMARY": "#BB86FC",
        "PRIMARY-VARIANT": "#3700B3",
        "SECONDARY": "#03DAC5",
        "BACKGROUND": "#121212",
        "SURFACE": "#121212",
        "ERROR": "#CF6679",
        "ON-SECONDARY": "#000000",
        "ON-BACKGROUND": "#FFFFFF",
        "ON-SURFACE": "#FFFFFF",
        "ON-ERROR": "#000000",

        "PRIMARY-900": "#23036A",
        "PRIMARY-800": "#30009C",
        "PRIMARY-700": "#3700B3",
        "PRIMARY-600": "#5600E8",
        "PRIMARY-500": "#6200EE",
        "PRIMARY-400": "#7F39FB",
        "PRIMARY-300": "#985EFF",
        "PRIMARY-200": "#BB86FC",
        "PRIMARY-100": "#DBB2FF",
        "PRIMARY-050": "#F2E7FE",

        "SECONDARY-900": "#005457",
        "SECONDARY-800": "#017374",
        "SECONDARY-700": "#018786",
        "SECONDARY-600": "#019592",
        "SECONDARY-500": "#01A299",
        "SECONDARY-400": "#00B3A6",
        "SECONDARY-300": "#00C4B4",
        "SECONDARY-200": "#03DAC5",
        "SECONDARY-100": "#70EFDE",
        "SECONDARY-050": "#C8FFF4",

        "ON-PRIMARY-OPACITY": {
            "HIGH-EMPHASIS": "100%",
            "MEDIUM-EMPHASIS": "74%",
            "DISABLED": "38%",
        },

        "ON-SURFACE-OPACITY": {
            "HIGH-EMPHASIS": "87%",
            "MEDIUM-EMPHASIS": "60%",
            "DISABLED": "38%",
        }
    },


    "LIGHT-THEME": {
        "PRIMARY": "#6E00EE",
        "PRIMARY-VARIANT": "#3700B3",
        "SECONDARY1": "#03DAC5",
        "SECONDARY2": "#018786",
        "BACKGROUND": "#FFFFFF",
        "SURFACE": "#FFFFFF",
        "ERROR": "#B00020",
        "ON-PRIMARY": "#FFFFFF",
        "ON-SECONDARY": "#000000",
        "ON-BACKGROUND": "#000000",
        "ON-SURFACE": "#000000",
        "ON-ERROR": "#FFFFFF",

        "PRIMARY-900": "#23036A",
        "PRIMARY-800": "#30009C",
        "PRIMARY-700": "#3700B3",
        "PRIMARY-600": "#5600E8",
        "PRIMARY-500": "#6200EE",
        "PRIMARY-400": "#7F39FB",
        "PRIMARY-300": "#985EFF",
        "PRIMARY-200": "#BB86FC",
        "PRIMARY-100": "#DBB2FF",
        "PRIMARY-050": "#F2E7FE",

        "SECONDARY-900": "#005457",
        "SECONDARY-800": "#017374",
        "SECONDARY-700": "#018786",
        "SECONDARY-600": "#019592",
        "SECONDARY-500": "#01A299",
        "SECONDARY-400": "#00B3A6",
        "SECONDARY-300": "#00C4B4",
        "SECONDARY-200": "#03DAC5",
        "SECONDARY-100": "#70EFDE",
        "SECONDARY-050": "#C8FFF4",

        "ON-PRIMARY-OPACITY": {
            "HIGH-EMPHASIS": "100%",
            "MEDIUM-EMPHASIS": "74%",
            "DISABLED": "38%",
        },

        "ON-SURFACE-OPACITY": {
            "HIGH-EMPHASIS": "87%",
            "MEDIUM-EMPHASIS": "60%",
            "DISABLED": "38%",
        },

        "OUTLINE-ON-SURFACE": {
            "BORDER-COLOR": "12%",
        }
    }
}


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

