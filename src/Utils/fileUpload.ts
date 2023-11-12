import {Api} from "../API/api";
import md5 from "js-md5";
import {sha256} from "js-sha256";
import {RcFile} from "antd/es/upload";

function splitIntoChunks(array: Uint8Array, chunkSize: number) {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.subarray(i, i + chunkSize));
    }
    return chunks;
}
// export const calculateHash =async (file: File) => {
//     return new Promise<{hash_md5:string,hash_sha256:string}>((resolve,reject)=>{
//         let reader = new FileReader();
//         reader.readAsArrayBuffer(file);
//         reader.onload = () => {
//             var arrayBuffer = reader.result as ArrayBuffer;
//             var byteArray = new Uint8Array(arrayBuffer);
//             const chunkSize = 1024 * 1024; // 每块的大小（1MB）
//             const chunks = splitIntoChunks(byteArray, chunkSize);
//             var md5code,sha256code;
//             var md5Hash = CryptoJS.algo.MD5.create();
//             var sha256Hash = CryptoJS.algo.SHA256.create();
//             for (let chunk of chunks) {
//                     var wordArray = CryptoJS.lib.WordArray.create(Array.from(chunk));
//                     sha256Hash.update(wordArray);
//                     md5Hash.update(wordArray);
//                 }
//             md5code = md5Hash.finalize().toString();
//             sha256code = sha256Hash.finalize().toString();
//             resolve({hash_md5:md5code,hash_sha256:sha256code});
//         }
//     })
// };
export const calculateHash =async (file: File) => {
    return new Promise<{hash_md5:string,hash_sha256:string}>((resolve,reject)=>{
        let md5code:string ,sha256Hash:string;
        file.arrayBuffer().then((value)=>{
            md5code = md5(value);
            sha256Hash = sha256(value);
        }).then(()=>{resolve({hash_md5:md5code,hash_sha256:sha256Hash})})
    })
}

export const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });