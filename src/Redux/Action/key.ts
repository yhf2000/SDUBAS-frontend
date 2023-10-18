export type AESKey = setAESKey|setRSAPbKey

export interface setAESKey {
    type: 'setAESKey',
    data: any
}

export interface setRSAPbKey{
    type:'setRSAPbKey',
    data:any
}