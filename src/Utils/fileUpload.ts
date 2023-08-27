import {Api} from "../API/api";
import md5 from "js-md5";
import CryptoJS from "crypto-js";
import {RcFile} from "antd/es/upload";
import {UploadFile} from "antd/lib";

export const calculateHash =async (algorithm: string, file: File) => {
    return new Promise((resolve,reject)=>{
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = () => {
            var arrayBuffer = reader.result as ArrayBuffer;
            var byteArray = new Uint8Array(arrayBuffer);
            var wordArray = CryptoJS.lib.WordArray.create(Array.from(byteArray));
            if(algorithm==='md5')
                var hash = CryptoJS.MD5(wordArray).toString();
            else var hash = CryptoJS.SHA256(wordArray).toString();
            resolve(hash);
        }
    })
};
