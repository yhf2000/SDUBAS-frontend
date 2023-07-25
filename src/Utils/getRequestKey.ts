import {isValueEmpty} from "./isValueEmpty";
import {objectToken} from "./objectToken";

export const getRequestKey = (name: string, key: any) => {
    let key_name = "request-" + name;
    if (isValueEmpty(key)) key_name += "-" + objectToken(key);
    return key_name
}