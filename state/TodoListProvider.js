import React, {createContext, useContext, useReducer, useState} from "react";

const TodoListsContext = createContext(undefined, undefined)

export function useTodoLists() {
    return useContext(TodoListsContext);
}

function reducer(todos, action) {
    //
}



export default function TodoListProvider({children}) {
    const [todosLists, dispatchTodoLists] = useReducer(reducer, [
        {listId: 0, name: "All Lists",todos:[]},
        {listId: 1, name: "List1", todos:[
                        {todoId: 2, name: "Todo1", LatLng: { latitude: 51.8397905 , longitude: 6.6532594 }, timestamp: "2022-12-17T00:00:00Z", isChecked: false},
                        {todoId: 3, name: "Todo2", LatLng: { latitude: 51.8399905 , longitude: 6.6532594 }, timestamp: "2022-12-21T00:00:00Z", isChecked: false},
                        {todoId: 4, name: "Todo3", LatLng: { latitude: 51.8395905 , longitude: 6.6532594 }, timestamp: "2022-12-22T00:00:00Z", isChecked: false},
                    ]},
                {listId: 5, name: "List2", todos:[
                        {todoId: 6, name: "Todo4", LatLng: { latitude: 51.8397905 , longitude: 6.6536594 }, timestamp: "2022-12-23T00:00:00Z", isChecked: true},
                        {todoId: 7, name: "Todo5", LatLng: { latitude: 51.8397905 , longitude: 6.6534594 }, timestamp: "2022-12-24T00:00:00Z", isChecked: true},
                        {todoId: 8, name: "Todo6", LatLng: { latitude: 51.8397905 , longitude: 6.6538594 }, timestamp: "2022-12-25T00:00:00Z", isChecked: false},
                        {todoId: 9, name: "Todo7", LatLng: { latitude: 51.8397905 , longitude: 6.6540594 }, timestamp: "2023-02-25T00:00:00Z", isChecked: false},
                        {todoId: 10,name: "Todo8", LatLng: { latitude: 51.8397905 , longitude: 6.6530594 }, timestamp: "2022-02-25T00:00:00Z", isChecked: false},
                    ]},
    ])

    const [activeList, setActiveList] = useState(0)

    return(
        <TodoListsContext.Provider value={[todosLists, dispatchTodoLists, activeList, setActiveList]}>
            {children}
        </TodoListsContext.Provider>
    )
}
