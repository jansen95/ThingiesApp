import * as React from "react";
import {useContext} from "react";

export const UserNameContext = React.createContext(undefined, undefined);

export function useUserName() {
    return useContext(UserNameContext);
}
