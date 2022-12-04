import {Text, View} from "react-native";
import * as React from "react";
import {useTodoLists} from "../state/TodoListProvider";

export default function TodoScreen() {
    const [todoLists, dispatchTodoLists, activeTodoList, setActiveList] = useTodoLists();

    return(

        <View>
            <Text>ToDo Screen</Text>
            <Text>Active ToDo List is {activeTodoList}</Text>
        </View>
    )
}
