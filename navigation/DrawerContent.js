import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import * as React from "react";
import {useTodoLists} from "../state/TodoListProvider";
import {THEME_COLORS} from "../state/ThemeColors";

export default function DrawerContent(props) {
    const [todosLists, dispatchTodoLists, activeList, setActiveList] = useTodoLists();

    return(
        <DrawerContentScrollView {...props}>
            {todosLists.map((list, listIndex) => {
                return <DrawerItem key={list.name}
                                   label={list.name}
                                   activeBackgroundColor={THEME_COLORS.LIGHT_THEME.PRIMARY}
                                   activeTintColor={THEME_COLORS.LIGHT_THEME.ON_PRIMARY}
                                   focused={listIndex === activeList}
                                   onPress={() => {
                                       setActiveList(listIndex);
                                       props.navigation.navigate(list.name);
                                   }}
                                   active={true}
                />
            })}
        </DrawerContentScrollView>
    )
}
