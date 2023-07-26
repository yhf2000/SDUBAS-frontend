import {getRequestKey} from "../Utils/getRequestKey";
import {AnyAction, Dispatch} from "redux";
import {AppThunk} from "../Redux/Store";
import {Api} from "./api";
import {isValueEmpty} from "../Utils/isValueEmpty";

let cache: { [key: string]: number } = {};
const getData = (
    name: string,
    key: any,
    onSuccess: any = undefined,
    onError: any = undefined,
    onFinally: any = undefined,
    staleTime = 5 * 1000
): AppThunk => {
    return async (dispatch: Dispatch<AnyAction>, getState: any) => {
        // your code here) => {
        let key_name = getRequestKey(name, key)
        // 如果没有访问过，或者长时间没有访问过
        if (cache[key_name] === undefined || cache[key_name] + staleTime <= Date.now()) {
            cache[key_name] = Date.now();
            console.log(key)
            const apiPromise = !isValueEmpty(key) ? Api[name](key) : Api[name]();
            apiPromise.then((res: any) => {
                dispatch({type: "kvSetValue", key: key_name, data: res})
                onSuccess && onSuccess(res)
            }).catch((err: any) => {
                onError && onError(err)
            }).finally(() => {
                onFinally && onFinally()
            })
        }
    }
};

export default getData;
