import React, {} from "react";
import ThemeProvider from "./state/ThemeProvider";
import TodoListProvider from "./state/TodoListProvider";
import {NavigationContainer} from "@react-navigation/native";
import LoginStackNavigator from "./authentication/LoginStackNavigator";

export default function App() {

    return (
        <TodoListProvider>
            <ThemeProvider>
                <NavigationContainer>
                    <LoginStackNavigator>
                        {/*<TodoListsTextScreen/>*/}
                    </LoginStackNavigator>
                </NavigationContainer>
            </ThemeProvider>
        </TodoListProvider>
    );
}
