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

    for (let i = 0; i < 3; i++) {
        todoItems.push(
            <List.Item
                key={i}
                style={{
                    backgroundColor: darkTheme ? THEME_COLORS.DARK_THEME.SURFACE : THEME_COLORS.LIGHT_THEME.SURFACE
                }}
                title="Title"
                titleStyle={{
                    color: darkTheme ? THEME_COLORS.DARK_THEME.ON_SURFACE : THEME_COLORS.LIGHT_THEME.ON_SURFACE
                }}
                description="Date: 06.12.2022,  GPS: 6.614, 51.839"
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
    }

    return(

        <ScrollView style={{}}>
            {/*<Text>ToDo Screen</Text>*/}
            {/*<Text>Active ToDo List is {activeTodoList}</Text>*/}

            {todoItems}

        </ScrollView>
    )
}
