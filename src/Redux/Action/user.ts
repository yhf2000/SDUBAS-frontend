import {IUserInfo} from "../../Type/user";

export type UserAction =
    setUserInfo |
    userLogin |
    userLogout

export interface setUserInfo {
    type: "setUserInfo"
    data: IUserInfo
}

export interface userLogin {
    type: "userLogin"
}

export interface userLogout {
    type: "userLogout"
}
