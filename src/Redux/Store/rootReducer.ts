import {combineReducers} from "redux";
import {UserReducer} from "../Reducer/user";
import {TableReducer} from "../Reducer/table";
import {KVReducer} from "../Reducer/kv";
import {KeyReducer} from "../Reducer/AESKey";


// 全局创建多个 reducer 在这里合并统一调度
export const rootReducers =
    combineReducers({
        TableReducer,            // 通用表格部分
        UserReducer,            // 用户模块
        KVReducer,
        KeyReducer
    })