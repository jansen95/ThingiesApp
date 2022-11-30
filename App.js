import React, {} from "react";
import ThemeProvider from "./state/ThemeProvider";
import TodoListProvider from "./state/TodoListProvider";
import {NavigationContainer} from "@react-navigation/native";
import LoginStackNavigator from "./authentication/LoginStackNavigator";
import CustomStatusBar from "./components/CustomStatusBar";
import { useColorScheme } from 'react-native';
import * as NavigationBar from "expo-navigation-bar";
import {THEME_COLORS} from "./state/ThemeColors";



export default function App() {
    let colorScheme = useColorScheme(); //OS Theme

    NavigationBar.setBackgroundColorAsync(colorScheme === 'dark' ?
        THEME_COLORS.DARK_THEME.BACKGROUND :
        THEME_COLORS.LIGHT_THEME.BACKGROUND
    ).then()


    return (
        <TodoListProvider>
            <ThemeProvider>
                <CustomStatusBar></CustomStatusBar>
                    <NavigationContainer>
                        <LoginStackNavigator>
                            {/*<TodoListsTextScreen/>*/}
                        </LoginStackNavigator>
                    </NavigationContainer>
            </ThemeProvider>
        </TodoListProvider>
    );
}
