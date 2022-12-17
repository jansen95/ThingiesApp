import {ScrollView} from "react-native";
import * as React from "react";
import {useTodoLists} from "../state/TodoListProvider";
import {THEME_COLORS} from "../state/ThemeColors";
import {useThemeType} from "../state/ThemeProvider";
import {Checkbox, List} from 'react-native-paper';

export default function TodoScreen() {
    const [todoLists, dispatchTodoLists, activeTodoList, setActiveList] = useTodoLists();
    const darkTheme = useThemeType();
    const todoItems = [];


    todoLists.map(({todos}, indexList) => {
        if (indexList === activeTodoList||activeTodoList===0) {
            todos.map((todo, indexTodo) => {
                todoItems.push(
                    <List.Item
                        key={indexTodo+indexList*100}
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
                            disabled={false}
                            status="checked"
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
