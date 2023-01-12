import {View,ScrollView, StyleSheet, TouchableOpacity} from "react-native";
import * as React from "react";
import {useTodoLists} from "../state/TodoListProvider";
import {THEME_COLORS} from "../state/ThemeColors";
import {useThemeType} from "../state/ThemeProvider";
import {FAB,Checkbox,List} from 'react-native-paper';
import axios from "axios";
import {useEffect, useState} from "react";
import {useToken} from "../state/TokenContext";
import {API_ADDRESS} from "../ENV";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


export default function TodoScreen() {
    const [todoLists, dispatchTodoLists, activeTodoList, setActiveList] = useTodoLists();
    const darkTheme = useThemeType();
    const todoItems = [];

    //const [checked, setChecked] = React.useState(false);
    const [databaseTodoItems, setDatabaseTodoItems] = useState([
        {checked: false, date: null, gps_lat: null, gps_long: null, id: 1, list_id: 1, title:"Initial Todo"},
    ])
    const token = useToken();

    function printData(data) {
        data.map((dataObject) => {
            console.log(dataObject)
        })
    }

    const setChecked= async (id) =>{
        await axios.patch(API_ADDRESS+ '/todo/setChecked/:id' ,{},{headers: { Authorization: `Bearer ${token}`} })
            .then(function (response) {
                this.getData();
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    const patchTodo= async (id, new_title, new_gps_lat, new_gps_long, new_date) =>{
        await axios.patch(API_ADDRESS+ '/todo/:id' ,
            {title: new_title, gps_lat: new_gps_lat, gps_long: new_gps_long, date: new_date},
            {headers: { Authorization: `Bearer ${token}`} })
            .then(function (response) {
                this.getData();
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const getData = async () => {
        await axios.get(API_ADDRESS + '/todos', {headers: { Authorization: `Bearer ${token}` }})
            .then(function (response) {
                // handle success
                printData(response.data)
                setDatabaseTodoItems(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }
    useEffect(() => {
        getData().then()
    }, []);

    const onAddButtonPress=()=>{
        console.log("Add pressed")

    }

    databaseTodoItems.map((todo) => {
        if (todo.list_id === activeTodoList || activeTodoList === 0) {
            todoItems.push(
                <List.Item
                        key={todo.id}
                    style={{
                        backgroundColor: darkTheme ? THEME_COLORS.DARK_THEME.SURFACE : THEME_COLORS.LIGHT_THEME.SURFACE
                    }}
                    title={todo.title}
                    titleStyle={{
                        color: darkTheme ? THEME_COLORS.DARK_THEME.ON_SURFACE : THEME_COLORS.LIGHT_THEME.ON_SURFACE
                    }}
                    description={"Date: " + (todo.date && todo.date.substring(0, 10)) +  "  GPS: "+ todo.gps_lat +" , "+ todo.gps_long}
                    descriptionStyle={{
                        color: darkTheme ? THEME_COLORS.DARK_THEME.ON_SURFACE + THEME_COLORS.DARK_THEME.ON_SURFACE_OPACITY.MEDIUM_EMPHASIS
                            : THEME_COLORS.LIGHT_THEME.ON_SURFACE + THEME_COLORS.LIGHT_THEME.ON_SURFACE_OPACITY.MEDIUM_EMPHASIS
                    }}
                    left={() => <Checkbox
                        status={todo.checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                            setChecked(todo.id);
                        }}
                        color =  {darkTheme ? THEME_COLORS.DARK_THEME.PRIMARY : THEME_COLORS.LIGHT_THEME.PRIMARY}
                    />}
                    right={props => <List.Icon {...props} icon="equal" />}
                />
            );
        }
    })

    /*
    todoLists.map(({todos}, indexList) => {
        if (indexList === activeTodoList||activeTodoList===0) {
            todos.map((todo, indexTodo) => {
                todoItems.push(
                    <List.Item
                        key={todo.todoId}
                        style={{
                            backgroundColor: darkTheme ? THEME_COLORS.DARK_THEME.SURFACE : THEME_COLORS.LIGHT_THEME.SURFACE
                        }}
                        title={todo.name}
                        titleStyle={{
                            color: darkTheme ? THEME_COLORS.DARK_THEME.ON_SURFACE : THEME_COLORS.LIGHT_THEME.ON_SURFACE
                        }}
                        description={"Date: " + todo.timestamp.substring(0, 10) +  " \nGPS: "+ todo.LatLng.latitude +" , "+ todo.LatLng.longitude}
                        descriptionStyle={{
                            color: darkTheme ? THEME_COLORS.DARK_THEME.ON_SURFACE + THEME_COLORS.DARK_THEME.ON_SURFACE_OPACITY.MEDIUM_EMPHASIS
                                : THEME_COLORS.LIGHT_THEME.ON_SURFACE + THEME_COLORS.LIGHT_THEME.ON_SURFACE_OPACITY.MEDIUM_EMPHASIS
                        }}
                        left={() => <Checkbox
                            value={checked[todo.todoId]}
                            color =  {darkTheme ? THEME_COLORS.DARK_THEME.PRIMARY : THEME_COLORS.LIGHT_THEME.PRIMARY}
                            onValueChange={(newValue) => { setChecked({...checked, [todo.todoId]: newValue}) }}             //???
                        />}
                        right={props => <List.Icon {...props} icon="equal" />}
                    />
                );
            })
        }
    })
    */


    return(
        <View>
            <ScrollView style={{}}>

                {todoItems}

            </ScrollView>
            {/*<FAB style={styles.fab} icon="plus-circle"
                 color={(darkTheme ? THEME_COLORS.DARK_THEME.PRIMARY : THEME_COLORS.LIGHT_THEME.PRIMARY)}
                 onPress={onAddButtonPress} />*/}

            <TouchableOpacity
                style={styles.floatingButton}
                onPress={onAddButtonPress}
            >

                <MaterialCommunityIcons
                    name="plus-circle"
                    size={50}
                    color={(darkTheme ? THEME_COLORS.DARK_THEME.PRIMARY : THEME_COLORS.LIGHT_THEME.PRIMARY)}
                />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    floatingButton: {
        position: 'absolute',
        width: 60,
        height:60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom:30,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

