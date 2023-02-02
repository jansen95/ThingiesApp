import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import * as React from "react";
import {useTodoLists} from "../state/TodoListProvider";
import {THEME_COLORS} from "../state/ThemeColors";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_ADDRESS} from '@env';
import {useToken} from "../state/TokenContext";
import {ScrollView} from "react-native";
import {useThemeType} from "../state/ThemeProvider";
import {TextInput} from "react-native-paper";

export default function DrawerContent(props) {
    const [todosLists, dispatchTodoLists, activeList, setActiveList] = useTodoLists();
    const [databaseLists, setDatabaseLists] = useState([{"title": "List"}]);
    const token = useToken();
    const darkTheme = useThemeType();


    useEffect(() => {
        const getLists = async () => {
            await axios.get(API_ADDRESS + '/lists', {headers: { Authorization: `Bearer ${token}` }})
                .then(function (response) {
                    // handle success
                    setDatabaseLists(response.data);
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }
        getLists().then()
    }, []);

    return(
        <DrawerContentScrollView {...props} contentContainerStyle={{flex: 1,  flexDirection: 'column', justifyContent: 'space-between'}}>
            <ScrollView>
                <DrawerItem key={"All List"}
                            label={"All List"}
                            activeBackgroundColor={darkTheme ? THEME_COLORS.DARK_THEME.PRIMARY : THEME_COLORS.LIGHT_THEME.PRIMARY}
                            activeTintColor={darkTheme ? THEME_COLORS.DARK_THEME.ON_PRIMARY : THEME_COLORS.LIGHT_THEME.ON_PRIMARY}
                            focused={activeList === 0}
                            onPress={() => {
                                setActiveList(0);
                                props.navigation.navigate("All List");
                            }}
                            active={true}
                />
                {databaseLists.map((list, listIndex) => {
                    return <DrawerItem key={list.title}
                                       label={list.title}
                                       activeBackgroundColor={darkTheme ? THEME_COLORS.DARK_THEME.PRIMARY : THEME_COLORS.LIGHT_THEME.PRIMARY}
                                       activeTintColor={darkTheme ? THEME_COLORS.DARK_THEME.ON_PRIMARY : THEME_COLORS.LIGHT_THEME.ON_PRIMARY}
                                       focused={list.id === activeList}
                                       onPress={() => {
                                           setActiveList(list.id);
                                           props.navigation.navigate(list.title);
                                       }}
                                       active={true}
                    />
                })}
            </ScrollView>

            <TextInput
                style={{borderColor: darkTheme ? THEME_COLORS.DARK_THEME.PRIMARY : THEME_COLORS.LIGHT_THEME.PRIMARY,}}
                label="New List"
                onSubmit={() => {console.log("submit")}}
                onChangeText={() => {}}
            />

        </DrawerContentScrollView>

    )
}
