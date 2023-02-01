import React, {useEffect} from "react";
import ThemeProvider from "./state/ThemeProvider";
import TodoListProvider from "./state/TodoListProvider";
import {NavigationContainer} from "@react-navigation/native";
import LoginStackNavigator from "./authentication/LoginStackNavigator";
import CustomStatusBar from "./components/CustomStatusBar";
import { useColorScheme, Platform } from 'react-native';
import * as NavigationBar from "expo-navigation-bar";
import {THEME_COLORS} from "./state/ThemeColors";
import * as Device from 'expo-device';
import {GestureHandlerRootView} from "react-native-gesture-handler";
import * as Notifications from 'expo-notifications';


export default function App() {
    let colorScheme = useColorScheme(); //OS Theme

    //console.log(Device.deviceName)
    if (Device.brand !== "Apple") {
        NavigationBar.setBackgroundColorAsync(colorScheme === 'dark' ?
            THEME_COLORS.DARK_THEME.BACKGROUND :
            THEME_COLORS.LIGHT_THEME.BACKGROUND
        ).then()
    }

    async function registerForPushNotificationsAsync() {
        let token;

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        if (Device.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        return token;
    }

    useEffect(() =>{
        (()=> registerForPushNotificationsAsync())();
    },[]);//*/

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <TodoListProvider>
                <ThemeProvider>
                    <CustomStatusBar></CustomStatusBar>
                    <NavigationContainer>
                        <LoginStackNavigator>
                            {/*<TodoListsTextScreen/>*/}
                        </LoginStackNavigator>
                    </NavigationContainer>
                </ThemeProvider>
            </TodoListProvider>
        </GestureHandlerRootView>
    );
}
