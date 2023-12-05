import {UserAction} from "../Action/user";
import deepClone from "../../Utils/deepClone";
import {IUserState} from "../../Type/user";

const initState: IUserState = {
    isLogin: false,
    queryLogin: false,
    userInfo: undefined,
    userPermission:{}
}

export const UserReducer = (state: IUserState = initState, action: UserAction) => {
    let State: IUserState = deepClone(state)
    switch (action.type) {
        case "setUserInfo":
            State.userInfo = action.data
            break
        case "userLogin":
            State.isLogin = true
            break
        case "userLogout":
            State.isLogin = false
            State.userInfo = undefined
            break
        case "userQueryLogin":
            State.queryLogin = action.data
            break
        case "setUserPermission":
            if(action.service_type !== undefined)
                State.userPermission[action.service_type] = action.data
            break
        default:
            break
    }
    return State
}