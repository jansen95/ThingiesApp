import {SafeAreaView, Text, View, StyleSheet} from "react-native";
import {useTodoLists} from "../state/TodoListProvider";

export default function TodoListsTextScreen() {
    const todoLists = useTodoLists();

    return(
        <SafeAreaView>
            <View>
                {todoLists.map(({name, todos}, listIndex) => {
                    return (
                        <View key={listIndex}>
                            <Text style={styles.todoList}>{name}</Text>
                            {todos.map((todo, todoIndex) => {
                                return <Text key={todoIndex} style={styles.todo}>{todo.name + "   " + todo.gps + "   " + todo.date}</Text>
                            })}
                        </View>
                    )
                })}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    todoList: {
        fontWeight: "bold",
        fontSize: 30,
    },
    todo: {
        //fontWeight: "bold",
        fontSize: 14,
    },
});
