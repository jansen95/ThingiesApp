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
                {todoId: 2, name: "Todo1", gps: "6° 36' 51\" O / 51° 50' 22\" N", date: "2022-12-01"},
                {todoId: 3, name: "Todo2", gps: "6° 36' 52\" O / 51° 50' 22\" N", date: "2022-12-02"},
                {todoId: 4, name: "Todo3", gps: "6° 36' 53\" O / 51° 50' 22\" N", date: "2022-12-03"},
            ]},
        {listId: 5, name: "List2", todos:[
                {todoId: 6, name: "Todo4", gps: "6° 36' 54\" O / 51° 50' 22\" N", date: Date.UTC(2022,12,4,12,30)},
                {todoId: 7, name: "Todo5", gps: "6° 36' 55\" O / 51° 50' 22\" N", date: Date.UTC(2022,12,5,12,30)},
                {todoId: 8, name: "Todo6", gps: "6° 36' 56\" O / 51° 50' 22\" N", date: Date.UTC(2022,12,6,12,30)},
            ]},
    ])

    return(
        <TodoListsContext.Provider value={todosLists}>
            {children}
        </TodoListsContext.Provider>
    )
}
