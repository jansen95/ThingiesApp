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
        {listId: 1, name: "List1", todos:[
                        {todoId: 2, name: "Todo1", LatLng: { latitude: 51.8397905 , longitude: 6.6532594 }, date: "2022-12-01"},
                        {todoId: 3, name: "Todo2", LatLng: { latitude: 51.8399905 , longitude: 6.6532594 }, date: "2022-12-02"},
                        {todoId: 4, name: "Todo3", LatLng: { latitude: 51.8395905 , longitude: 6.6532594 }, date: "2022-12-03"},
                    ]},
                {listId: 5, name: "List2", todos:[
                        {todoId: 6, name: "Todo4", LatLng: { latitude: 51.8397905 ,longitude: 6.6532594 }, date: "2022-12-04"},
                        {todoId: 7, name: "Todo5", LatLng: { latitude: 51.8397905 ,longitude: 6.6534594 }, date: "2022-12-05"},
                        {todoId: 8, name: "Todo6", LatLng: { latitude: 51.8397905 ,longitude: 6.6538594 }, date: "2022-12-06"},
                    ]},
    ])

    const [activeList, setActiveList] = useState(0)

    return(
        <TodoListsContext.Provider value={[todosLists, dispatchTodoLists, activeList, setActiveList]}>
            {children}
        </TodoListsContext.Provider>
    )
}
