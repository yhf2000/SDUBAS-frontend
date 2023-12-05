import {AESKey} from "../Action/key";
import deepClone from "../../Utils/deepClone";
import {IKeyState} from "../../Type/key";

const initState:IKeyState={
    AESKey:'e7e792470479a7d7164769d666ff9b686b489a34f9fae50591a53b93196114a5',
    RSAPbKey:'-----BEGIN PUBLIC KEY-----\n' +
        'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4E3IBJNbshjWs/VoGFAc\n' +
        'uGV5EjwOVLvbegDw6zfIKUM+XwwQu146RwEsyvMm1yNDxdofQdzxlkNUEwHjGup1\n' +
        'nJdRDUlJj/hTGVF87iCVUzL80vH0n2kGMCvYBXpBQ80SgEPWznQQbW7x9jUeyXMU\n' +
        'pV/QBxZoiibBYqFaoeY+XNcT1e4fD3+epod59Zcn4sMli80499geP9dU6Q9r2gdW\n' +
        '9DZuInrfzao18iFSjgCc9vSp6UZ2NKBYYNCpZvuTvF+gc+5UZf1Kos4an9912yvK\n' +
        'ReIGTlGgP8ytvA1rtB9NFKy1sSu+f9uLLc/CtUn3qu8cgBW2CPsrFgG17EnNLN+p\n' +
        'uQIDAQAB\n' +
        '-----END PUBLIC KEY-----\n'
}
export const KeyReducer = (state:IKeyState=initState,action:AESKey)=>{
    let State = deepClone(state)
    switch (action.type){
        case 'setAESKey':
            State.AESKey = action.data
            break
        case 'setRSAPbKey':
            State.RSAPbKey = action.data
            break
    }
    return State
}