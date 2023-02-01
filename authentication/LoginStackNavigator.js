import * as React from 'react';
import * as SecureStore from 'expo-secure-store';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import MainScreen from "../screens/MainScreen";
import {AuthContext} from "../state/AuthContext";
import SignUpScreen from "../screens/SignUpScreen";
import {useThemeType} from "../state/ThemeProvider";
import {THEME_COLORS} from "../state/ThemeColors";
import ThemeToggleSwitch from "../components/ThemeToggleSwitch";
import axios from "axios";
import {Alert, Vibration} from "react-native";
import {TokenContext} from "../state/TokenContext";
import {AUTH_SERVER_ADDRESS} from '@env';
import {UserNameContext} from "../state/UserNameContext";

export default function LoginStackNavigator() {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        firstName: action.firstName,
                        lastName: action.lastName,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                        firstName: action.firstName,
                        lastName: action.lastName,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                        firstName: null,
                        lastName: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
            firstName: null,
            lastName: null,
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;
            let firstName;
            let lastName;

            try {
                userToken = await SecureStore.getItemAsync('userToken');
                firstName = await SecureStore.getItemAsync('firstName');
                lastName = await SecureStore.getItemAsync('lastName');
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken, firstName: firstName, lastName: lastName });
        };

        bootstrapAsync().then();
    }, []);


    const authContext = React.useMemo(
        () => ({
            signIn: async (data) => {
                // In a production app, we need to send some data (usually username, password) to server and get a token
                // We will also need to handle errors if sign in failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token
                const username = data.username
                const password = data.password

                await axios.post(AUTH_SERVER_ADDRESS + '/login',  {
                    "email": username,
                    "password": password
                })
                .then(res => {
                    const accessToken = res.data.accessToken
                    const firstName = res.data.first_name
                    const lastName = res.data.last_name
                    SecureStore.setItemAsync('userToken', accessToken)
                    SecureStore.setItemAsync('firstName', firstName)
                    SecureStore.setItemAsync('lastName', lastName)
                    dispatch({ type: 'SIGN_IN', token: accessToken, firstName: firstName, lastName: lastName });
                })
                .catch(function (error) {
                    //console.log(error.response.data);
                    Vibration.vibrate();
                    if (error.response.status === 400){
                        Alert.alert('User or password is incorrect')
                    } else if (error.response.status !== 400){
                        Alert.alert(error.message +  ": " + error.response.data)
                    }
                });
            },
            signOut: () => {
                SecureStore.deleteItemAsync('userToken')
                    .then( dispatch({ type: 'SIGN_OUT' }) )
            }
            ,
            signUp: async (data) => {
                // In a production app, we need to send user data to server and get a token
                // We will also need to handle errors if sign up failed
                // After getting token, we need to persist the token using `SecureStore`
                // In the example, we'll use a dummy token

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
        }),
        []
    );

    const Stack = createNativeStackNavigator();
    const darkTheme = useThemeType();

    return (
        <AuthContext.Provider value={authContext}>
            <TokenContext.Provider value={state.userToken}>
                <UserNameContext.Provider value={[state.firstName, state.lastName]}>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: {
                                backgroundColor: darkTheme ? THEME_COLORS.DARK_THEME.BACKGROUND:THEME_COLORS.LIGHT_THEME.BACKGROUND,
                            },
                            headerTintColor: darkTheme ? THEME_COLORS.DARK_THEME.ON_BACKGROUND:THEME_COLORS.LIGHT_THEME.ON_BACKGROUND,
                            headerRight: () => (<ThemeToggleSwitch/>),
                        }}
                    >
                        {state.userToken == null ? (
                            <>
                                <Stack.Screen name="SignIn" component={SignInScreen} />
                                <Stack.Screen name="SignUp" component={SignUpScreen} />
                            </>
                        ) : (
                            <Stack.Screen options={{headerShown: false}} name="Main" component={MainScreen} />
                        )}
                    </Stack.Navigator>
                </UserNameContext.Provider>
            </TokenContext.Provider>
        </AuthContext.Provider>
    );
}
