import {ITableState} from "./table";
import {IUserState} from "./user";
import {IKeyState} from "./key";

export interface IState {
    TableReducer: ITableState
    UserReducer: IUserState
    KeyReducer:IKeyState
}

export type IKvState = { [key: string]: any }