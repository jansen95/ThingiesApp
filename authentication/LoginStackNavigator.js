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

export default function LoginStackNavigator() {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    };
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    };
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null,
                    };
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    );

    React.useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            let userToken;

            try {
                userToken = await SecureStore.getItemAsync('userToken');
            } catch (e) {
                // Restoring token failed
            }

            // After restoring token, we may need to validate it in production apps

            // This will switch to the App screen or Auth screen and this loading
            // screen will be unmounted and thrown away.
            dispatch({ type: 'RESTORE_TOKEN', token: userToken });
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

                dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
            },
            signOut: () => dispatch({ type: 'SIGN_OUT' }),
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
        </AuthContext.Provider>
    );
}
