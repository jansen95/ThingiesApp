import {Dimensions, View} from "react-native";
import {Agenda, LocaleConfig} from "react-native-calendars";
import {useTodoLists} from "../state/TodoListProvider";
import {MARKER_COLORS} from  "../state/ThemeColors";


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

    let today = new Date();
    today.setHours(0, 0, 0,0);
    const farDate =new Date();;
    if(farDate.getMonth() < 11){
        farDate.setMonth(farDate.getMonth()+1);
    }else{
        farDate.setMonth(0);
        farDate.setFullYear(farDate.getFullYear()+1);
    }

    let markedDay = {};

    todoLists.map(({todos},listIndex) => {
        if(listIndex===activeTodoList||activeTodoList===0){
            todos.map((todo) => {
                if(today >= new Date(todo.timestamp)){
                    if(today >new Date(todo.timestamp)){
                        markedDay[todo.timestamp.substring(0, 10)] = {
                            marked: true,
                            selected: true,
                            selectedColor: MARKER_COLORS.DARK_THEME.ACUTE,
                        };
                    }else{
                        markedDay[todo.timestamp.substring(0, 10)] = {
                            marked: true,
                            selected: true,
                            selectedColor: MARKER_COLORS.DARK_THEME.TODAY,
                        };
                    }
                }else{
                    if(farDate <= new Date(todo.timestamp)){
                        markedDay[todo.timestamp.substring(0, 10)] = {
                            marked: true,
                            selected: true,
                            selectedColor: MARKER_COLORS.DARK_THEME.FAR_OFF,
                        };
                    }else{
                        markedDay[todo.timestamp.substring(0, 10)] = {
                            marked: true,
                            selected: true,
                            selectedColor: MARKER_COLORS.DARK_THEME.DEFAULT,
                        };
                    }
                }
            })
        }
    })


    return (
        <View style={{height: Dimensions.get('window').height}}>
                {/*<Text>Active todo list is: {activeTodoList}</Text>*/}
                <Agenda
                    markingType={'custom'}
                    markedDates={markedDay}

                    pastScrollRange={0}
                    futureScrollRange={36}
                    showScrollIndicator={true}

                    firstDay={0}
                    showWeekNumbers={true}
                    hideDayNames={false}
                    minDate={today.toISOString()}
                />
        </View>
    )
}





