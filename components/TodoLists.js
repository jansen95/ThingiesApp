import {Text, View} from "react-native";
import {useTodoLists} from "../state/TodoListProvider";

const todoLists = useTodoLists();

export default function TodoLists() {
    return(
        <View>
            {todoLists.map(({name, todos}, listIndex) => {
                return (
                    <View key={listIndex}>
                        <Text>{name}</Text>
                        {todos.map((todo, todoIndex) => {
                            return <Text key={todoIndex}>{todo.name + "   " + todo.gps + "   " + todo.date}</Text>
                        })}
                    </View>
                )
            })}
        </View>
    )
}
