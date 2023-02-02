import {THEME_COLORS} from "../state/ThemeColors";
import BottomTabNavigator from "./BottomTabNavigator";
import * as React from "react";
import {createDrawerNavigator} from "@react-navigation/drawer";
import {useThemeType} from "../state/ThemeProvider";
import DrawerContent from "./DrawerContent";
import {Alert} from "react-native";
import {AuthContext} from "../state/AuthContext";
import {useEffect, useState} from "react";
import {useToken} from "../state/TokenContext";
import axios from "axios";
import {API_ADDRESS} from '@env';
import {IconButton} from "react-native-paper";

const Drawer = createDrawerNavigator();


export default function DrawerNavigator() {
    const darkTheme = useThemeType();
    //const [todoLists] = useTodoLists();

    const [databaseLists, setDatabaseLists] = useState([{"title": "List"}]);
    const token = useToken();

    useEffect(() => {
        const getLists = async () => {
            await axios.get(API_ADDRESS + '/lists', {headers: { Authorization: `Bearer ${token}` }})
                .then(function (response) {
                    // handle success
                    //console.log(response.data);
                    setDatabaseLists(response.data)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }
        getLists().then()
    }, []);

    function addUser() {
        Alert.alert("'Add user'-Feature not implemented, yet")
        //open Modal
        //get email
        //send email & active list
    }

    return(
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}
                          screenOptions={{
                              headerStyle: {
                                  backgroundColor: darkTheme ? THEME_COLORS.DARK_THEME.BACKGROUND : THEME_COLORS.LIGHT_THEME.BACKGROUND,
                              },
                              headerTintColor: darkTheme ? THEME_COLORS.DARK_THEME.ON_BACKGROUND : THEME_COLORS.LIGHT_THEME.ON_BACKGROUND,
                              tabBarColor: darkTheme ? THEME_COLORS.DARK_THEME.ON_BACKGROUND : THEME_COLORS.LIGHT_THEME.ON_BACKGROUND,
                              headerRight: () => (
                                  <IconButton
                                      icon="account-multiple-plus"
                                      iconColor={darkTheme ? THEME_COLORS.DARK_THEME.ON_BACKGROUND : THEME_COLORS.LIGHT_THEME.ON_BACKGROUND}
                                      size={20}
                                      onPress={addUser}
                                  />
                              )
                          }}
        >
            <Drawer.Screen key={"All List"} name={"All List"} component={BottomTabNavigator}/>
            {databaseLists.map((list) => {
                return <Drawer.Screen key={list.title} name={list.title} component={BottomTabNavigator}/>
            })}
        </Drawer.Navigator>
    )
}
