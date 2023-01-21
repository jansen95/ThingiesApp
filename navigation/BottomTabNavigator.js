import TodoScreen from "../screens/TodoScreen";
import CalendarScreen from "../screens/CalendarScreen";
import MapScreen from "../screens/MapScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {THEME_COLORS} from "../state/ThemeColors";
import {useThemeType} from "../state/ThemeProvider";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    const darkTheme = useThemeType();

    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === "ToDo's") {
                        iconName = focused
                            ? 'format-list-bulleted-square'
                            : 'format-list-bulleted';
                    } else if (route.name === 'Calendar') {
                        iconName = focused ? 'calendar' : 'calendar-outline';
                    } else if (route.name === 'Map') {
                        iconName = focused ? 'map-marker' : 'map-marker-outline';
                    } else if (route.name === 'Settings') {
                        iconName = focused ? 'tools' : 'tools';
                    }

                    return <MaterialCommunityIcons name={iconName}
                                                   size={size}
                                                   color={
                                                        focused ?
                                                            (darkTheme ? THEME_COLORS.DARK_THEME.PRIMARY : THEME_COLORS.LIGHT_THEME.PRIMARY) :
                                                            (darkTheme ?
                                                                THEME_COLORS.DARK_THEME.ON_BACKGROUND + THEME_COLORS.DARK_THEME.ON_SURFACE_OPACITY.DISABLED:
                                                                THEME_COLORS.LIGHT_THEME.ON_BACKGROUND + THEME_COLORS.LIGHT_THEME.ON_SURFACE_OPACITY.DISABLED)
                                                   } />;
                },
                tabBarActiveTintColor: THEME_COLORS.DARK_THEME.PRIMARY,
                tabBarStyle: {
                    backgroundColor: darkTheme ? THEME_COLORS.DARK_THEME.BACKGROUND : THEME_COLORS.LIGHT_THEME.BACKGROUND,
                },
            })}
        >
            <Tab.Screen name="ToDo's" component={TodoScreen} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    )
}
