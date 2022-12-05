import {Text, View} from "react-native";
import {CalendarList} from "react-native-calendars/src/index";
import {LocaleConfig} from "react-native-calendars";
import {useTodoLists} from "../state/TodoListProvider";


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

    let date;
    date = new Date().toString();

    let markedDay = {};

    todoLists.map(({todos}) => {
        todos.map((todo) => {
            markedDay[todo.date] = {
                marked: true,
                selected: true,
                selectedColor: "purple",
            };
        })
    })


    return (
        <View>
                <Text>Active todo list is: {activeTodoList}</Text>
                <CalendarList
                    markingType={'custom'}
                    markedDates={markedDay}

                    pastScrollRange={0}
                    futureScrollRange={36}
                    showScrollIndicator={true}

                    firstDay={0}
                    showWeekNumbers={true}
                    hideDayNames={false}
                    minDate={date}
                />
        </View>
    )
}





