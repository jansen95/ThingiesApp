import {Button, TextInput, View} from "react-native";
import React from "react";
import {AuthContext} from "../state/AuthContext";

export default function SignUpScreen() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signUp } = React.useContext(AuthContext);

    return (
        <View>
            <TextInput
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign up" onPress={() => signUp({ username, password })} />
        </View>
    );
}
