import React, {useReducer, useState} from "react";
import FunctionContextComponent from './FunctionContextComponent';
import ThemeProvider from "./state/ThemeProvider";
import {TextInput, View} from "react-native";
import Todo from "./Todo";
import {ACTIONS} from "./constants/Constants";


function reducer(todos, action) {
    switch (action.type) {
        case ACTIONS.ADD_TODO:
            return [...todos, newTodo(action.payload.name)]
        case ACTIONS.TOGGLE_TODO:
            return todos.map(todo => {
                if (todo.id === action.payload.id) {
                    return { ...todo, complete: !todo.complete }
                }
                return todo
            })
        case ACTIONS.DELETE_TODO:
            return todos.filter(todo => todo.id !== action.payload.id)
        default:
            return todos
    }
}

function newTodo(name) {
    return {id: Date.now(), name: name, complete: false}
}


export default function App() {
    const [todos, dispatch] = useReducer(reducer, [])
    const [name, setName] = useState('')

    const styles = {
        textInput: {
            width: 300,
            borderWidth: 1,
        },
        textInputWrapper: {
            alignItems: "center",
        },
    }

    function handleSubmit(text) {
        dispatch({ type: ACTIONS.ADD_TODO, payload: {name: text}})
        setName('')
    }

    console.log(todos)

    return (
        <ThemeProvider>
            <FunctionContextComponent/>
            <View style={styles.textInputWrapper}>
                <TextInput style={styles.textInput}
                           value={name}
                           onChangeText={newText => setName(newText)}
                           onSubmitEditing={({ nativeEvent }) => handleSubmit(nativeEvent.text)}
                />
                {todos.map(todo => {
                    return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
                })}
            </View>
        </ThemeProvider>
    );
}
