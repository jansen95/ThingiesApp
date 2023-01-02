import {ScrollView} from "react-native";
import * as React from "react";
import {useTodoLists} from "../state/TodoListProvider";
import {THEME_COLORS} from "../state/ThemeColors";
import {useThemeType} from "../state/ThemeProvider";
import {List} from 'react-native-paper';
import Checkbox from 'expo-checkbox';


export default function TodoScreen() {
    const [todoLists, dispatchTodoLists, activeTodoList, setActiveList] = useTodoLists();
    const darkTheme = useThemeType();
    const todoItems = [];

    const [checked, setChecked] = React.useState({});

    todoLists.map(({todos}, indexList) => {
        if (indexList === activeTodoList||activeTodoList===0) {
            todos.map((todo, indexTodo) => {
                todoItems.push(
                    <List.Item
                        key={todo.todoId}
                        style={{
                            backgroundColor: darkTheme ? THEME_COLORS.DARK_THEME.SURFACE : THEME_COLORS.LIGHT_THEME.SURFACE
                        }}
                        title={todo.name}
                        titleStyle={{
                            color: darkTheme ? THEME_COLORS.DARK_THEME.ON_SURFACE : THEME_COLORS.LIGHT_THEME.ON_SURFACE
                        }}
                        description={"Date: " + todo.timestamp.substring(0, 10) +  " \nGPS: "+ todo.LatLng.latitude +" , "+ todo.LatLng.longitude}
                        descriptionStyle={{
                            color: darkTheme ? THEME_COLORS.DARK_THEME.ON_SURFACE + THEME_COLORS.DARK_THEME.ON_SURFACE_OPACITY.MEDIUM_EMPHASIS
                                : THEME_COLORS.LIGHT_THEME.ON_SURFACE + THEME_COLORS.LIGHT_THEME.ON_SURFACE_OPACITY.MEDIUM_EMPHASIS
                        }}
                        left={() => <Checkbox
                            value={checked[todo.todoId]}
                            color =  {darkTheme ? THEME_COLORS.DARK_THEME.PRIMARY : THEME_COLORS.LIGHT_THEME.PRIMARY}
                            onValueChange={(newValue) => { setChecked({...checked, [todo.todoId]: newValue}) }}             //???
                        />}
                        right={props => <List.Icon {...props} icon="equal" />}
                    />
                );
            })
        }
    })


    return(

        <ScrollView style={{}}>

            {todoItems}

        </ScrollView>
    )
}
