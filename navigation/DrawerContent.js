import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import * as React from "react";
import {useTodoLists} from "../state/TodoListProvider";
import {THEME_COLORS} from "../state/ThemeColors";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_ADDRESS} from '@env';
import {useToken} from "../state/TokenContext";
import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import {useThemeType} from "../state/ThemeProvider";
import {TextInput} from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function DrawerContent(props) {
    const [todosLists, dispatchTodoLists, activeList, setActiveList] = useTodoLists();
    const [databaseLists, setDatabaseLists] = useState([{"title": "List"}]);
    const [newListName, setNewListName] = useState('');
    const token = useToken();
    const darkTheme = useThemeType();

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

    async function sendNewList() {
        //console.log("Hi")
        console.log(newListName)

        await axios.post(API_ADDRESS + '/list',
            {title: newListName},
            {headers: {Authorization: `Bearer ${token}`}})
            .then(() => {
                getLists()
            })
            .catch(function (error) {
                console.log(error.message + ": '" + error.response.data + "'");
            })
        setNewListName('')
    }


    useEffect(() => {
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
            <View style={{flexDirection: "row", alignItems: "center"}}>
                <TextInput
                    style={{flex: 8, borderColor: darkTheme ? THEME_COLORS.DARK_THEME.PRIMARY : THEME_COLORS.LIGHT_THEME.PRIMARY,}}
                    label="New List"
                    value={newListName}
                    onChangeText={setNewListName}
                />
                <View style={{flex: 2, alignItems: "center"}}>
                    <TouchableOpacity style={styles.floatingButton} onPress={sendNewList}>
                        <MaterialCommunityIcons
                            name="plus-circle"
                            size={50}
                            color={(darkTheme ? THEME_COLORS.DARK_THEME.PRIMARY : THEME_COLORS.LIGHT_THEME.PRIMARY)}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </DrawerContentScrollView>

    )
}

const styles = StyleSheet.create({

    floatingButton: {
        width: 60,
        height:60,
        alignItems: 'center',
        justifyContent: 'center',
    },

});
