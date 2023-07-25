import md5 from "js-md5";

export const objectToken = (obj: any) => {
    let str = JSON.stringify(obj);
    let hash = md5(str);
    return hash.toUpperCase();
}