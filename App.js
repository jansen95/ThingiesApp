import React, {} from "react";
import ThemeProvider from "./state/ThemeProvider";
import TodoListProvider from "./state/TodoListProvider";
import TodoListsTextScreen from "./screens/TodoListsTextScreen";


export default function App() {

    return (
        <TodoListProvider>
            <ThemeProvider>
                <TodoListsTextScreen/>
            </ThemeProvider>
        </TodoListProvider>

    );
}
