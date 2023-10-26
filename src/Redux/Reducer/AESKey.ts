import {AESKey} from "../Action/key";
import {IUserState} from "../../Type/user";
import deepClone from "../../Utils/deepClone";
import {IKeyState} from "../../Type/key";

const initState:IKeyState={
    AESKey:'e7e792470479a7d7164769d666ff9b686b489a34f9fae50591a53b93196114a5',
    RSAPbKey:''
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