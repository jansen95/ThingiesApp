import {Text, View} from "react-native";
import TodoListsTextScreen from "./TodoListsTextScreen";
import {CalendarList} from "react-native-calendars";

export default function CalendarScreen() {
    return(
        <View>
            <CalendarList
                onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                pastScrollRange={50}
                futureScrollRange={50}
                scrollEnabled={true}
                showScrollIndicator={true}

                 maxDate={new Date()}

                onDayPress={day => {console.log('selected day', day);}}

            />
            <TodoListsTextScreen/>


        </View>
    )
}
