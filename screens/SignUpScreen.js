import {Button, StyleSheet, View} from "react-native";
import React from "react";
import {AuthContext} from "../state/AuthContext";
import {TextInput} from "react-native-paper";
import {THEME_COLORS} from "../state/ThemeColors";
import {useThemeType} from "../state/ThemeProvider";

export default function SignUpScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signUp } = React.useContext(AuthContext);
    const darkTheme = useThemeType();


    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
          backgroundColor={darkTheme ?
              THEME_COLORS.DARK_THEME.SURFACE + THEME_COLORS.DARK_THEME.ON_SURFACE_OPACITY.HIGH_EMPHASIS :
              THEME_COLORS.LIGHT_THEME.SURFACE + THEME_COLORS.LIGHT_THEME.ON_SURFACE_OPACITY.MEDIUM_EMPHASIS}
        >
            <TextInput
                style={styles.textInput}
                label="Username"
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.textInput}
                label="Password"
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.buttons}>
                <Button title="Sign up"
                        onPress={() => signUp({ username, password })}
                        color={darkTheme ? THEME_COLORS.DARK_THEME.PRIMARY : THEME_COLORS.LIGHT_THEME.PRIMARY}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    textInput: {
        width: 300
    },
    buttons: {
        paddingTop: 8,
    }

});
