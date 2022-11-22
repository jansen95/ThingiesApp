import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import TodoScreen from "./TodoScreen";
import CalendarScreen from "./CalendarScreen";
import MapScreen from "./MapScreen";


function BottomTabNavigator() {
    return(
        <Tab.Navigator screenOptions={{headerShown: false}}>
            <Tab.Screen name="ToDo's" component={TodoScreen} />
            <Tab.Screen name="Calendar" component={CalendarScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
        </Tab.Navigator>
    )
}

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

export default function MainScreen() {
    return (
        <Drawer.Navigator initialRouteName="List1">
            <Drawer.Screen name="List1" component={BottomTabNavigator} />
            <Drawer.Screen name="List2" component={BottomTabNavigator} />
        </Drawer.Navigator>
    );
}
