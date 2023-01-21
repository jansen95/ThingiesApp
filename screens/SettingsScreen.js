import * as React from "react";
import {Button, Text, View} from "react-native";
import {THEME_COLORS} from "../state/ThemeColors";
import {useThemeType} from "../state/ThemeProvider";
import {AuthContext} from "../state/AuthContext";
import {useUserName} from "../state/UserNameContext";
import ThemeToggleSwitch from "../components/ThemeToggleSwitch";


export default function SettingsScreen() {
    const { signOut } = React.useContext(AuthContext);
    const darkTheme = useThemeType();
    const [firstName, lastName] = useUserName()

    return (
        <View style={[{flex: 1, alignItems: "center", justifyContent: "center"}]}>
            <View style={{flexDirection: "row", alignItems: "center", marginBottom: 10}}>
                <Text style={{fontWeight: "bold"}}>Logged in as: </Text>
                <Text>{firstName + " " + lastName}</Text>
            </View>
            <Button title={"Logout"}
                    color={darkTheme ? THEME_COLORS.DARK_THEME.PRIMARY : THEME_COLORS.LIGHT_THEME.PRIMARY}
                    onPress={() => signOut()}
            />
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <Text style={{fontWeight: "bold"}}>Dark Theme: </Text>
                <ThemeToggleSwitch/>
            </View>
        </View>
    )
}
