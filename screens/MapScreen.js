import {View, StyleSheet} from "react-native";
import React, {useEffect, useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {useTodoLists} from "../state/TodoListProvider";

import {useThemeType} from "../state/ThemeProvider";
import {MARKER_COLORS} from  "../state/ThemeColors";


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


    const userLocation = async() =>{
        let {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
            setErrorMsg('Permission to access location was denied')
        }
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
        setCurrentUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        });
    }
    useEffect( ()=>{
        userLocation();
        },[]);

    const darkTheme = useThemeType();
    const today = new Date();
    today.setHours(0, 0, 0,0);
    const farDate =new Date();;
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
                        {todoLists.map(({name, todos}, listIndex) => {
                          if(listIndex===activeTodoList||activeTodoList===0){
                            return (
                                <View key={listIndex}>
                                    {todos.map((todo, todoIndex) => {
                                        return (
                                            <Marker
                                               key={listIndex+todoIndex}
                                               coordinate={todo.LatLng}
                                               title={todo.name}
                                               description= {new Date(todo.timestamp).toISOString().substring(0, 10)}
                                               pinColor = {(new Date(todo.timestamp).getTime() === today.getTime()) ? MARKER_COLORS.DARK_THEME.TODAY : (new Date(todo.timestamp) < today ? MARKER_COLORS.DARK_THEME.ACUTE : (new Date(todo.timestamp) > farDate ? MARKER_COLORS.DARK_THEME.FAR_OFF : MARKER_COLORS.DARK_THEME.DEFAULT))}
                                               opacity = {new Date(todo.timestamp) > farDate ? 0.4 : 1.0}
                                            />
                                        )
                                    })}
                                </View>
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

function compareDates() {

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
