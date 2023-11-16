import CryptoJS from 'crypto-js';


// 生成随机的AES密钥
export const generateAESKey = () => {
    let result= '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // 可包含的字符范围

    for (let i = 0; i < 16; i++) {
        let randomIndex = Math.floor(Math.random() * characters.length);
        let randomChar = characters.charAt(randomIndex);
        result += randomChar;
    }
    return result;
};

function generateRandomAESKey() {
    let aesKey = new Uint8Array(16);
    crypto.getRandomValues(aesKey);
    return aesKey;
}


function convertWordArrayToUint8Array(wordArray: any) {
    let arrayOfWords = wordArray.hasOwnProperty("words") ? wordArray.words : [];
    let length = wordArray.hasOwnProperty("sigBytes") ? wordArray.sigBytes : arrayOfWords.length * 4;
    let uInt8Array = new Uint8Array(length), index = 0, word, i;
    for (i = 0; i < length; i++) {
        word = arrayOfWords[i];
        uInt8Array[index++] = word >> 24;
        uInt8Array[index++] = (word >> 16) & 0xff;
        uInt8Array[index++] = (word >> 8) & 0xff;
        uInt8Array[index++] = word & 0xff;
    }
    return uInt8Array;
}

export function encrypt(file: any, AESKey: any) {
    //生成aes密钥
    return new Promise<Blob>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            // @ts-ignore
            const fileData = CryptoJS.lib.WordArray.create(event.target.result);
            AESKey = CryptoJS.enc.Utf8.parse(AESKey);
            const encryptedData = CryptoJS.AES.encrypt(fileData, AESKey, {
                // iv: CryptoJS.enc.Utf8.parse(AESKey), //偏移量
                mode: CryptoJS.mode.ECB,//加密模式
                padding: CryptoJS.pad.Pkcs7 //填充
            }).toString();
            // console.log('what');
            const encryptedFile = new Blob([encryptedData], {type: file.type});
            resolve(encryptedFile);
        };
        reader.onerror = (event) => {
            // @ts-ignore
            reject(event.target.error);
        };
        reader.readAsArrayBuffer(file);
    });
}

export function decrypt(file: any, AESKey: any) {
    //生成aes密钥
    return new Promise<Blob>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            AESKey = CryptoJS.enc.Utf8.parse(AESKey)
            // @ts-ignore
            const decrypted = CryptoJS.AES.decrypt(event.target.result, AESKey, {
                // iv: CryptoJS.enc.Utf8.parse(AESKey), //偏移量
                mode: CryptoJS.mode.ECB,//加密模式
                padding: CryptoJS.pad.Pkcs7 //填充
            })
            const typedArray = convertWordArrayToUint8Array(decrypted);
            let fileDec = new Blob([typedArray], {type: file.type});
            // console.log(AESKey);
            // @ts-ignore
            // console.log('what');
            // @ts-ignore
            let a = document.createElement("a");
            let url = window.URL.createObjectURL(fileDec);
            let filename = file.name;
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