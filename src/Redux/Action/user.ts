import {IUserInfo} from "../../Type/user";
import {Api} from "../../API/api";
import {Dispatch} from "react";

export type UserAction =
    setUserInfo |
    userLogin |
    userLogout |
    userQueryLogin

export interface setUserInfo {
    type: "setUserInfo"
    data: IUserInfo
}

export interface userLogin {
    type: "userLogin"
}

export interface userQueryLogin {
    type: "userQueryLogin"
    data: boolean
}

export interface userLogout {
    type: "userLogout"
}
