import CryptoJS from 'crypto-js';


// 生成随机的AES密钥
export const generateAESKey = () => {
    const keySize = 128; // 密钥长度，可以根据需要进行调整
    const key = CryptoJS.lib.WordArray.random(keySize / 8); // 生成随机的字节数组
    return key
};

function convertWordArrayToUint8Array(wordArray:any) {
    var arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
    var length = wordArray.hasOwnProperty("sigBytes") ? wordArray.sigBytes : arrayOfWords.length * 4;
    var uInt8Array = new Uint8Array(length), index=0, word, i;
    for (i=0; i<length; i++) {
        word = arrayOfWords[i];
        uInt8Array[index++] = word >> 24;
        uInt8Array[index++] = (word >> 16) & 0xff;
        uInt8Array[index++] = (word >> 8) & 0xff;
        uInt8Array[index++] = word & 0xff;
    }
    return uInt8Array;
}
export function encrypt(file:any,AESKey:any){
    //生成aes密钥
    return new Promise<Blob>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            // @ts-ignore
            const fileData = CryptoJS.lib.WordArray.create(event.target.result);
            console.log(AESKey);
            // @ts-ignore
            const encryptedData = CryptoJS.AES.encrypt(fileData, AESKey,{
                iv: AESKey, //偏移量
                mode: CryptoJS.mode.ECB,//加密模式
                padding: CryptoJS.pad.Pkcs7 //填充
            }).toString();
            // console.log('what');
            // @ts-ignore
            const encryptedFile = new Blob([encryptedData],{name:file.name, type: file.type });
            resolve(encryptedFile);
        };
        reader.onerror = (event) => {
            // @ts-ignore
            reject(event.target.error);
        };
        reader.readAsArrayBuffer(file);
    });
}

export function decrypt(file:any,AESKey:any){
    //生成aes密钥
    return new Promise<Blob>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            // @ts-ignore
            const decrypted=CryptoJS.AES.decrypt(event.target.result,AESKey,{
                iv: AESKey, //偏移量
                mode: CryptoJS.mode.ECB,//加密模式
                padding: CryptoJS.pad.Pkcs7 //填充
            })
            const typedArray = convertWordArrayToUint8Array(decrypted);
            var fileDec = new Blob([typedArray],{type:file.type});
            console.log(AESKey);
            // @ts-ignore
            // console.log('what');
            // @ts-ignore
            var a = document.createElement("a");
            var url = window.URL.createObjectURL(fileDec);
            var filename = file.name;
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
            resolve(fileDec);
        };
        reader.onerror = (event) => {
            // @ts-ignore
            reject(event.target.error);
        };
        reader.readAsText(file);
    });
}