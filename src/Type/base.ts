import {ITableState} from "./table";
import {IUserState} from "./user";

export interface IState {
    TableReducer: ITableState
    UserReducer: IUserState
}

export type IKvState = { [key: string]: any }