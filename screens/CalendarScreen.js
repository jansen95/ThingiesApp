import {Dimensions, View, Text, TouchableOpacity} from "react-native";
import {useEffect, useState} from "react";
import {Agenda, LocaleConfig} from "react-native-calendars";
import {useTodoLists} from "../state/TodoListProvider";
import {MARKER_COLORS} from  "../state/ThemeColors";
import * as React from "react";
import axios from "axios";
import {API_ADDRESS} from '@env';
import {useToken} from "../state/TokenContext";


LocaleConfig.locales['Ger'] = {
    monthNames: [
        'Januar',
        'Februar',
        'März',
        'April',
        'Mai',
        'Juni',
        'Juli',
        'August',
        'September',
        'Oktober',
        'November',
        'Dezember'
    ],
    monthNamesShort: ['Jan.', 'Febr.', 'März', 'Apr.', 'Mai', 'Jun.', 'Jul.', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.'],
    dayNames: ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'],
    dayNamesShort: ['Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.', 'So.'],
    today: "Heute"
};
LocaleConfig.defaultLocale = 'Ger';

export default function CalendarScreen() {
    const [todoLists, dispatchTodoLists, activeTodoList] = useTodoLists();

    const [databaseTodoItems, setDatabaseTodoItems] = useState([
        //{checked: false, date: "00-00-0000", gps_lat: null, gps_long: null, id: 1, list_id: 1, title: "Initial Todo"},
    ])
    const token = useToken();

    function printData(data) {
        data.map((dataObject) => {
            console.log(dataObject)
        })
    }

    useEffect(() => {
        const getData = async () => {
            await axios.get(API_ADDRESS + '/todos', {headers: { Authorization: `Bearer ${token}` }})
                .then(function (response) {
                    // handle success
                    //printData(response.data)
                    setDatabaseTodoItems(response.data)
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
        }
        getData().then()
    }, []);

    let today = new Date();
    today.setHours(0, 0, 0,0);
    const farDate =new Date();
    if(farDate.getMonth() < 11){
        farDate.setMonth(farDate.getMonth()+1);
    }else{
        farDate.setMonth(0);
        farDate.setFullYear(farDate.getFullYear()+1);
    }

    let markedDay = {};
    let agendaItem = {};

    databaseTodoItems.map((todo) => {
        if((todo.list_id === activeTodoList || activeTodoList === 0)&&todo.date!=null){

            agendaItem[todo.date.substring(0, 10)]= [{
                    name: todo.title
                }]

            if(today >= new Date(todo.date)){
                if(today >new Date(todo.date)){
                    markedDay[todo.date.substring(0, 10)] = {
                        marked: true,
                        selected: true,
                        selectedColor: MARKER_COLORS.DARK_THEME.ACUTE,
                    };
                }else{
                    markedDay[todo.date.substring(0, 10)] = {
                        marked: true,
                        selected: true,
                        selectedColor: MARKER_COLORS.DARK_THEME.TODAY,
                    };
                }
            }else{
                if(farDate <= new Date(todo.date)){
                    markedDay[todo.date.substring(0, 10)] = {
                        marked: true,
                        selected: true,
                        selectedColor: MARKER_COLORS.DARK_THEME.FAR_OFF,
                    };
                }else{
                    markedDay[todo.date.substring(0, 10)] = {
                        marked: true,
                        selected: true,
                        selectedColor: MARKER_COLORS.DARK_THEME.DEFAULT,
                    };
                }
            }
        }
    })

    const renderItem = (item) => {
        return (
            <TouchableOpacity>
                <View>
                    <Text>{item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }


    return (
        <View style={{height: Dimensions.get('window').height}}>
                {/*<Text>Active todo list is: {activeTodoList}</Text>*/}
                <Agenda
                    markingType={'custom'}
                    markedDates={markedDay}

                    items={agendaItem}
                    renderItem={renderItem}

                    pastScrollRange={0}
                    futureScrollRange={36}
                    showScrollIndicator={true}

                    firstDay={0}
                    showWeekNumbers={true}
                    hideDayNames={false}
                    minDate={today.toISOString()}

                    renderEmptyData={() => {
                        return (
                                <View>
                                    <Text></Text>
                                </View>
                            )
                    }}
                />
        </View>
    )
}





