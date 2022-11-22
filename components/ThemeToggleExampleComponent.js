import {Button, SafeAreaView} from "react-native";
import {useTheme, useThemeUpdate} from "../state/ThemeProvider";


export default function ThemeToggleExampleComponent() {
    const darkTheme = useTheme();
    const toggleTheme = useThemeUpdate();

    const styles = {
        backgroundColor: darkTheme ? '#333' : '#534444',
        height: 500,
        alignItems: "center",
        justifyContent: "center",
    }

    return(
        <SafeAreaView style={styles}>
            <Button title="Toggle Theme" onPress={toggleTheme}></Button>
        </SafeAreaView>
    )
}


