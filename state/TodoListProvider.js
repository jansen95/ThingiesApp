import React, {createContext, useContext, useReducer, useState} from "react";


const TodoListsContext = createContext(undefined, undefined)


export function useTodoLists() {
    return useContext(TodoListsContext);
}


function reducer(todos, action) {
    //
}


export default function TodoListProvider({children}) {
    const [todoLists, dispatchTodoLists] = useReducer(reducer, [
        {listId: 0, name: "All Lists",todos:[]},
        {listId: 1, name: "LocalList1", todos:[
                        {todoId: 2, name: "LocalTodo1", LatLng: { latitude: 51.8397905 , longitude: 6.6532594 }, timestamp: "2022-12-17T00:00:00Z", isChecked: false},
                        {todoId: 3, name: "LocalTodo2", LatLng: { latitude: 51.8399905 , longitude: 6.6532594 }, timestamp: "2022-12-21T00:00:00Z", isChecked: false},
                        {todoId: 4, name: "LocalTodo3", LatLng: { latitude: 51.8395905 , longitude: 6.6532594 }, timestamp: "2022-12-22T00:00:00Z", isChecked: false},
                    ]},
                {listId: 5, name: "LocalList2", todos:[
                        {todoId: 6, name: "LocalTodo4", LatLng: { latitude: 51.8397905 , longitude: 6.6536594 }, timestamp: "2022-12-23T00:00:00Z", isChecked: true},
                        {todoId: 7, name: "LocalTodo5", LatLng: { latitude: 51.8397905 , longitude: 6.6534594 }, timestamp: "2022-12-24T00:00:00Z", isChecked: true},
                        {todoId: 8, name: "LocalTodo6", LatLng: { latitude: 51.8397905 , longitude: 6.6538594 }, timestamp: "2022-12-25T00:00:00Z", isChecked: false},
                        {todoId: 9, name: "LocalTodo7", LatLng: { latitude: 51.8397905 , longitude: 6.6540594 }, timestamp: "2023-02-25T00:00:00Z", isChecked: false},
                        {todoId: 10,name: "LocalTodo8", LatLng: { latitude: 51.8397905 , longitude: 6.6530594 }, timestamp: "2022-02-25T00:00:00Z", isChecked: false},
                    ]},
    ])

    const [activeList, setActiveList] = useState(0)

    return(
        <TodoListsContext.Provider value={[todoLists, dispatchTodoLists, activeList, setActiveList]}>
            {children}
        </TodoListsContext.Provider>
    )
}
