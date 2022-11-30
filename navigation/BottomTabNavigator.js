import TodoScreen from "../screens/TodoScreen";
import CalendarScreen from "../screens/CalendarScreen";
import MapScreen from "../screens/MapScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return(
        <Tab.Navigator
            screenOptions={({ route }) => ({
                showHeader: false,
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
                    }

                    // You can return any component that you like here!
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="ToDo's" component={TodoScreen} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
        </Tab.Navigator>
    )
}
