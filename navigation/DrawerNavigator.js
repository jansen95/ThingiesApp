import {THEME_COLORS} from "../state/ThemeColors";
import ThemeToggleSwitch from "../components/ThemeToggleSwitch";
import BottomTabNavigator from "./BottomTabNavigator";
import * as React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {useThemeType} from "../state/ThemeProvider";

const Drawer = createDrawerNavigator();


export default function DrawerNavigator() {
    const darkTheme = useThemeType();

    return(
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
    )
}
