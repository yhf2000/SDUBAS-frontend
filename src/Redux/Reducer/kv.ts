import {IKvState} from "../../Type/base";
import {KVAction} from "../Action/kv";
import {keyboard} from "@testing-library/user-event/dist/keyboard";

const initState: IKvState = {}

export const KVReducer = (state: IKvState, action: KVAction) => {
    let State: IKvState = {...state};
    switch (action.type) {
        case "kvClearValue":
            State = {}
            break
        case "kvRemoveValue":
            delete State[action.key]
            break
        case "kvSetValue":
            State[action.key] = action.data
            break
    }
    return State
}