import {Text, View, StyleSheet} from "react-native";
import React, {useState} from 'react';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import {useTodoLists} from "../state/TodoListProvider";

import {THEME_COLORS} from "../state/ThemeColors";
import {useThemeType} from "../state/ThemeProvider";

export default function MapScreen() {
    const [mapRegion, setMapRegion] = useState({
          latitude: 51.8397905,
          longitude: 6.6532594,
          latitudeDelta: 0.004,
          longitudeDelta: 0.002,
    });
    const [todoLists, dispatchTodoLists, activeTodoList] = useTodoLists();


    const userLocation = async() =>{
        let {status} = await Location.requestForegroundPermissionsAsync();
        if(status !== 'granted'){
            setErrorMsg('Permission to access location was denied')
        }
        let location = await Location.getCurrentPositionAsync({enableHighAccuracy:true});
        setMapRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        });
        console.log(location.coords.latitude, location.coords.longitude);
    }
    /*useEffect(()=>{
        userLocation();
        },[]);//*/

    const darkTheme = useThemeType();
    return(
                <View style= {styles.container}>
                    <MapView style= {styles.map}
                        region={mapRegion}
                    >
                        {todoLists.map(({name, todos}, listIndex) => {
                          if(listIndex==activeTodoList){
                            return (
                                <View key={listIndex}>
                                    {todos.map((todo, todoIndex) => {
                                        return (
                                            <Marker key={todoIndex}
                                               key={listIndex+todoIndex}
                                               coordinate={todo.LatLng}
                                               title={todo.name}
                                               description={name}
                                               pinColor = {darkTheme ? "plum" : "orange"}

                                            />
                                        )
                                    })}
                                </View>
                            )
                          }
                        })}

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
