import React, {createContext, useContext, useReducer} from "react";

const TodoListsContext = createContext(undefined, undefined)

export function useTodoLists() {
    return useContext(TodoListsContext);
}

function reducer(todos, action) {
    //
}

export default function TodoListProvider({children}) {
    const [todosLists, dispatch] = useReducer(reducer, [
        {listId: 1, name: "List1", todos:[
                {todoId: 2, name: "Todo1", LatLng: { latitude: 6.6141667 , longitude: 51.839444444444446 }, date: "2022-12-01"},
                {todoId: 3, name: "Todo2", LatLng: { latitude: 6.6144444 , longitude: 51.839444444444446 }, date: "2022-12-02"},
                {todoId: 4, name: "Todo3", LatLng: { latitude: 6.6147222 , longitude: 51.839444444444446 }, date: "2022-12-03"},
            ]},
        {listId: 5, name: "List2", todos:[
                {todoId: 6, name: "Todo4", LatLng: { latitude: 6.615 ,longitude: 51.839444444444446 }, date: "2022-12-04"},
                {todoId: 7, name: "Todo5", LatLng: { latitude: 6.6152778 ,longitude: 51.839444444444446 }, date: "2022-12-05"},
                {todoId: 8, name: "Todo6", LatLng: { latitude: 6.6155556 ,longitude: 51.839444444444446 }, date: "2022-12-06"},
            ]},
    ])

    return(
        <TodoListsContext.Provider value={todosLists}>
            {children}
        </TodoListsContext.Provider>
    )
}
