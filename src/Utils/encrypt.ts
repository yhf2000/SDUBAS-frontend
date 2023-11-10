import CryptoJS from 'crypto-js';
import {isUtf8} from "buffer";


// 生成随机的AES密钥
export const generateAESKey = () => {
    const keySize = 128; // 密钥长度，可以根据需要进行调整
    const key = CryptoJS.lib.WordArray.random(keySize / 8); // 生成随机的字节数组
    return key
};

export function encrypt(file:any,AESKey:any){
    //生成aes密钥
    return new Promise<Blob>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            // @ts-ignore
            const fileData = event.target.result;
            console.log(AESKey);
            // @ts-ignore
            const encryptedData = CryptoJS.AES.encrypt(fileData, AESKey,{
                iv: AESKey, //偏移量
                mode: CryptoJS.mode.ECB,//加密模式
                padding: CryptoJS.pad.Pkcs7 //填充
            });
            // console.log('what');
            // @ts-ignore
            const encryptedFile = new Blob([encryptedData],{name:file.name},{ type: file.type });
            resolve(encryptedFile);
        };
        reader.onerror = (event) => {
            // @ts-ignore
            reject(event.target.error);
        };
        reader.readAsText(file);
    });
}