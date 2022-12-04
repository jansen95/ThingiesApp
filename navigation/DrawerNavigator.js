import {THEME_COLORS} from "../state/ThemeColors";
import ThemeToggleSwitch from "../components/ThemeToggleSwitch";
import BottomTabNavigator from "./BottomTabNavigator";
import * as React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {useThemeType} from "../state/ThemeProvider";
import {useTodoLists} from "../state/TodoListProvider";
import DrawerContent from "./DrawerContent";

const Drawer = createDrawerNavigator();


export default function DrawerNavigator() {
    const darkTheme = useThemeType();
    const [todoLists] = useTodoLists();

    return(
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}
                          screenOptions={{
                              headerStyle: {
                                  backgroundColor: darkTheme ? THEME_COLORS.DARK_THEME.BACKGROUND : THEME_COLORS.LIGHT_THEME.BACKGROUND,
                              },
                              headerTintColor: darkTheme ? THEME_COLORS.DARK_THEME.ON_BACKGROUND : THEME_COLORS.LIGHT_THEME.ON_BACKGROUND,
                              tabBarColor: darkTheme ? THEME_COLORS.DARK_THEME.ON_BACKGROUND : THEME_COLORS.LIGHT_THEME.ON_BACKGROUND,
                              headerRight: () => (<ThemeToggleSwitch/>),
                          }}
        >
            {todoLists.map((list) => {
                return <Drawer.Screen key={list.name} name={list.name} component={BottomTabNavigator}/>
            })}
        </Drawer.Navigator>
    )
}
