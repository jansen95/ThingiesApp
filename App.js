import React, {useState, useEffect, useRef} from "react";
import { useColorScheme, Platform } from 'react-native';
import ThemeProvider from "./state/ThemeProvider";
import TodoListProvider from "./state/TodoListProvider";
import {NavigationContainer} from "@react-navigation/native";
import LoginStackNavigator from "./authentication/LoginStackNavigator";
import CustomStatusBar from "./components/CustomStatusBar";
import * as NavigationBar from "expo-navigation-bar";
import {THEME_COLORS} from "./state/ThemeColors";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';


Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function App() {
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    let colorScheme = useColorScheme(); //OS Theme

    //console.log(Device.deviceName)
    if (Device.brand !== "Apple") {
        NavigationBar.setBackgroundColorAsync(colorScheme === 'dark' ?
            THEME_COLORS.DARK_THEME.BACKGROUND :
            THEME_COLORS.LIGHT_THEME.BACKGROUND
        ).then()
    }

    const registerForPushNotificationsAsync= async () => {
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
    //*
    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);


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
