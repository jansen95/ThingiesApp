import * as React from "react";
import {useContext} from "react";

export const TokenContext = React.createContext(undefined, undefined);

export function useToken() {
    return useContext(TokenContext);
}
