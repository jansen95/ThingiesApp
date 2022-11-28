import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import TodoScreen from "./TodoScreen";
import CalendarScreen from "./CalendarScreen";
import MapScreen from "./MapScreen";
import {useThemeType} from "../state/ThemeProvider";
import {THEME_COLORS} from "../state/ThemeColors";
import ThemeToggleSwitch from "../components/ThemeToggleSwitch";


function BottomTabNavigator() {
    return(
        <Tab.Navigator screenOptions={{headerShown: false}}

        >
            <Tab.Screen name="ToDo's" component={TodoScreen} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
        </Tab.Navigator>
    )
}

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function MainScreen() {
    const darkTheme = useThemeType();

    return (
        <Drawer.Navigator initialRouteName="List1"
                          screenOptions={{
                              headerStyle: {
                                  backgroundColor: darkTheme ? THEME_COLORS.DARK_THEME.BACKGROUND : THEME_COLORS.LIGHT_THEME.BACKGROUND,
                              },
                              headerTintColor: darkTheme ? THEME_COLORS.DARK_THEME.ON_BACKGROUND : THEME_COLORS.LIGHT_THEME.ON_BACKGROUND,
                              tabBarColor: darkTheme ? THEME_COLORS.DARK_THEME.ON_BACKGROUND : THEME_COLORS.LIGHT_THEME.ON_BACKGROUND,
                              headerRight: () => (<ThemeToggleSwitch/>),
                          }}
        >
            <Drawer.Screen name="List1" component={BottomTabNavigator} />
            <Drawer.Screen name="List2" component={BottomTabNavigator} />
        </Drawer.Navigator>
    );
}
