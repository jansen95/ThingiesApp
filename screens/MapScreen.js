import {View, StyleSheet} from "react-native";
import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {useTodoLists} from "../state/TodoListProvider";

//import {useThemeType} from "../state/ThemeProvider";
import {MARKER_COLORS} from  "../state/ThemeColors";
import {useToken} from "../state/TokenContext";
import axios from "axios";
import {API_ADDRESS} from "../ENV";


export default function MapScreen() {
    const [mapRegion, setMapRegion] = useState({
        latitude: 51.8397905,
        longitude: 6.6532594,
        latitudeDelta: 0.004,
        longitudeDelta: 0.002,
    });
    const [currentUserLocation, setCurrentUserLocation] = useState({
        latitude: 0.0,
        longitude: 0.0,
    });
    const [todoLists, dispatchTodoLists, activeTodoList] = useTodoLists();
    const [databaseTodoItems, setDatabaseTodoItems] = useState([
        {checked: false, date: null, gps_lat: 0.0, gps_long: 0.0, id: 1, list_id: 1, title:"Initial Todo"},
    ])
    const token = useToken();





    const userLocation = async() =>{
        let {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
            setErrorMsg('Permission to access location was denied')
        }
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
        setCurrentUserLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.004,
            longitudeDelta: 0.002,
        });
    }
    useEffect( ()=>{
        const getData = async () => {
            await axios.get(API_ADDRESS + '/todos', {headers: { Authorization: `Bearer ${token}` }})
                .then(function (response) {
                    setDatabaseTodoItems(response.data)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }
        getData().then()
        userLocation();
        },[]);

    //const darkTheme = useThemeType();
    const today = new Date();
    today.setHours(0, 0, 0,0);
    const farDate =new Date();
    if(farDate.getMonth() < 11){
        farDate.setMonth(farDate.getMonth()+1);
    }else{
        farDate.setMonth(0);
        farDate.setFullYear(farDate.getFullYear()+1);
    }


    return(
                <View style= {styles.container}>
                    <MapView style= {styles.map}
                        region={mapRegion}
                    >
                        {databaseTodoItems.map((todo) => {
                            if ((todo.list_id === activeTodoList || activeTodoList === 0)&&!todo.checked&&todo.gps_long!=null&&todo.gps_lat!=null) {
                                return (
                                    <Marker
                                        key = {todo.id}
                                        coordinate={{ latitude : todo.gps_lat , longitude : todo.gps_long }}
                                        title={todo.title}
                                        description= {new Date(todo.date).toISOString().substring(0, 10)}
                                        pinColor = {(new Date(todo.date).getTime() === today.getTime()) ? MARKER_COLORS.DARK_THEME.TODAY : (new Date(todo.date) < today ? MARKER_COLORS.DARK_THEME.ACUTE : (new Date(todo.date) > farDate ? MARKER_COLORS.DARK_THEME.FAR_OFF : MARKER_COLORS.DARK_THEME.DEFAULT))}
                                        opacity = {new Date(todo.date) > farDate ? 0.4 : 1.0}
                                    />
                                )
                            }
                        })}
                        <Marker
                            coordinate={currentUserLocation}
                            title={"Current Location"}
                            description = {"hier bist du"}
                            pinColor = {MARKER_COLORS.DARK_THEME.LOCATION}
                        />
                    </MapView>
                </View>

    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
