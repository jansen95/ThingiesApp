import {Dimensions, View, Text, TouchableOpacity, StyleSheet} from "react-native";
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

    const renderItem = (item) => {
        return (
            <TouchableOpacity style={styles.item}>
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
                />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    }
});





