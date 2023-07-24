import {configureStore} from '@reduxjs/toolkit'
import {rootReducers} from "./rootReducer";
import thunk from "redux-thunk";

// 全局就管理一个store
export const store = configureStore({
    reducer: rootReducers,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: process.env.NODE_ENV !== 'production',  // 只有在非生产环境下开启 devtools
})