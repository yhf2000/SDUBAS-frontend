import CryptoJS from 'crypto-js';
import {useDispatch} from "../Redux/Store";
import {useSelector} from "react-redux";
import {IState} from "../Type/base";


// 生成随机的AES密钥
export const generateAESKey = () => {
    const keySize = 256; // 密钥长度，可以根据需要进行调整
    const key = CryptoJS.lib.WordArray.random(keySize / 8); // 生成随机的字节数组
    return key.toString();
};

export function encrypt(file:any,AESKey:string){
    //生成aes密钥
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            // @ts-ignore
            const fileData = event.target.result;
            // @ts-ignore
            const encryptedData = CryptoJS.AES.encrypt(fileData, AESKey).toString();
            resolve(encryptedData);
        };
        reader.onerror = (event) => {
            // @ts-ignore
            reject(event.target.error);
        };
        reader.readAsText(file);
    });
}