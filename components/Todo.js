import React from "react";
import {Button, Text, View} from "react-native";
import {ACTIONS} from "../constants/ReducerActions";


export default function Todo({todo, dispatch}) {
    const styles = {
        todoWrapper: {
            width: 200,
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 3,
        }
    }

    return(
        <View style={styles.todoWrapper}>
            <Text style={{color: todo.complete ? '#AAA' : '#000'}}>
                {todo.name}
            </Text>
            <Button onPress={() => dispatch({type: ACTIONS.TOGGLE_TODO, payload: {id: todo.id}})} title="Toggle"/>
            <Button onPress={() => dispatch({type: ACTIONS.DELETE_TODO, payload: {id: todo.id}})} title="Delete"/>
        </View>
    )
}
