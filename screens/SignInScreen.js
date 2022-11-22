import {Button, TextInput, View} from "react-native";
import React from "react";
import {AuthContext} from "../state/AuthContext";

export default function SignInScreen({navigation}) {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { signIn } = React.useContext(AuthContext);

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
            <Button title="Sign in" onPress={() => signIn({ username, password })} />
            <Button
                title="Go to Sign Up"
                onPress={() => navigation.navigate('SignUp')}
            />

        </View>
    );
}
