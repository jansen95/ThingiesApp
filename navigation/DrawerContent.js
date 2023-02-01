import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import * as React from "react";
import {useTodoLists} from "../state/TodoListProvider";
import {THEME_COLORS} from "../state/ThemeColors";
import {useEffect, useState} from "react";
import axios from "axios";
import {API_ADDRESS} from '@env';
import {useToken} from "../state/TokenContext";

export default function DrawerContent(props) {
    const [todosLists, dispatchTodoLists, activeList, setActiveList] = useTodoLists();
    const [databaseLists, setDatabaseLists] = useState([{"title": "List"}]);
    const token = useToken();


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
        <DrawerContentScrollView {...props}>
            <DrawerItem key={"All List"}
                               label={"All List"}
                               activeBackgroundColor={THEME_COLORS.LIGHT_THEME.PRIMARY}
                               activeTintColor={THEME_COLORS.LIGHT_THEME.ON_PRIMARY}
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
                                   activeBackgroundColor={THEME_COLORS.LIGHT_THEME.PRIMARY}
                                   activeTintColor={THEME_COLORS.LIGHT_THEME.ON_PRIMARY}
                                   focused={list.id === activeList}
                                   onPress={() => {
                                       setActiveList(list.id);
                                       props.navigation.navigate(list.title);
                                   }}
                                   active={true}
                />
            })}
        </DrawerContentScrollView>
    )
}
