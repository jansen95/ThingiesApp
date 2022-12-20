import React, {createContext, useContext, useEffect, useReducer, useState} from "react";
import axios from "axios";

const TodoListsContext = createContext(undefined, undefined)
const DatabaseContext = createContext(undefined, undefined)

export function useDatabase() {
    return useContext(DatabaseContext);
}

export function useTodoLists() {
    return useContext(TodoListsContext);
}


const ACTIONS = {
    ADD_TODO: 'add-todo',
    REPLACE_All: 'replace-all'
}

function reducer(todos, action) {
    //
}

function listsReducer(lists, action) {
    switch (action.type) {
        case ACTIONS.REPLACE_All:
            return [action.payload.data]
    }
}

function todoReducer(todos, action) {
    switch (action.type) {
        case ACTIONS.REPLACE_All:
            return [action.payload.data]
    }
}


export default function TodoListProvider({children}) {
    const [todoLists, dispatchTodoLists] = useReducer(reducer, [
        {listId: 0, name: "All Lists",todos:[]},
        {listId: 1, name: "List1", todos:[
                        {todoId: 2, name: "Todo1", LatLng: { latitude: 51.8397905 , longitude: 6.6532594 }, timestamp: "2022-12-17T00:00:00Z"},
                        {todoId: 3, name: "Todo2", LatLng: { latitude: 51.8399905 , longitude: 6.6532594 }, timestamp: "2022-12-21T00:00:00Z"},
                        {todoId: 4, name: "Todo3", LatLng: { latitude: 51.8395905 , longitude: 6.6532594 }, timestamp: "2022-12-22T00:00:00Z"},
                    ]},
                {listId: 5, name: "List2", todos:[
                        {todoId: 6, name: "Todo4", LatLng: { latitude: 51.8397905 , longitude: 6.6536594 }, timestamp: "2022-12-23T00:00:00Z"},
                        {todoId: 7, name: "Todo5", LatLng: { latitude: 51.8397905 , longitude: 6.6534594 }, timestamp: "2022-12-24T00:00:00Z"},
                        {todoId: 8, name: "Todo6", LatLng: { latitude: 51.8397905 , longitude: 6.6538594 }, timestamp: "2022-12-25T00:00:00Z"},
                        {todoId: 9, name: "Todo7", LatLng: { latitude: 51.8397905 , longitude: 6.6540594 }, timestamp: "2023-02-25T00:00:00Z"},
                        {todoId: 10,name: "Todo8", LatLng: { latitude: 51.8397905 , longitude: 6.6530594 }, timestamp: "2022-02-25T00:00:00Z"},
                    ]},
    ])

    const [lists, dispatchLists] = useReducer(listsReducer, [
        {id: 42, title: "LocalList1", created_at: "2022-12-13T13:57:47.801Z", owner_id: 1},
        {id: 69, title: "LocalList2", created_at: "2022-12-13T13:57:47.801Z", owner_id: 2},
    ])

    const [todos, dispatchTodos] = useReducer(todoReducer, [
        {id: 31, title: "LocalTodo31", gps_lat: 51.8397905 , gps_long: 6.6532594, date: "2022-12-13T13:57:47.801Z", listId: 42},
        {id: 32, title: "LocalTodo32", gps_lat: 51.8399905 , gps_long: 6.6532594, date: "2022-12-13T13:57:47.801Z", listId: 42},
        {id: 33, title: "LocalTodo33", gps_lat: 51.8395905 , gps_long: 6.6532594, date: "2022-12-13T13:57:47.801Z", listId: 42},

        {id: 34, title: "LocalTodo34", gps_lat: 51.8397905 ,gps_long: 6.6532594, date: "2022-12-13T13:57:47.801Z", listId: 69},
        {id: 35, title: "LocalTodo35", gps_lat: 51.8397905 ,gps_long: 6.6534594, date: "2022-12-13T13:57:47.801Z", listId: 69},
        {id: 36, title: "LocalTodo36", gps_lat: 51.8397905 ,gps_long: 6.6538594, date: "2022-12-13T13:57:47.801Z", listId: 69},
    ])

    /*
    console.log("LISTS: ")
    console.log(lists)
    console.log()

    console.log("TODOS: ")
    console.log(todos)
    console.log()
     */

    const getTodoLists = async () => {
        try {
            const res = await axios.get('http://192.168.178.23:8080/lists')
            dispatchLists({ type: ACTIONS.REPLACE_All, payload: {data: res.data}})
        } catch (error) {
            console.log(error.message)
        }
    }

    const getTodos = async () => {
        try {
            const res = await axios.get('http://192.168.178.23:8080/todos')
            dispatchTodos({ type: ACTIONS.REPLACE_All, payload: {data: res.data}})
        } catch (error) {
            console.log(error.message)
        }
    }

    useEffect(() => {
        getTodoLists().then();
    }, []);


    useEffect(() => {
        getTodos().then();
    }, []);



    const [activeList, setActiveList] = useState(0)

    return(
        <TodoListsContext.Provider value={[todoLists, dispatchTodoLists, activeList, setActiveList]}>
            <DatabaseContext.Provider value={[lists, todos, dispatchLists, dispatchTodos, activeList, setActiveList]}>
                {children}
            </DatabaseContext.Provider>
        </TodoListsContext.Provider>
    )
}
